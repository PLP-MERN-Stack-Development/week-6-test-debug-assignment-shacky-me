const express = require("express");
const {
  getBugs,
  createBug,
  updateBug,
  deleteBug,
} = require("../controllers/bugController");

const router = express.Router();

router.get("/", getBugs);
router.post("/", createBug);
router.put("/:id", updateBug);
router.delete("/:id", deleteBug);

module.exports = router;
