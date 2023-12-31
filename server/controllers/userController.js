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
  generateRandomToken,
} = require("../helpers/helper");

let getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json({ status: "success", data: users });
  } catch (error) {
    res.json({ status: "failed", error: "Error retrieving users" });
  }
};

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
      res.json({ status: "warning", data: "User not found" });
    }
  } catch (error) {
    res.json({ status: "failed", data: "Error retrieving user" });
  }
};

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
        role: userCount == 0 ? "Admin" : "Voter",
        photo: !req.files ? null : `users/${fileName}`,
      },
    });
    res.json({ status: "success", data: user });
    console.log("User created successfully");
  } catch (error) {
    if (fileName) {
      await unlink(`./uploads/users/${fileName}`);
    }

    console.error(error);
    res.json({ status: "failed", error: "Error creating user" });
  }
};

const bulkCreateUsers = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }

    const excelFile = req.files.file;
    const uploadPath = "./uploads/excels"; // Set your desired upload path

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
          role: userCount == 0 ? "Admin" : "Voter",
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

    res.send("Users uploaded successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

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
    unlink(resolve("uploads", "users", fileName), (err) =>
      console.log(err?.message || `Deleted ${fileName}`)
    );
    res.json({ staus: "failed", error: "Error updating user" });
  }
};

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
    res.status(500).json({ status: "failed", error: "Error deleting user" });
  }
};

let loginUser = async (req, res) => {
  const { email, password, remember_me } = req.body;

  try {
    const userInfo = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (userInfo) {
      let hashedPassword = userInfo.password;
      let passwordMatch = bcrypt.compareSync(password, hashedPassword);
      if (passwordMatch) {
        // req.session.user = {
        //   id: userInfo.id,
        //   email: userInfo.email,
        //   role: userInfo.role,
        // };

        const token = jwt.sign(
          { userId: userInfo.id },
          process.env.JWT_SECRET,
          {
            expiresIn: remember_me ? "7d" : "1d",
          }
        );
        if (remember_me) {
          const rememberToken = generateRandomToken(); // Generate a random token
          var updatedUser = await prisma.user.update({
            where: { id: userInfo.id },
            data: { remember_me: rememberToken },
          });
          console.log("remember me token saved");
        }

        res.cookie("token", token, { httpOnly: true });

        console.log("Password match!");
        res.json({ status: "success", data: updatedUser });
      } else {
        console.log("Passwords do not match!");
        res.json({ status: "error", data: "Passwords do not match!" });
      }
    } else {
      res.json({ status: "error", data: "User not found!" });
    }
  } catch (error) {
    res.status(500).json({ status: "failed", error: "Error finding user" });
  }
};

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
};
