const express = require("express");
const {
  getAllCandidates,
  getCandidateById,
  createCandidate,
  updateCandidate,
  deleteCandidate,
} = require("../controllers/candidateController");
const router = express.Router();

router.get("/", getAllCandidates);
router.get("/:id", getCandidateById);
router.post("/candidate", createCandidate);
router.put("/:id/update", updateCandidate);
router.delete("/:id/delete", deleteCandidate);
module.exports = router;
