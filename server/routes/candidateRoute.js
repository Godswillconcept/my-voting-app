const express = require("express");
const {
  getAllCandidates,
  getCandidateById,
  createCandidate,
  updateCandidate,
  deleteCandidate,
  bulkCreateCandidates,
} = require("../controllers/candidateController");
const router = express.Router();

router.get("/", getAllCandidates);
router.get("/:id", getCandidateById);
router.post("/candidate", createCandidate);
router.post("/bulk-create", bulkCreateCandidates);
router.put("/:id/update", updateCandidate);
router.delete("/:id", deleteCandidate);
module.exports = router;
