import Material from "../models/Material.js";

export const createMaterialForSite = async (req, res, next) => {
  const { siteId } = req.params; // ✅ get siteId from URL

  const materialData = {
    ...req.body,
    siteId, // ✅ set siteId from param, not body
  };

  try {
    const newMaterial = new Material(materialData);
    const savedMaterial = await newMaterial.save();
    res.status(200).json(savedMaterial);
  } catch (err) {
    next(err);
  }
};

export const getMaterials = async (req, res, next) => {
  try {
    const materials = await Material.find();
    res.status(200).json(materials);
  } catch (err) {
    next(err);
  }
};

export const getMaterial = async (req, res, next) => {
  try {
    const material = await Material.findById(req.params.id);
    res.status(200).json(material);
  } catch (err) {
    next(err);
  }
};

export const updateMaterial = async (req, res, next) => {
  try {
    const updatedMaterial = await Material.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedMaterial);
  } catch (err) {
    next(err);
  }
};

export const deleteMaterial = async (req, res, next) => {
  try {
    await Material.findByIdAndDelete(req.params.id);
    res.status(200).json("Material entry deleted.");
  } catch (err) {
    next(err);
  }
};

export const getMaterialsBySiteId = async (req, res, next) => {
  try {
    const { siteId } = req.params;
    const materials = await Material.find({ siteId });
    res.status(200).json(materials);
  } catch (err) {
    next(err);
  }
};