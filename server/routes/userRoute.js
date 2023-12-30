const express = require("express");
const {
  getAllUsers,
  userProfile,
  createUser,
  updateUser,
  deleteUser,
  bulkCreateUsers,
  loginUser,
  logoutUser,
} = require("../controllers/userController");
const { authenticateToken } = require("../helpers/helper");
const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id/profile", authenticateToken, userProfile);
router.post("/user", createUser);
router.post("/bulk-create", bulkCreateUsers);
router.put("/:id/update", updateUser);
router.delete("/:id/delete", deleteUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
module.exports = router;
