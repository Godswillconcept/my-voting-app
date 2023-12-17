const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();
const { unlink } = require("fs/promises");
const fs = require("fs");
const {
  uploadFile,
  parseExcel,
} = require("../helpers/helper");

let getAllCandidates = async (req, res) => {
  try {
    const candidates = await prisma.candidate.findMany();
    res.json({ status: "success", data: candidates });
  } catch (error) {
    res.json({ status: "failed", error: "Error retrieving candidates" });
  }
};

let getCandidateById = async (req, res) => {
  const { id } = req.params;
  try {
    const candidate = await prisma.candidate.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (candidate) {
      res.json({ status: "success", data: candidate });
    } else {
      res.json({ status: "warning", data: "Candidate not found" });
    }
  } catch (error) {
    res.json({ status: "failed", data: "Error retrieving candidate" });
  }
};

const createCandidate = async (req, res) => {
  const { name, bio, platform_id } = req.body;
  let fileName;

  try {
    if (req.files) {
      fileName = await uploadFile(req.files.photo, "./uploads/candidates");
    }

    const candidate = await prisma.candidate.create({
      data: {
        name,
        bio,
        platform_id,
        photo: !req.files ? null : `candidates/${fileName}`,
      },
    });
    res.json({ status: "success", data: candidate });
    console.log("Candidate created successfully");
  } catch (error) {
    if (fileName) {
      await unlink(`./uploads/candidates/${fileName}`);
    }

    console.error(error);
    res.json({ status: "failed", error: "Error creating candidate" });
  }
};

const bulkCreateCandidates = async (req, res) => {
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
    const candidatesData = parseExcel(filePath);

    // Log parsed data to check its content
    fs.unlinkSync(filePath);

    // Check for existing phone numbers in the database
    const createdCandidates = [];
    for (const candidate of candidatesData) {
      try {
        const createdCandidate = await prisma.candidate.create({
          data: {...candidate, photo: null},
        });
        createdCandidates.push(createdCandidate);
      } catch (error) {
        console.error(
          `Error creating candidate :`,
          error
        );
      }
    }

    res.send("Candidates uploaded successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

let updateCandidate = async (req, res) => {
  const { id } = req.params;
  const { name, bio, platform_id } = req.body;
  let fileName;

  try {
    if (req.files) {
      fileName = await uploadFile(req.files.photo, "./uploads/candidates");
    }

    const updatedCandidate = await prisma.candidate.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        bio,
        platform_id,
        photo: !req.files ? null : `candidates/${fileName}`,
      },
    });
    res.json({ status: "success", data: updatedCandidate });
    console.log("Candidate updated successfully");
  } catch (error) {
    unlink(resolve("uploads", "candidates", fileName), (err) =>
      console.log(err?.message || `Deleted ${fileName}`)
    );
    res.json({ staus: "failed", error: "Error updating candidate" });
  }
};

let deleteCandidate = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCandidate = await prisma.candidate.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json({ status: "success", data: deletedCandidate });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", error: "Error deleting candidate" });
  }
};

module.exports = {
  getAllCandidates,
  getCandidateById,
  createCandidate,
  bulkCreateCandidates,
  updateCandidate,
  deleteCandidate,
};
