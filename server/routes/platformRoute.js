const express = require("express");
const {
  getAllPlatforms,
  getPlatformById,
  createPlatform,
  updatePlatform,
  deletePlatform,
} = require("../controllers/platformController");
const router = express.Router();

router.get("/", getAllPlatforms);
router.get("/:id", getPlatformById);
router.post("/platform", createPlatform);
router.put("/:id/update", updatePlatform);
router.delete("/:id", deletePlatform);
module.exports = router;
