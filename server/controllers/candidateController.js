const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();
const { unlink } = require("fs/promises");
const fs = require("fs");
const { uploadFile, parseExcel } = require("../helpers/helper");

let getAllCandidates = async (req, res) => {
  try {
    const candidates = await prisma.candidate.findMany({
      include: {
        platform: {
          select: {
            name: true,
            description: true,
            emblem: true,
          },
        },
      },
    });
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
  const { name, bio, platform_id, poll_id, isIndependent } = req.body; // Added 'isIndependent' to the destructuring assignment
  let fileName;

  try {
    if (req.files) {
      fileName = await uploadFile(req.files.photo, "./uploads/candidates");
    }

    const candidate = await prisma.candidate.create({
      data: {
        name,
        bio,
        platform_id: platform_id !== "null" ? parseInt(platform_id) : null, // Changed '!=' to '!=='
        poll_id: parseInt(poll_id),
        is_independent: isIndependent !== "undefined" ? true : false, // Changed '!=' to '!=='
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
        platform_id: platform_id !== "null" ? parseInt(platform_id) : null, // Changed '!=' to '!=='
        poll_id: parseInt(poll_id),
        is_independent: isIndependent !== "undefined" ? true : false, // Changed '!=' to '!=='
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
  updateCandidate,
  deleteCandidate,
};
