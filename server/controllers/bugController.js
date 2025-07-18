const Bug = require("../models/Bug");

// @desc Get all bugs
exports.getBugs = async (req, res) => {
  const bugs = await Bug.find();
  res.json(bugs);
};

const createBug = asyncHandler(async (req, res) => {
  console.log("Incoming bug data:", req.body); // DEBUG
  // Simulate error
  if (!req.body.title) throw new Error("Missing title");
  const bug = await Bug.create(req.body);
  res.status(201).json(bug);
});

// @desc Create a new bug
exports.createBug = async (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

  const bug = new Bug({ title, description });
  await bug.save();
  res.status(201).json(bug);
};

// @desc Update bug
exports.updateBug = async (req, res) => {
  const bug = await Bug.findById(req.params.id);
  if (!bug) return res.status(404).json({ error: "Bug not found" });

  bug.status = req.body.status || bug.status;
  bug.title = req.body.title || bug.title;
  bug.description = req.body.description || bug.description;
  await bug.save();

  res.json(bug);
};

// @desc Delete bug
exports.deleteBug = async (req, res) => {
  const bug = await Bug.findByIdAndDelete(req.params.id);
  if (!bug) return res.status(404).json({ error: "Bug not found" });
  res.json({ message: "Bug deleted" });
};
