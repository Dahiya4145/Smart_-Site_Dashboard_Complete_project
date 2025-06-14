import jwt from "jsonwebtoken";
import { createError } from "./error.js";

// Middleware to verify the token and attach the user to the request
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token; // Fetch token from cookies
  if (!token) {
    return next(createError(401, "You are not authenticated!")); // If no token, respond with 401
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!")); // If token is invalid, respond with 403
    req.user = user; // Attach user data to the request object
    next(); // Proceed to the next middleware or route handler
  });
};

// Middleware to verify if the user is authorized (either same user or admin/engineer)
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, (err) => {
    if (err) return next(err); // If token is invalid, pass the error to the next handler
    // Check if the user ID matches the requested ID or if the user is admin/engineer
    if (req.user.id === req.params.id || req.user.role === "admin" || req.user.role === "engineer") {
      next(); // Proceed to next handler
    } else {
      return next(createError(403, "You are not authorized!")); // If not authorized, return 403
    }
  });
};

// Middleware to verify if the user has admin privileges
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, (err) => {
    if (err) return next(err); // If token is invalid, pass the error to the next handler
    // Only allow access to admin users
    if (req.user.role === "admin") {
      next(); // Proceed to next handler
    } else {
      return next(createError(403, "Admin access only!")); // If not admin, return 403
    }
  });
};
