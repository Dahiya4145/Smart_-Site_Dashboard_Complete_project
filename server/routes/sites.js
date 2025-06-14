import express from "express";
import {
  createSite,
  getSites,
  getSite,
  updateSite,
  deleteSite,
} from "../controllers/sites.js";
import { getSiteWeather } from '../controllers/sites.js';
//import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
router.post("/", createSite);
router.get("/", getSites);
router.get("/:id", getSite);
router.put("/:id",  updateSite);
router.delete("/:id",  deleteSite);
router.get('/:id/weather', getSiteWeather);

export default router;