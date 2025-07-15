const { Review, User, Poll } = require("../models");


let getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'first_name', 'last_name']
        },
        {
          model: Poll,
          as: 'poll',
          attributes: ['id', 'name', 'description']
        }
      ]
    });
    res.json({ status: "success", data: reviews });
  } catch (error) {
    res.json({ status: "failed", error: "Error retrieving reviews" });
  }
};

let getReviewById = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await Review.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'first_name', 'last_name']
        },
        {
          model: Poll,
          as: 'poll',
          attributes: ['id', 'name', 'description']
        }
      ]
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
  const { comment, poll_id } = req.body;

  try {
    const transaction = await sequelize.transaction();
    
    try {
      // Use req.userId from authentication middleware
      const review = await Review.create({
        comment,
        user_id: req.userId,
        poll_id: parseInt(poll_id)
      }, { transaction });

      await transaction.commit();
      res.json({ status: "success", data: review });
      console.log("Review created successfully");
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "failed", error: "Error creating review" });
  }
};

let updateReview = async (req, res) => {
  const { id } = req.params;
  const { comment, poll_id } = req.body;

  try {
    const transaction = await sequelize.transaction();
    
    try {
      const updatedReview = await Review.update(
        {
          comment,
          user_id: req.userId,
          poll_id: parseInt(poll_id)
        },
        {
          where: {
            id: parseInt(id)
          },
          returning: true,
          transaction
        }
      );

      await transaction.commit();
      res.json({ status: "success", data: updatedReview[1][0] });
      console.log("Review updated successfully");
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    res.json({ status: "failed", error: "Error updating review" });
  }
};

let deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await sequelize.transaction();
    
    try {
      const deletedReview = await Review.destroy({
        where: {
          id: parseInt(id)
        },
        transaction
      });

      await transaction.commit();
      res.json({ status: "success", data: deletedReview });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
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
