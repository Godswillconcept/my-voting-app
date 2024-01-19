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

let latestPollsByCount = async (req, res) => {
  try {
    let { count = 5 } = req.body;
    const polls = await prisma.poll.findMany({
      take: Number(count),
      orderBy: {
        id: "desc",
      },
    });
    res.json({ status: "success", data: polls });
  } catch (error) {
    console.error("Error retrieving polls:", error);
    res.status(500).json({ status: "failed", error: "Error retrieving polls" });
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

const addPlatformToPoll = async (req, res) => {
  try {
    const { platform_ids, poll_id } = req.body;
    const pollPlatforms = [];

    // Check if the platform is already associated with the poll
    const existingPlatforms = await prisma.pollPlatform.findMany({
      where: {
        poll_id: parseInt(poll_id),
        platform_id: {
          in: platform_ids.map((id) => parseInt(id)),
        },
      },
    });

    const existingPlatformIds = existingPlatforms.map(
      (platform) => platform.platform_id
    );

    for (const platform_id of platform_ids) {
      // Check if the platform is not already associated with the poll
      if (!existingPlatformIds.includes(parseInt(platform_id))) {
        try {
          const pollPlatform = await prisma.pollPlatform.create({
            data: {
              platform_id: parseInt(platform_id),
              poll_id: parseInt(poll_id),
            },
          });
          pollPlatforms.push(pollPlatform);
        } catch (error) {
          console.error("Error adding platform to poll:", error);
          return res.status(500).json({
            status: "failed",
            error: "Error adding platform to poll",
          });
        }
      }
    }

    console.log(pollPlatforms);
    return res.json({
      status: "success",
      data: "Platforms added to poll successfully.",
    });
  } catch (error) {
    console.error("Error in addPlatformToPoll:", error);
    return res
      .status(500)
      .json({ status: "failed", error: "Internal Server Error" });
  }
};

let pollDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const poll = await prisma.poll.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        id: true,
        name: true,
        description: true,
        start_time: true,
        end_time: true,
        candidates: {
          select: {
            id: true,
            name: true,
            bio: true,
            photo: true,
            platform: true,
          },
        },
        pollPlatforms: {
          select: {
            platform: true,
          },
        },
      },
    });
    if (poll) {
      res.json({
        status: "success",
        data: {
          ...poll,
        },
      });
    } else {
      res.json({ status: "warning", data: "Poll not found" });
    }
  } catch (error) {
    res.json({ status: "failed", data: "Error retrieving poll" });
  }
};

let platformsByPoll = async (req, res) => {
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

    res.json({ status: "success", data: platformsByPoll });
  } catch (error) {
    res.json({ status: "failed", data: error });
  }
};

let candidatesByPoll = async (req, res) => {
  try {
    const { id } = req.params;
    const candidatesByPoll = await prisma.candidate.findMany({
      where: {
        AND: [
          { poll_id: parseInt(id) },
          {
            OR: [{ platform_id: { not: null } }, { platform_id: null }],
          },
        ],
      },
      select: {
        id: true,
        name: true,
        bio: true,
        photo: true,
        is_independent: true,
        platform_id: true,
        platform: true,
        poll: true,
      },
    });

    res.json({ status: "success", data: candidatesByPoll });
  } catch (error) {
    res.json({ status: "error", data: error });
  }
};

module.exports = {
  getAllPolls,
  latestPollsByCount,
  createPoll,
  updatePoll,
  deletePoll,
  addPlatformToPoll,
  pollDetail,
  platformsByPoll,
  candidatesByPoll,
};
