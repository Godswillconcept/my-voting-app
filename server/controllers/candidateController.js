const bcrypt = require("bcrypt");
const { unlink } = require("fs/promises");
const fs = require("fs");
const { uploadFile, parseExcel } = require("../helpers");
const { Candidate, Platform, Poll } = require("../models");

let getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.findAll({
      include: [
        {
          model: Platform,
          as: 'platform',
          attributes: ['name', 'description', 'emblem']
        }
      ]
    });
    res.json({ status: "success", data: candidates });
  } catch (error) {
    res.json({ status: "failed", error: "Error retrieving candidates" });
  }
};

let latestCandidatesByCount = async (req, res) => {
  try {
    const { count = 10 } = req.body;
    const candidates = await Candidate.findAll({
      limit: Number(count),
      order: [['created_at', 'DESC']],
      include: [
        {
          model: Platform,
          as: 'platform',
          attributes: ['name', 'description', 'emblem']
        }
      ]
    });
    res.json({ status: "success", data: candidates });
  } catch (error) {
    res.json({ status: "failed", error: "Error retrieving candidates" });
  }
};

let candidateDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const candidate = await Candidate.findByPk(id, {
      attributes: ['name', 'bio', 'photo', 'is_independent'],
      include: [
        {
          model: Platform,
          as: 'platform',
          attributes: ['id', 'name', 'description', 'emblem']
        },
        {
          model: Poll,
          as: 'poll',
          attributes: ['id', 'name', 'description']
        }
      ]
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
  const { name, bio, platform_id, poll_id, is_independent } = req.body; 
  let fileName;

  try {
    const transaction = await sequelize.transaction();
    
    try {
      if (req.files) {
        fileName = await uploadFile(req.files.photo, "./uploads/candidates");
      }

      const candidate = await Candidate.create({
        name,
        bio,
        platform_id: platform_id !== "null" ? parseInt(platform_id) : null, 
        poll_id: parseInt(poll_id),
        is_independent: is_independent !== "undefined" ? true : false, 
        photo: !req.files ? null : `candidates/${fileName}`,
      }, { transaction });

      await transaction.commit();
      res.json({ status: "success", data: candidate });
      console.log("Candidate created successfully");
    } catch (error) {
      await transaction.rollback();
      if (fileName) {
        await unlink(`./uploads/candidates/${fileName}`);
      }
      throw error;
    }
  } catch (error) {
    console.error(error);
    res.json({ status: "failed", error: "Error creating candidate" });
  }
};

let updateCandidate = async (req, res) => {
  const { id } = req.params;
  const { name, bio, platform_id, poll_id, is_independent } = req.body;
  let fileName;

  try {
    const transaction = await sequelize.transaction();
    
    try {
      if (req.files) {
        fileName = await uploadFile(req.files.photo, "./uploads/candidates");
      }

      const updatedCandidate = await Candidate.update(
        {
          name,
          bio,
          platform_id: platform_id !== "null" ? parseInt(platform_id) : null,
          poll_id: parseInt(poll_id),
          is_independent: is_independent !== "undefined" ? true : false,
          photo: !req.files ? null : `candidates/${fileName}`,
        },
        {
          where: {
            id: parseInt(id)
          },
          returning: true,
          transaction
        }
      );

      await transaction.commit();
      res.json({ status: "success", data: updatedCandidate[1][0] });
      console.log("Candidate updated successfully");
    } catch (error) {
      await transaction.rollback();
      if (fileName) {
        await unlink(resolve("uploads", "candidates", fileName), (err) =>
          console.log(err?.message || `Deleted ${fileName}`)
        );
      }
      throw error;
    }
  } catch (error) {
    res.json({ status: "failed", error: "Error updating candidate" });
  }
};

let deleteCandidate = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await sequelize.transaction();
    
    try {
      const deletedCandidate = await Candidate.destroy({
        where: {
          id: parseInt(id)
        },
        transaction
      });

      await transaction.commit();
      res.json({ status: "success", data: deletedCandidate });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", error: "Error deleting candidate" });
  }
};

module.exports = {
  getAllCandidates,
  latestCandidatesByCount,
  candidateDetail,
  createCandidate,
  updateCandidate,
  deleteCandidate,
};
