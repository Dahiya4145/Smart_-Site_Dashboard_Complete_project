import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";

// Update user profile
export const updateUserProfile = async (req, res, next) => {
  try {
    const { password, ...otherData } = req.body;

    if (password) {
      const salt = bcrypt.genSaltSync(10);
      otherData.password = bcrypt.hashSync(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: otherData },
      { new: true }
    );

    if (!updatedUser) return next(createError(404, "User not found"));

    const { password: pwd, ...safeData } = updatedUser._doc;
    res.status(200).json(safeData);
  } catch (err) {
    next(err);
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users." });
  }
};

// Delete user by ID
export const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
};
