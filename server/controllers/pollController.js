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

let addPlatformToPoll = async (req, res) => {
  try {
    const { platform_ids, poll_id } = req.body;
    const pollPlatforms = [];

    for (const platform_id of platform_ids) {
      try {
        let pollPlatform = await prisma.pollPlatform.create({
          data: { platform_id, poll_id },
        });
        pollPlatforms.push(pollPlatform);
      } catch (error) {
        console.error("Error adding platform to poll:", error);
        return res.json({
          status: "failed",
          error: "Error adding platform to poll",
        });
      }
    }

    console.log(pollPlatforms);
    return res.send("Platforms added to poll successfully.");
  } catch (error) {
    console.error("Error in addPlatformToPoll:", error);
    return res
      .status(500)
      .json({ status: "failed", error: "Internal Server Error" });
  }
};

let getPlatformsByPoll = async (req, res) => {
  const { id } = req.params;

  try {
    let platformsByPoll = await prisma.pollPlatform.findMany({
      where: {
        poll_id: parseInt(id),
      },
      select: {
        platform_id: true,
        // Use "include" to perform a join with the Platform table
        platform: {
          select: {
            name: true,
            description: true,
            emblem: true,
          },
        },
      },
    });
    if (platformsByPoll) {
      res.json({ status: "success", data: platformsByPoll });
    } else {
      res.json({ status: "warning", data: "Platform not found" });
    }
  } catch (error) {
    res.json({
      status: "failed",
      data: "Error retrieving platforms for a poll",
    });
  }
};

module.exports = {
  getAllPolls,
  getPollById,
  createPoll,
  updatePoll,
  deletePoll,
  addPlatformToPoll,
  getPlatformsByPoll,
};
