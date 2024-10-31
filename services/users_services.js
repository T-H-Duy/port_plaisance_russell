const User = require("../models/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;


exports.getAllUsers = async () => {
  try {
    return await User.find({}, "-password");
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    throw new Error("Error retrieving users");
  }
};

exports.getUserById = async (id) => {
  try {
    return await User.findById(id);
  } catch (error) {
    console.error("Error in getUserById:", error);
    throw new Error("Error retrieving user");
  }
};

exports.addUser = async (userData) => {
  try {
    return await User.create(userData);
  } catch (error) {
    console.error("Error in addUser:", error);
    throw new Error("Error creating user");
  }
};

exports.updateUserById = async (id, userData) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    Object.keys(userData).forEach((key) => {
      if (userData[key]) {
        user[key] = userData[key];
      }
    });

    await user.save();
    return user;
  } catch (error) {
    console.error("Error in updateUserById:", error);
    throw error;
  }
};

exports.deleteUserById = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    await User.deleteOne({ _id: id });
    return { message: "User deleted successfully" };
  } catch (error) {
    console.error("Error in deleteUserById:", error);
    throw error;
  }
};

exports.authenticateUser = async (email, password) => {
  try {
    const user = await User.findOne({ email }).select(
      "-__v -createdAt -updatedAt"
    );
    if (!user) {
      throw new Error("User not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Wrong credentials");
    }

    const { password: userPassword, ...userWithoutPassword } = user.toObject();
    const expiresIn = 24 * 60 * 60;
    const token = jwt.sign({ user: userWithoutPassword }, SECRET_KEY, {
      expiresIn,
    });

    return { token };
  } catch (error) {
    console.error("Authentication error:", error);
    throw error;
  }
};
