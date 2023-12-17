const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

let getAllVotes = async (req, res) => {
  try {
    const votes = await prisma.vote.findMany();
    res.json({ status: "success", data: votes });
  } catch (error) {
    res.json({ status: "failed", error: "Error retrieving votes" });
  }
};

let getVoteById = async (req, res) => {
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
  const { candidate_id, user_id, poll_id } = req.body;

  try {
    const vote = await prisma.vote.create({
      data: { candidate_id, user_id, poll_id },
    });
    res.json({ status: "success", data: vote });
    console.log("Vote created successfully");
  } catch (error) {
    console.error(error);
    res.json({ status: "failed", error: "Error creating vote" });
  }
};

module.exports = {
  getAllVotes,
  getVoteById,
  createVote,
};
