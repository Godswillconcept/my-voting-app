const { Router } = require("express");
const {
  getAllUsers,
  latestUsersByCount,
  userProfile,
  createUser,
  bulkCreateUsers,
  updateUser,
  deleteUser,
  loginUser,
  isAuthenticated,
  logoutUser,
} = require("../controllers/userController");
const {
  getAllPlatforms,
  latestPlatformsByCount,
  platformDetail,
  createPlatform,
  bulkCreatePlatforms,
  updatePlatform,
  deletePlatform,
} = require("../controllers/platformController");
const {
  getAllCandidates,
  latestCandidatesByCount,
  candidateDetail,
  createCandidate,
  updateCandidate,
  deleteCandidate,
} = require("../controllers/candidateController");
const {
  getAllPolls,
  latestPollsByCount,
  getPollById,
  createPoll,
  updatePoll,
  deletePoll,
  addPlatformToPoll,
  pollDetail,
  platformsByPoll,
  candidatesByPoll,
} = require("../controllers/pollController");
const {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");
const router = Router();

// user routes
router.get("/users", getAllUsers);
router.post("/users/count", latestUsersByCount);
router.get("/users/:id/profile", userProfile);
router.post("/users/user", createUser);
router.post("/users/bulk-create", bulkCreateUsers);
router.put("/users/:id/update", updateUser);
router.delete("/users/:id/delete", deleteUser);
router.post("/users/login", loginUser);
router.post("/users/authUser", isAuthenticated);
router.post("/users/logout", logoutUser);

// platform routes
router.get("/platforms", getAllPlatforms);
router.post("/platforms/count", latestPlatformsByCount);
router.get("/platforms/:id/detail", platformDetail);
router.post("/platforms/platform", createPlatform);
router.post("/platforms/bulk-create", bulkCreatePlatforms);
router.put("/platforms/:id/update", updatePlatform);
router.delete("/platforms/:id/delete", deletePlatform);

// candidate routes
router.get("/candidates", getAllCandidates);
router.post("/candidates/count", latestCandidatesByCount);
router.get("/candidates/:id/detail", candidateDetail);
router.post("/candidates/candidate", createCandidate);
router.put("/candidates/:id/update", updateCandidate);
router.delete("/candidates/:id/delete", deleteCandidate);

// poll routes
router.get("/polls", getAllPolls);
router.post("/polls/count", latestPollsByCount);
router.post("/polls/poll", createPoll);
router.put("/polls/:id/update", updatePoll);
router.delete("/polls/:id/delete", deletePoll);
router.post("/polls/add-platform", addPlatformToPoll);
router.get("/polls/:id/detail", pollDetail);
router.get("/polls/:id/platforms", platformsByPoll);
router.get("/polls/:id/candidates", candidatesByPoll);

// review routes
router.get("/reviews", getAllReviews);
router.get("/reviews/:id", getReviewById);
router.post("/reviews/review", createReview);
router.put("/reviews/:id/update", updateReview);
router.delete("/reviews/:id/delete", deleteReview);
module.exports = router;
