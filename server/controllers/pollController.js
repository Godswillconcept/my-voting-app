const { dateToISOString } = require("../helpers");
const { Poll, Candidate, Platform, PollPlatform } = require("../models");

let getAllPolls = async (req, res) => {
  try {
    const polls = await Poll.findAll();
    res.json({ status: "success", data: polls });
  } catch (error) {
    res.json({ status: "failed", error: "Error retrieving polls" });
  }
};

let activePolls = async (req, res) => {
  try {
    const polls = await Poll.findAll({
      where: {
        [Op.or]: [
          {
            start_time: {
              [Op.gte]: new Date(),
            },
          },
          {
            end_time: {
              [Op.gte]: new Date(),
            },
          },
        ],
      },
      order: [
        ['id', 'ASC']
      ],
      attributes: ['id', 'name', 'description', 'start_time', 'end_time'],
      include: [
        {
          model: Candidate,
          as: 'candidates',
          attributes: ['id', 'name', 'bio', 'photo', 'platform_id'],
        },
        {
          model: PollPlatform,
          as: 'pollPlatforms',
          include: [
            {
              model: Platform,
              as: 'platform',
              attributes: ['id', 'name', 'description']
            }
          ]
        }
      ]
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
    const transaction = await sequelize.transaction();
    
    try {
      const poll = await Poll.create({
        ...pollData,
        start_time: dateToISOString(start_time),
        end_time: dateToISOString(end_time),
      }, { transaction });

      await transaction.commit();
      res.json({ status: "success", data: poll });
      console.log("Poll created successfully");
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error(error);
    res.json({ status: "failed", error: "Error creating poll" });
  }
};

let updatePoll = async (req, res) => {
  const { id } = req.params;
  const { start_time, end_time, ...pollData } = req.body;

  try {
    const updatedPoll = await Poll.update(
      {
        ...pollData,
        start_time: dateToISOString(start_time),
        end_time: dateToISOString(end_time),
      },
      {
        where: {
          id: parseInt(id)
        },
        returning: true
      }
    );
    res.json({ status: "success", data: updatedPoll[1][0] });
    console.log("Poll updated successfully");
  } catch (error) {
    res.json({ status: "failed", error: "Error updating poll" });
  }
};

let deletePoll = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPoll = await Poll.destroy({
      where: {
        id: parseInt(id)
      }
    });
    res.json({ status: "success", data: deletedPoll });
  } catch (error) {
    res.status(500).json({ status: "failed", error: "Error deleting poll" });
  }
};

const attachPlatform = async (req, res) => {
  try {
    const transaction = await sequelize.transaction();
    
    try {
      const { platform_ids, poll_id } = req.body;
      const pollPlatforms = [];

      // Check if the platform is already associated with the poll
      const existingPlatforms = await PollPlatform.findAll({
        where: {
          poll_id: parseInt(poll_id),
          platform_id: {
            [Op.in]: platform_ids.map((id) => parseInt(id))
          }
        },
        transaction
      });

      const existingPlatformIds = existingPlatforms.map(
        (platform) => platform.platform_id
      );

      for (const platform_id of platform_ids) {
        // Check if the platform is not already associated with the poll
        if (!existingPlatformIds.includes(parseInt(platform_id))) {
          try {
            const pollPlatform = await PollPlatform.create({
              platform_id: parseInt(platform_id),
              poll_id: parseInt(poll_id)
            }, { transaction });
            pollPlatforms.push(pollPlatform);
          } catch (error) {
            console.error("Error adding platform to poll:", error);
            throw error;
          }
        }
      }

      await transaction.commit();
      console.log(pollPlatforms);
      return res.json({
        status: "success",
        data: pollPlatforms,
      });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error("Error in attaching Platform:", error);
    return res
      .status(500)
      .json({ status: "failed", error: "Internal Server Error" });
  }
};

let pollDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const poll = await Poll.findByPk(id, {
      attributes: ['id', 'name', 'description', 'start_time', 'end_time'],
      include: [
        {
          model: Candidate,
          as: 'candidates',
          attributes: ['id', 'name', 'bio', 'photo', 'platform_id'],
        },
        {
          model: PollPlatform,
          as: 'pollPlatforms',
          include: [
            {
              model: Platform,
              as: 'platform',
              attributes: ['id', 'name', 'description']
            }
          ]
        }
      ]
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
  activePolls,
  createPoll,
  updatePoll,
  deletePoll,
  attachPlatform,
  pollDetail,
  platformsByPoll,
  candidatesByPoll,
};
