const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


let getAllReviews = async (req, res) => {
  try {
    const reviews = await prisma.review.findMany();
    res.json({ status: "success", data: reviews });
  } catch (error) {
    res.json({ status: "failed", error: "Error retrieving reviews" });
  }
};

let getReviewById = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await prisma.review.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (review) {
      res.json({ status: "success", data: review });
    } else {
      res.json({ status: "warning", data: "Review not found" });
    }
  } catch (error) {
    res.json({ status: "failed", data: "Error retrieving review" });
  }
};

const createReview = async (req, res) => {
  const { comment, user_id, poll_id} = req.body;

  try {
    const review = await prisma.review.create({
      data: { comment, user_id, poll_id},
    });
    res.json({ status: "success", data: review });
    console.log("Review created successfully");
  } catch (error) {
    console.error(error);
    res.json({ status: "failed", error: "Error creating review" });
  }
};

let updateReview = async (req, res) => {
  const { id } = req.params;
  const { comment, user_id, poll_id} = req.body;

  try {
    const updatedReview = await prisma.review.update({
      where: {
        id: parseInt(id),
      },
      data: { comment, user_id, poll_id},
    });
    res.json({ status: "success", data: updatedReview });
    console.log("Review updated successfully");
  } catch (error) {
    res.json({ staus: "failed", error: "Error updating review" });
  }
};

let deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedReview = await prisma.review.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json({ status: "success", data: deletedReview });
  } catch (error) {
    res.status(500).json({ status: "failed", error: "Error deleting review" });
  }
};

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
};
