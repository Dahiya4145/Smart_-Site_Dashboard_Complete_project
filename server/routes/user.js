import express from "express";
import { deleteUser,updateUserProfile, getAllUsers } from "../controllers/user.js";

const router = express.Router();

// PUT /server/users/:id
router.put("/:id", updateUserProfile);

router.get("/", getAllUsers);

router.delete("/:id", deleteUser);

export default router;
