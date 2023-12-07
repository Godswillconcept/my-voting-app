const express = require("express");
const {
  getAllPolls,
  getPollById,
  createPoll,
  updatePoll,
  deletePoll,
} = require("../controllers/pollController");
const router = express.Router();

router.get("/", getAllPolls);
router.get("/:id", getPollById);
router.post("/poll", createPoll);
router.put("/:id/update", updatePoll);
router.delete("/:id", deletePoll);
module.exports = router;
