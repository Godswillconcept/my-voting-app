const express = require("express");
const {
  getAllPolls,
  getPollById,
  createPoll,
  updatePoll,
  deletePoll,
  addPlatformToPoll,
  pollDetail,
  platformsByPoll,
  candidatesByPoll,
} = require("../controllers/pollController");
const router = express.Router();

router.get("/", getAllPolls);
router.get("/:id", getPollById);
router.post("/poll", createPoll);
router.put("/:id/update", updatePoll);
router.delete("/:id/delete", deletePoll);
router.post("/add-platform", addPlatformToPoll);
router.get("/:id/detail", pollDetail);
router.get("/:id/platforms", platformsByPoll);
router.get("/:id/candidates", candidatesByPoll);
module.exports = router;
