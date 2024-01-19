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
  userDetail,
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

const {
  getAllVotes,
  getVoteById,
  createVote,
  voteCount,
} = require("../controllers/voteController");
const { verifyToken, isAdmin } = require("../helpers/helper");
const router = Router();

// user routes
router.get("/users", getAllUsers);
router.post("/users/count", latestUsersByCount);
router.get("/users/:id/profile", verifyToken, userProfile);
router.post("/users/user", createUser);
router.post("/users/bulk-create", verifyToken, isAdmin, bulkCreateUsers);
router.put("/users/:id/update", verifyToken, updateUser);
router.delete("/users/:id/delete", verifyToken, isAdmin, deleteUser);
router.post("/users/login", loginUser);
router.get("/users/detail", verifyToken, userDetail);
router.post("/users/logout", logoutUser);

// platform routes
router.get("/platforms", getAllPlatforms);
router.post("/platforms/count", latestPlatformsByCount);
router.get("/platforms/:id/detail", verifyToken, platformDetail);
router.post("/platforms/platform", verifyToken, isAdmin, createPlatform);
router.post(
  "/platforms/bulk-create",
  verifyToken,
  isAdmin,
  bulkCreatePlatforms
);
router.put("/platforms/:id/update", verifyToken, isAdmin, updatePlatform);
router.delete("/platforms/:id/delete", verifyToken, isAdmin, deletePlatform);

// candidate routes
router.get("/candidates", getAllCandidates);
router.post("/candidates/count", latestCandidatesByCount);
router.get("/candidates/:id/detail", verifyToken, candidateDetail);
router.post("/candidates/candidate", verifyToken, createCandidate);
router.put("/candidates/:id/update", verifyToken, updateCandidate);
router.delete("/candidates/:id/delete", verifyToken, isAdmin, deleteCandidate);

// poll routes
router.get("/polls", getAllPolls);
router.post("/polls/count", latestPollsByCount);
router.post("/polls/poll", verifyToken, isAdmin, createPoll);
router.put("/polls/:id/update", verifyToken, isAdmin, updatePoll);
router.delete("/polls/:id/delete", verifyToken, isAdmin, deletePoll);
router.post("/polls/add-platform", verifyToken, isAdmin, addPlatformToPoll);
router.get("/polls/:id/detail", verifyToken, pollDetail);
router.get("/polls/:id/platforms", verifyToken, platformsByPoll);
router.get("/polls/:id/candidates", verifyToken, candidatesByPoll);

// review routes
router.get("/reviews", getAllReviews);
router.get("/reviews/:id", getReviewById);
router.post("/reviews/review", verifyToken, createReview);
router.put("/reviews/:id/update", verifyToken, updateReview);
router.delete("/reviews/:id/delete", verifyToken, isAdmin, deleteReview);

// vote routes
router.get("/votes", verifyToken, isAdmin, getAllVotes);
router.get("/votes/:id", verifyToken, getVoteById);
router.post("/votes/vote", verifyToken, createVote);
router.get("/votes/:id/count", voteCount);
module.exports = router;
