const { Vote, Candidate, Poll, User } = require("../models");

const getAllVotes = async (req, res) => {
  try {
    // Get grouped votes with counts
    const votes = await Vote.findAll({
      attributes: [
        'candidate_id',
        'poll_id',
        [sequelize.fn('COUNT', sequelize.col('id')), 'vote_count']
      ],
      group: ['candidate_id', 'poll_id'],
      include: [
        {
          model: Candidate,
          as: 'candidate',
          attributes: ['id', 'name', 'photo'],
          include: [
            {
              model: Platform,
              as: 'platform',
              attributes: ['id', 'name', 'description']
            }
          ]
        },
        {
          model: Poll,
          as: 'poll',
          attributes: ['id', 'name', 'description']
        }
      ]
    });

    res.json({
      status: "success",
      data: votes
    });
  } catch (error) {
    console.error("Error retrieving vote information:", error);
    res
      .status(500)
      .json({ status: "failed", error: "Error retrieving vote information" });
  }
};

async function getVoteByPoll(req, res) {
  const { pollId } = req.params;

  try {
    const votes = await Vote.findAll({
      attributes: [
        'candidate_id',
        'poll_id',
        [sequelize.fn('COUNT', sequelize.col('id')), 'vote_count']
      ],
      group: ['candidate_id', 'poll_id'],
      where: {
        poll_id: parseInt(pollId)
      },
      include: [
        {
          model: Candidate,
          as: 'candidate',
          attributes: ['id', 'name', 'photo'],
          include: [
            {
              model: Platform,
              as: 'platform',
              attributes: ['id', 'name', 'description']
            }
          ]
        },
        {
          model: Poll,
          as: 'poll',
          attributes: ['id', 'name', 'description']
        }
      ]
    });

    res.json({
      status: "success",
      data: votes
    });
  } catch (error) {
    console.error("Error retrieving vote information:", error);
    res
      .status(500)
      .json({ status: "failed", error: "Error retrieving vote information" });
  }
}

const createVote = async (req, res) => {
  const { candidate_id, poll_id } = req.body;

  try {
    const transaction = await sequelize.transaction();
    
    try {
      // Check if user has already voted in this poll
      const existingVote = await Vote.findOne({
        where: {
          user_id: req.userId,
          poll_id: parseInt(poll_id)
        },
        transaction
      });

      if (existingVote) {
        await transaction.rollback();
        return res.status(400).json({
          status: "failed",
          error: "User has already voted in this poll"
        });
      }

      const vote = await Vote.create({
        candidate_id: parseInt(candidate_id),
        user_id: req.userId,
        poll_id: parseInt(poll_id)
      }, { transaction });

      await transaction.commit();
      res.json({ status: "success", data: vote });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "failed", error: "Error creating vote" });
  }
};

const votesPerCandidate = async (req, res) => {
  try {
    const votes = await Vote.findAll({
      attributes: [
        'candidate_id',
        [sequelize.fn('COUNT', sequelize.col('id')), 'vote_count']
      ],
      group: ['candidate_id'],
      where: {
        poll_id: 1 // Replace with actual poll ID
      },
      include: [
        {
          model: Candidate,
          as: 'candidate',
          attributes: ['id', 'name', 'photo'],
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

    res.json({ status: "success", data: votes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "failed", error: "Error retrieving votes" });
  }
};

const leadingCandidates = async (req, res) => {
  try {
    const votes = await Vote.findAll({
      attributes: [
        'candidate_id',
        [sequelize.fn('COUNT', sequelize.col('id')), 'vote_count']
      ],
      group: ['candidate_id'],
      where: {
        poll_id: parseInt(req.params.pollId) // Get poll ID from params
      },
      order: [
        [sequelize.fn('COUNT', sequelize.col('id')), 'DESC']
      ],
      include: [
        {
          model: Candidate,
          as: 'candidate',
          attributes: ['id', 'name', 'photo'],
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

    res.json({ status: "success", data: votes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "failed", error: "Error retrieving leading candidates" });
  }
};

const totalVotesPerPoll = async (req, res) => {
  try {
    const votes = await Vote.findAll({
      attributes: [
        'poll_id',
        [sequelize.fn('COUNT', sequelize.col('id')), 'vote_count']
      ],
      group: ['poll_id'],
      include: [
        {
          model: Poll,
          as: 'poll',
          attributes: ['id', 'name', 'description']
        }
      ]
    });

    res.json({ status: "success", data: votes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "failed", error: "Error retrieving total votes per poll" });
  }
};

module.exports = {
  getAllVotes,
  getVoteByPoll,
  createVote,
  votesPerCandidate,
  leadingCandidates,
  totalVotesPerPoll,
};
