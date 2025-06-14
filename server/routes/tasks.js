import express from "express";
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  getTasksBySiteId, 
} from "../controllers/tasks.js";

//import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

// router.post("/site/:siteId", verifyToken, createTask);
router.post("/site/:siteId", createTask);
router.get("/",  getTasks);
router.get("/:id", getTask);
// router.put("/:id", verifyToken, updateTask);
router.put("/:id", updateTask);
router.delete("/:id",  deleteTask);
router.get("/site/:siteId", getTasksBySiteId);
export default router;