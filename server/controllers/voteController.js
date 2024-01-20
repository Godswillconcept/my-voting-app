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

const voteCount = async (req, res) => {
  try {
    const { id } = req.params;
    const voteCount = await prisma.vote.groupBy({
      by: ["candidate_id", "poll_id"],
      where: {
        poll_id: parseInt(id),
      },
      _count: {
        user_id: true,
      },
    });
    res.json(voteCount);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllVotes,
  getVoteById,
  createVote,
  voteCount,
};
