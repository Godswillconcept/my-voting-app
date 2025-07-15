const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { unlink } = require("fs/promises");
const fs = require("fs");
const {
  uploadFile,
  dateToISOString,
  parseExcel,
  transporter,
} = require("../helpers");
const { User } = require("../models");

// Retrieve all users
let getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ status: "success", data: users });
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ status: "failed", error: "Error retrieving users" });
  }
};

let latestUsersByCount = async (req, res) => {
  try {
    let { count = 5 } = req.body;

    const users = await User.findAll({
      limit: Number(count),
      order: [["created_at", "DESC"]],
    });
    res.json({ status: "success", data: users });
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ status: "failed", error: "Error retrieving users" });
  }
};

// Retrieve user profile by ID
let userProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      include: [
        {
          model: Vote,
          as: "votes",
          include: [
            {
              model: Poll,
              as: "poll",
              attributes: ["name", "description"],
            },
            {
              model: Candidate,
              as: "candidate",
              attributes: ["name", "bio", "photo"],
            },
          ],
        },
        {
          model: Review,
          as: "reviews",
          include: [
            {
              model: Poll,
              as: "poll",
              attributes: ["name", "description"],
            },
          ],
          attributes: ["comment"],
        },
      ],
    });

    if (user) {
      res.json({ status: "success", data: user });
    } else {
      res.json({ status: "warning", data: "User not found" });
    }
  } catch (error) {
    res.json({ status: "failed", error: "Error retrieving user" });
  }
};

// Create a new user
const createUser = async (req, res) => {
  const { password, dob, ...userData } = req.body;
  let fileName;

  try {
    const transaction = await sequelize.transaction();
    
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      if (req.files) {
        fileName = await uploadFile(req.files.photo, "./uploads/users");
      }

      const isoDob = dateToISOString(dob);
      const userCount = await User.count({ transaction });

      const user = await User.create({
        ...userData,
        password: hashedPassword,
        dob: isoDob,
        role: userCount === 0 ? "Admin" : "Voter",
        photo: !req.files ? null : `users/${fileName}`,
      }, { transaction });

      await transaction.commit();
      res.json({ status: "success", data: user });
    } catch (error) {
      await transaction.rollback();
      if (fileName) {
        await unlink(`./uploads/users/${fileName}`);
      }
      throw error;
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ status: "failed", error: "Error creating user" });
  }
};

// Bulk create users from an Excel file
const bulkCreateUsers = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res
        .status(400)
        .json({ status: "failed", error: "No files were uploaded." });
    }

    const excelFile = req.files.file;
    const uploadPath = "./uploads/excels";

    // Save the file temporarily
    const filePath = `${uploadPath}/${excelFile.name}`;
    await excelFile.mv(filePath);

    // Parse Excel data
    const usersData = parseExcel(filePath);

    // Log parsed data to check its content
    fs.unlinkSync(filePath);

    // Hash passwords and format date of birth
    const transaction = await sequelize.transaction();
    
    try {
      const userCount = await User.count({ transaction });
      const hashedUsers = await Promise.all(
        usersData.map(async (user) => {
          const formattedDob = new Date(user.dob).toISOString();
          const hashedPassword = await bcrypt.hash(user.password, 10);
          return {
            ...user,
            password: hashedPassword,
            dob: formattedDob,
            role: userCount === 0 ? "Admin" : "Voter",
          };
        })
      );

      // Check for existing phone numbers in the database
      const createdUsers = [];
      for (const user of hashedUsers) {
        try {
          const existingUser = await User.findOne({
            where: {
              phone: `0${user.phone}`,
            },
            transaction
          });

          if (!existingUser) {
            const createdUser = await User.create({
              ...user,
              phone: `0${user.phone}`,
            }, { transaction });
            createdUsers.push(createdUser);
          }
        } catch (error) {
          console.error(
            `Error creating user with phone number ${user.phone}:`,
            error
          );
          throw error;
        }
      }

      await transaction.commit();
      res.json({ status: "success", data: "Users uploaded successfully." });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error("Error during bulk user creation:", error);
    res.status(500).json({ status: "failed", error: "Internal Server Error" });
  }
};

// Update an existing user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { password, dob, ...userData } = req.body;
  let fileName;

  try {
    const transaction = await sequelize.transaction();
    
    try {
      if (req.files) {
        fileName = await uploadFile(req.files.photo, "./uploads/users");
      }

      const isoDob = dateToISOString(dob);

      const updatedUser = await User.update(
        {
          ...userData,
          password: password ? await bcrypt.hash(password, 10) : undefined,
          dob: isoDob,
          photo: !req.files ? null : `users/${fileName}`,
        },
        {
          where: { id: parseInt(id) },
          returning: true,
          transaction
        }
      );

      await transaction.commit();
      res.json({ status: "success", data: updatedUser[1][0] });
    } catch (error) {
      await transaction.rollback();
      if (fileName) {
        await unlink(`./uploads/users/${fileName}`);
      }
      throw error;
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ status: "failed", error: "Error updating user" });
  }
};

// Delete an existing user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await sequelize.transaction();
    
    try {
      const deletedUser = await User.destroy({
        where: {
          id: parseInt(id),
        },
        transaction
      });

      await transaction.commit();
      res.json({ status: "success", data: deletedUser });
      console.log("User deleted successfully");
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ status: "failed", error: "Error deleting user" });
  }
};

// Login user and generate token
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        status: "failed",
        error: "Invalid credentials",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({
        status: "failed",
        error: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || "your-secret-key"
    );

    res.json({
      status: "success",
      data: {
        token,
        user: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ status: "failed", error: "Internal server error" });
  }
};

const userDetail = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: {
        exclude: ["password"],
      },
    });

    res.json({ status: "success", data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Logout user and clear token
const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ status: "success", data: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ status: "failed", error: "Error logging out" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: "failed",
        error: "User not found",
      });
    }

    const otp = OTPGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });

    // Store OTP in session or database
    req.session.resetOTP = {
      email,
      otp,
      expiresAt: Date.now() + 300000, // 5 minutes
    };

    // Send OTP via email
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}. This will expire in 5 minutes.`,
    });

    res.json({
      status: "success",
      data: "OTP sent successfully",
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ status: "failed", error: "Internal server error" });
  }
};

const resetPassword = async (req, res) => {
  const { otp, password } = req.body;

  try {
    const resetOTP = req.session.resetOTP;

    if (!resetOTP || resetOTP.expiresAt < Date.now()) {
      return res.status(400).json({
        status: "failed",
        error: "Invalid or expired OTP",
      });
    }

    if (resetOTP.otp !== otp) {
      return res.status(400).json({
        status: "failed",
        error: "Invalid OTP",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.update(
      {
        password: hashedPassword,
      },
      {
        where: {
          email: resetOTP.email,
        },
      }
    );

    delete req.session.resetOTP;

    res.json({
      status: "success",
      data: "Password reset successfully",
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ status: "failed", error: "Internal server error" });
  }
};

module.exports = {
  getAllUsers,
  userProfile,
  createUser,
  bulkCreateUsers,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  latestUsersByCount,
  userDetail,
  forgotPassword,
  resetPassword,
};
