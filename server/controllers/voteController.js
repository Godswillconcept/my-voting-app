const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllVotes = async (req, res) => {
  try {
    // Get grouped votes
    const groupedVotes = await prisma.vote.groupBy({
      by: ["candidate_id", "poll_id"],
      _count: {
        id: true,
      },
    });

    // Process the results to fetch related poll and candidate data
    const votesWithDetails = await Promise.all(
      groupedVotes.map(async (groupedVote) => {
        const candidate = await prisma.candidate.findUnique({
          where: { id: groupedVote.candidate_id },
          include: {
            platform: true, // Assuming platform is a relation in the candidate model
          },
        });
        const poll = await prisma.poll.findUnique({
          where: { id: groupedVote.poll_id },
        });

        // Combine the grouped vote data with related poll and candidate data
        return {
          ...groupedVote,
          poll,
          candidate,
        };
      })
    );
    res.json({
      status: "success",
      data: votesWithDetails,
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
    // Get grouped votes
    const groupedVotes = await prisma.vote.groupBy({
      by: ["poll_id", "candidate_id"],
      _count: {
        id: true,
      },
      where: {
        poll_id: parseInt(pollId),
      },
    });

    // Process the results to fetch related poll and candidate data
    const voteByPoll = await Promise.all(
      groupedVotes.map(async (groupedVote) => {
        const candidate = await prisma.candidate.findUnique({
          where: { id: groupedVote.candidate_id },
          select: {
            id: true,
            name: true,
            platform: true,
            photo: true,
            poll: true,
          },
        });

        // Combine the grouped vote data with related poll and candidate data
        return {
          ...groupedVote,
          poll,
          candidate,
        };
      })
    );

    res.json({
      status: "success",
      data: voteByPoll,
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
      by: ["candidate_id"],
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
      by: ["candidate_id"],
      where: {
        poll_id: pollId, // Replace 'pollId' with the actual poll ID
      },
      _count: {
        candidate_id: true,
      },
      orderBy: {
        _count: {
          candidate_id: "desc",
        },
      },
    });
    res.json({ leadingCandidates });
  } catch (error) {
    console.log(error);
  }
};

const totalVotesPerPoll = async (req, res) => {
  try {
    const totalVotesPerPoll = await prisma.vote.groupBy({
      by: ["poll_id"],
      _count: {
        poll_id: true,
      },
    });

    res.json({ totalVotesPerPoll });
  } catch (error) {
    console.log(error);
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
