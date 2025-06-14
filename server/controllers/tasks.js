import Task from "../models/Task.js";

// Create task for a specific site
export const createTask = async (req, res, next) => {
  const { siteId } = req.params;

  const newTask = new Task({
    ...req.body,
    siteId, // explicitly set siteId from the URL
  });

  try {
    const savedTask = await newTask.save();
    res.status(200).json(savedTask);
  } catch (err) {
    next(err);
  }
};

// Get all tasks for all sites
export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

// Get single task by ID
export const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

// Update a task
export const updateTask = async (req, res, next) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedTask);
  } catch (err) {
    next(err);
  }
};

// Delete a task
export const deleteTask = async (req, res, next) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json("Task deleted.");
  } catch (err) {
    next(err);
  }
};

// Get tasks by site ID
export const getTasksBySiteId = async (req, res, next) => {
  try {
    const { siteId } = req.params;
    const tasks = await Task.find({ siteId });
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};
