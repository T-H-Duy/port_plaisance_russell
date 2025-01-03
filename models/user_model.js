const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

/**
 * User model for MongoDB using Mongoose.
 * 
 * This model represents users in the application, and includes validation and hashing for secure password storage.
 * 
 * @module UserModel
 * 
 */

/**
 * This schema includes user details such as name, email, and hashed password. 
 * It also includes validation for these fields and automatically hashes the password before saving the user to the database.
 * 
 * @typedef {Object} User
 * @property {string} name - Full name of the user.
 * @property {string} email - Email address of the user.
 * @property {string} password - Hashed password of the user.
 *
 */

const User = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

User.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = bcrypt.hashSync(this.password, 10);

  next();
});

module.exports = mongoose.model("User", User);
