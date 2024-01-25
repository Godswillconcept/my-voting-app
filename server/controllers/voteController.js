const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllVotes = async (req, res) => {
  try {
    const votes = await prisma.vote.findMany();
    res.json({ status: "success", data: votes });
  } catch (error) {
    res.json({ status: "failed", error: "Error retrieving votes" });
  }
};

const getVoteById = async (req, res) => {
  const { id } = req.params;
  try {
    const vote = await prisma.vote.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (vote) {
      res.json({ status: "success", data: vote });
    } else {
      res.json({ status: "warning", data: "Vote not found" });
    }
  } catch (error) {
    res.json({ status: "failed", data: "Error retrieving vote" });
  }
};

const createVote = async (req, res) => {
  const { candidate_id, poll_id } = req.body;

  try {
    const vote = await prisma.vote.create({
      data: {
        candidate_id: parseInt(candidate_id),
        user_id: req.userId,
        poll_id: parseInt(poll_id),
      },
    });
    res.json({ status: "success", data: vote });
  } catch (error) {
    console.error(error);
    res.json({ status: "failed", error: "Error creating vote" });
  }
};

const votesPerCandidate = async (req, res) => {
  try {
    const votesPerCandidate = await prisma.vote.groupBy({
      by: ['candidate_id'],
      where: {
        poll_id: 1, // Replace 'pollId' with the actual poll ID
      },
      _count: {
        candidate_id: true,
      },
    });
    res.json({ votesPerCandidate });
  } catch (error) {
    console.log(error);
  }
};


const leadingCandidates = async (req, res) => {
  try {
    const leadingCandidates = await prisma.vote.groupBy({
      by: ['candidate_id'],
      where: {
        poll_id: pollId, // Replace 'pollId' with the actual poll ID
      },
      _count: {
        candidate_id: true,
      },
      orderBy: {
        _count: {
          candidate_id: 'desc',
        },
      },
    });
    res.json({leadingCandidates})
  } catch (error) {
    console.log(error);
  }
}

const totalVotesPerPoll = async (req, res) => {
  try {
    const totalVotesPerPoll = await prisma.vote.groupBy({
      by: ['poll_id'],
      _count: {
        poll_id: true,
      },
    });

    res.json({totalVotesPerPoll})
  } catch (error) {
    console.log(error);
  }
} 

module.exports = {
  getAllVotes,
  getVoteById,
  createVote,
  votesPerCandidate,
  leadingCandidates,
  totalVotesPerPoll
};
