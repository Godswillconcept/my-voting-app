const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

const { unlink } = require("fs/promises");
const { uploadFile, convertDOBtoISO } = require("../helpers/helper");

let getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json({ status: "success", data: users });
  } catch (error) {
    res.json({ status: "failed", error: "Error retrieving users" });
  }
};

let getUserById = async (req, res) => {
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

    const isoDob = convertDOBtoISO(dob);

    const user = await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
        dob: isoDob,
        photo: `users/${fileName}`,
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

let updateUser = async (req, res) => {
  const { id } = req.params;
  const { password, dob, ...userData } = req.body;
  let fileName;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    if (req.files) {
      fileName = await uploadFile(req.files.photo, "./uploads/users");
    }

    const isoDob = convertDOBtoISO(dob);
    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        ...userData,
        password: hashedPassword,
        dob: isoDob,
        photo: `users/${fileName}`,
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

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
