import express from "express";
import {
  createMaterialForSite,
  getMaterials,
  getMaterial,
  updateMaterial,
  deleteMaterial,
  getMaterialsBySiteId
} from "../controllers/material.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

// Routes for site-specific materials should come BEFORE dynamic :id routes
router.get("/site/:siteId", getMaterialsBySiteId);
// router.post("/site/:siteId", verifyToken, createMaterialForSite); // Accepts siteId in body
router.post("/site/:siteId", createMaterialForSite);
router.get("/",  getMaterials);
router.get("/:id",  getMaterial);
// router.put("/:id", verifyToken, updateMaterial);
router.put("/:id", updateMaterial);
router.delete("/:id",  deleteMaterial);

export default router;
