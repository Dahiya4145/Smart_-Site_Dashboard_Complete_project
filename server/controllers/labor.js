import LaborLog from "../models/LaborLog.js";

export const createLaborLog = async (req, res, next) => {
  const { siteId } = req.params; // Get siteId from route param
  const newLog = new LaborLog({ ...req.body, siteId }); // Assign it to the labor log

  try {
    const savedLog = await newLog.save();
    res.status(201).json(savedLog);
  } catch (err) {
    next(err);
  }
};

export const getLaborLogs = async (req, res, next) => {
  try {
    const logs = await LaborLog.find();
    res.status(200).json(logs);
  } catch (err) {
    next(err);
  }
};

export const getLaborLog = async (req, res, next) => {
  try {
    const log = await LaborLog.findById(req.params.id);
    res.status(200).json(log);
  } catch (err) {
    next(err);
  }
};

export const updateLaborLog = async (req, res, next) => {
  try {
    const updatedLog = await LaborLog.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedLog);
  } catch (err) {
    next(err);
  }
};

export const deleteLaborLog = async (req, res, next) => {
  try {
    await LaborLog.findByIdAndDelete(req.params.id);
    res.status(200).json("Labor log deleted.");
  } catch (err) {
    next(err);
  }
};

export const getLaborBySiteId = async (req, res, next) => {
  try {
    const { siteId } = req.params;
    const laborEntries = await LaborLog.find({ siteId });
    res.status(200).json(laborEntries);
  } catch (err) {
    next(err);
  }
};