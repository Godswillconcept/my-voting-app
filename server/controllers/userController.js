const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();
const { unlink } = require("fs/promises");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const {
  uploadFile,
  dateToISOString,
  parseExcel,
} = require("../helpers/helper");

// Retrieve all users
let getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json({ status: "success", data: users });
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ status: "failed", error: "Error retrieving users" });
  }
};

let latestUsersByCount = async (req, res) => {
  try {
    let { count = 5 } = req.body;

    const users = await prisma.user.findMany({
      take: Number(count),
      orderBy: {
        created_at: "desc",
      },
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
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (user) {
      res.json({ status: "success", data: user });
    } else {
      res.status(404).json({ status: "warning", data: "User not found" });
    }
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ status: "failed", error: "Error retrieving user" });
  }
};

// Create a new user
const createUser = async (req, res) => {
  const { password, dob, ...userData } = req.body;
  let fileName;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    if (req.files) {
      fileName = await uploadFile(req.files.photo, "./uploads/users");
    }

    const isoDob = dateToISOString(dob);
    const userCount = await prisma.user.count();

    const user = await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
        dob: isoDob,
        role: userCount === 0 ? "Admin" : "Voter",
        photo: !req.files ? null : `users/${fileName}`,
      },
    });

    console.log("User created successfully");
    res.json({ status: "success", data: user });
  } catch (error) {
    if (fileName) {
      await unlink(`./uploads/users/${fileName}`);
    }

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
    const userCount = await prisma.user.count();
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
        const existingUser = await prisma.user.findUnique({
          where: {
            phone: user.phone,
          },
        });

        if (!existingUser) {
          const createdUser = await prisma.user.create({
            data: user,
          });
          createdUsers.push(createdUser);
        }
      } catch (error) {
        console.error(
          `Error creating user with phone number ${user.phone}:`,
          error
        );
      }
    }

    res.json({ status: "success", data: "Users uploaded successfully." });
  } catch (error) {
    console.error("Error during bulk user creation:", error);
    res.status(500).json({ status: "failed", error: "Internal Server Error" });
  }
};

// Update an existing user
let updateUser = async (req, res) => {
  const { id } = req.params;
  const { password, dob, ...userData } = req.body;
  let fileName;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    if (req.files) {
      fileName = await uploadFile(req.files.photo, "./uploads/users");
    }

    const isoDob = dateToISOString(dob);
    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        ...userData,
        password: hashedPassword,
        dob: isoDob,
        photo: !req.files ? null : `users/${fileName}`,
      },
    });

    res.json({ status: "success", data: updatedUser });
    console.log("User updated successfully");
  } catch (error) {
    if (fileName) {
      await unlink(`./uploads/users/${fileName}`);
    }

    console.error("Error updating user:", error);
    res.json({ status: "failed", error: "Error updating user" });
  }
};

// Delete an existing user
let deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json({ status: "success", data: deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ status: "failed", error: "Error deleting user" });
  }
};

// Login user and generate token
let loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userInfo = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userInfo) {
      const hashedPassword = userInfo.password;
      const passwordMatch = bcrypt.compareSync(password, hashedPassword);
      const user = userInfo;

      if (passwordMatch) {
        const token = jwt.sign({ user }, process.env.JWT_SECRET, {
          expiresIn: 300,
        });

        console.log("Password match!");
        res.json({
          status: "success",
          data: user,
          auth: true,
          token: token,
        });
      } else {
        console.log("Passwords do not match!");
        res
          .status(401)
          .json({ status: "error", data: "Invalid password", auth: false });
      }
    } else {
      console.log("User not found!");
      res
        .status(404)
        .json({ status: "error", data: "User not found", auth: false });
    }
  } catch (error) {
    console.error("Error finding user:", error);
    res
      .status(500)
      .json({ status: "failed", error: "Error finding user", auth: false });
  }
};

let isAuthenticated = (req, res) => {
  res.json({ data: "You are logged in" });
};

// Logout user and clear token
const logoutUser = async (req, res) => {
  res
    .clearCookie("token")
    .json({ status: "success", data: "Logged out successfully" });
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
  isAuthenticated,
};
