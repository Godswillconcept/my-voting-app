const express = require("express");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  bulkCreateUsers,
} = require("../controllers/userController");
const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/user", createUser);
router.post("/bulk-create", bulkCreateUsers);
router.put("/:id/update", updateUser);
router.delete("/:id/delete", deleteUser);
module.exports = router;
