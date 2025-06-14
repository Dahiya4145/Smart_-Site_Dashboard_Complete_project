import express from "express";
import {
  createLaborLog,
  getLaborLogs,
  getLaborLog,
  updateLaborLog,
  deleteLaborLog,
  getLaborBySiteId
} from "../controllers/labor.js";

//import { verifyAdmin, verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

// router.post("/site/:siteId", verifyToken, createLaborLog);
router.post("/site/:siteId", createLaborLog);
router.get("/",  getLaborLogs);
router.get("/:id",  getLaborLog);
// router.put("/:id", verifyToken, updateLaborLog);
router.put("/:id", updateLaborLog);
router.delete("/:id", deleteLaborLog);
router.get("/site/:siteId", getLaborBySiteId);

export default router;