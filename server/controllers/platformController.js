const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { unlink } = require("fs/promises");
const { uploadFile} = require("../helpers/helper");

let getAllPlatforms = async (req, res) => {
  try {
    const platforms = await prisma.platform.findMany();
    res.json({ status: "success", data: platforms });
  } catch (error) {
    res.json({ status: "failed", error: "Error retrieving platforms" });
  }
};

let getPlatformById = async (req, res) => {
  const { id } = req.params;
  try {
    const platform = await prisma.platform.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (platform) {
      res.json({ status: "success", data: platform });
    } else {
      res.json({ status: "warning", data: "Platform not found" });
    }
  } catch (error) {
    res.json({ status: "failed", data: "Error retrieving platform" });
  }
};

const createPlatform = async (req, res) => {
  const { name, description } = req.body;
  let fileName;

  try {
    if (req.files) {
      fileName = await uploadFile(req.files.emblem, "./uploads/platforms");
    }

    const platform = await prisma.platform.create({
      data: {
        name, description,
        emblem: `platforms/${fileName}`,
      },
    });
    res.json({ status: "success", data: platform });
    console.log("Platform created successfully");
  } catch (error) {
    if (fileName) {
      await unlink(`./uploads/platforms/${fileName}`);
    }

    console.error(error);
    res.json({ status: "failed", error: "Error creating platform" });
  }
};

let updatePlatform = async (req, res) => {
  const { id } = req.params;
  const {name, description } = req.body;
  let fileName;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    if (req.files) {
      fileName = await uploadFile(req.files.emblem, "./uploads/platforms");
    }

    const updatedPlatform = await prisma.platform.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name, description,
        emblem: `platforms/${fileName}`,
      },
    });
    res.json({ status: "success", data: updatedPlatform });
    console.log("Platform updated successfully");
  } catch (error) {
    unlink(resolve("uploads", "platforms", fileName), (err) =>
      console.log(err?.message || `Deleted ${fileName}`)
    );
    res.json({ staus: "failed", error: "Error updating platform" });
  }
};

let deletePlatform = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPlatform = await prisma.platform.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json({ status: "success", data: deletedPlatform });
  } catch (error) {
    res.status(500).json({ status: "failed", error: "Error deleting platform" });
  }
};

module.exports = {
  getAllPlatforms,
  getPlatformById,
  createPlatform,
  updatePlatform,
  deletePlatform,
};
