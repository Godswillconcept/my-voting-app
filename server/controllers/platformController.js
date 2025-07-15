const { unlink } = require("fs/promises");
const fs = require("fs");
const { uploadFile, parseExcel } = require("../helpers");
const { Platform, PollPlatform, Candidate } = require("../models");

let getAllPlatforms = async (req, res) => {
  try {
    const platforms = await Platform.findAll();
    res.json({ status: "success", data: platforms });
  } catch (error) {
    res.json({ status: "failed", error: "Error retrieving platforms" });
  }
};

let latestPlatformsByCount = async (req, res) => {
  try {
    const { count = 10 } = req.body;
    const platforms = await Platform.findAll({
      limit: Number(count),
      order: [["created_at", "DESC"]],
    });
    res.json({ status: "success", data: platforms });
  } catch (error) {
    res.json({ status: "failed", error: "Error retrieving platforms" });
  }
};

let platformDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const platform = await Platform.findByPk(id, {
      attributes: ['name', 'description', 'emblem'],
      include: [
        {
          model: PollPlatform,
          as: 'pollPlatforms',
          include: [
            {
              model: Poll,
              as: 'poll',
              attributes: ['name', 'description']
            }
          ]
        },
        {
          model: Candidate,
          as: 'candidates',
          attributes: ['name', 'bio', 'photo']
        }
      ]
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
    const transaction = await sequelize.transaction();
    
    try {
      if (req.files) {
        fileName = await uploadFile(req.files.emblem, "./uploads/platforms");
      }

      const platform = await Platform.create({
        name,
        description,
        emblem: !req.files ? null : `platforms/${fileName}`,
      }, { transaction });

      await transaction.commit();
      res.json({ status: "success", data: platform });
      console.log("Platform created successfully");
    } catch (error) {
      await transaction.rollback();
      if (fileName) {
        await unlink(`./uploads/platforms/${fileName}`);
      }
      throw error;
    }
  } catch (error) {
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

    const transaction = await sequelize.transaction();
    
    try {
      const createdPlatforms = [];
      for (const platform of platformsData) {
        try {
          const createdPlatform = await Platform.create({
            ...platform,
            emblem: null,
          }, { transaction });
          createdPlatforms.push(createdPlatform);
        } catch (error) {
          console.error(`Error creating platform:`, error);
          throw error;
        }
      }

      await transaction.commit();
      res.json({ status: "success", data: createdPlatforms });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
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

    const updatedPlatform = await Platform.update(
      {
        name,
        description,
        emblem: !req.files ? null : `platforms/${fileName}`,
      },
      {
        where: {
          id: parseInt(id)
        },
        returning: true
      }
    );

    res.json({ status: "success", data: updatedPlatform[1][0] });
    console.log("Platform updated successfully");
  } catch (error) {
    unlink(resolve("uploads", "platforms", fileName), (err) =>
      console.log(err?.message || `Deleted ${fileName}`)
    );
    res.json({ status: "failed", error: "Error updating platform" });
  }
};

let deletePlatform = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPlatform = await Platform.destroy({
      where: {
        id: parseInt(id)
      }
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
