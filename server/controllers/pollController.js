const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { dateToISOString } = require("../helpers/helper");

let getAllPolls = async (req, res) => {
  try {
    const polls = await prisma.poll.findMany();
    res.json({ status: "success", data: polls });
  } catch (error) {
    res.json({ status: "failed", error: "Error retrieving polls" });
  }
};

let getPollById = async (req, res) => {
  const { id } = req.params;
  try {
    const poll = await prisma.poll.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (poll) {
      res.json({ status: "success", data: poll });
    } else {
      res.json({ status: "warning", data: "Poll not found" });
    }
  } catch (error) {
    res.json({ status: "failed", data: "Error retrieving poll" });
  }
};

const createPoll = async (req, res) => {
  const { start_time, end_time, ...pollData } = req.body;

  try {
    const poll = await prisma.poll.create({
      data: {
        ...pollData,
        start_time: dateToISOString(start_time),
        end_time: dateToISOString(end_time),
      },
    });
    res.json({ status: "success", data: poll });
    console.log("Poll created successfully");
  } catch (error) {
    console.error(error);
    res.json({ status: "failed", error: "Error creating poll" });
  }
};

let updatePoll = async (req, res) => {
  const { id } = req.params;
  const { start_time, end_time, ...pollData } = req.body;

  try {
    const updatedPoll = await prisma.poll.update({
      where: {
        id: parseInt(id),
      },
      data: {
        ...pollData,
        start_time: dateToISOString(start_time),
        end_time: dateToISOString(end_time),
      },
    });
    res.json({ status: "success", data: updatedPoll });
    console.log("Poll updated successfully");
  } catch (error) {
    res.json({ staus: "failed", error: "Error updating poll" });
  }
};

let deletePoll = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPoll = await prisma.poll.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json({ status: "success", data: deletedPoll });
  } catch (error) {
    res.status(500).json({ status: "failed", error: "Error deleting poll" });
  }
};

module.exports = {
  getAllPolls,
  getPollById,
  createPoll,
  updatePoll,
  deletePoll,
};
