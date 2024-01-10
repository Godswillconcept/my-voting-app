const { Router } = require("express");
const {
  getAllUsers,
  createUser,
  updateUser,
  loginUser,
  logoutUser,
  userProfile,
  isAuthenticated,
} = require("../controllers/userController");
const {
  getAllPlatforms,
  platformDetail,
} = require("../controllers/platformController");
const { getAllPolls, pollDetail, candidatesByPoll, platformsByPoll } = require("../controllers/pollController");
const {
  getAllCandidates,
  candidateDetail,
} = require("../controllers/candidateController");
const {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
} = require("../controllers/reviewController");
const router = Router();

// user routes
router.get("/users", getAllUsers);
router.post("/users/user", createUser);
router.put("/users/:id/update", updateUser);
router.get("/users/:id/profile", userProfile);
router.post("/users/login", loginUser);
router.post("/users/logout", logoutUser);
router.post("/users/authUser", isAuthenticated);

// platform routes
router.get("/platforms", getAllPlatforms);
router.get("/platforms/:id/detail", platformDetail);

// poll routes
router.get("/polls", getAllPolls);
router.get("/polls/:id/detail", pollDetail);
router.get("/polls/:id/candidates", candidatesByPoll);
router.get("/polls/:id/platforms", platformsByPoll);

// candidate routes
router.get("/candidates", getAllCandidates);
router.get("/candidates/:id/detail", candidateDetail);

// review routes
router.get("/reviews", getAllReviews);
router.get("/reviews/:id", getReviewById);
router.post("/reviews/review", createReview);
router.put("/reviews/:id/update", updateReview);

module.exports = router;
