const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { unlink } = require("fs/promises");
const fs = require("fs");
const { uploadFile, parseExcel } = require("../helpers/helper");

let getAllPlatforms = async (req, res) => {
  try {
    const platforms = await prisma.platform.findMany();
    res.json({ status: "success", data: platforms });
  } catch (error) {
    res.json({ status: "failed", error: "Error retrieving platforms" });
  }
};

let latestPlatformsByCount = async (req, res) => {
  try {
    const { count = 10 } = req.body;
    const platforms = await prisma.platform.findMany({
      take: Number(count),
      orderBy: {
        created_at: "desc",
      },
    });
    res.json({ status: "success", data: platforms });
  } catch (error) {
    res.json({ status: "failed", error: "Error retrieving platforms" });
  }
};

let platformDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const platform = await prisma.platform.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        name: true,
        description: true,
        emblem: true,
        pollPlatforms: {
          select: {
            poll: {
              select: {
                name: true,
                description: true,
              },
            },
          },
        },
        candidates: {
          select: {
            name: true,
            bio: true,
            photo: true,
          },
        },
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
        name,
        description,
        emblem: !req.files ? null : `platforms/${fileName}`,
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

const bulkCreatePlatforms = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }

    const excelFile = req.files.file;
    const uploadPath = "./uploads/excels"; // Set your desired upload path

    // Save the file temporarily
    const filePath = `${uploadPath}/${excelFile.name}`;
    await excelFile.mv(filePath);

    // Parse Excel data
    const platformsData = parseExcel(filePath);

    // Log parsed data to check its content
    fs.unlinkSync(filePath);

    // Check for existing phone numbers in the database
    const createdPlatforms = [];
    for (const platform of platformsData) {
      try {
        const createdPlatform = await prisma.platform.create({
          data: { ...platform },
        });
        createdPlatforms.push(createdPlatform);
      } catch (error) {
        console.error(`Error creating platform:`, error);
      }
    }

    res.send("Platforms uploaded successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

let updatePlatform = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  let fileName;

  try {
    if (req.files) {
      fileName = await uploadFile(req.files.emblem, "./uploads/platforms");
    }

    const updatedPlatform = await prisma.platform.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        description,
        emblem: !req.files ? null : `platforms/${fileName}`,
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
    res
      .status(500)
      .json({ status: "failed", error: "Error deleting platform" });
  }
};

module.exports = {
  getAllPlatforms,
  latestPlatformsByCount,
  platformDetail,
  createPlatform,
  updatePlatform,
  deletePlatform,
  bulkCreatePlatforms,
};
