const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Catway model for MongoDB using Mongoose.
 * 
 * @module CatwayModel
 * 
 */
/**
 * This schema includes the catway number, type (long or short), state of the catway, 
 * and the name of the boat associated with the catway.
 * 
 * @typedef {Object} Catway
 * @property {number} catwayNumber - Identifier for the catway.
 * @property {string} type - Type of the catway, either 'long' or 'short'.
 * @property {string} catwayState - Current state of the catway.
 * @property {string} boatName - Name of the boat assigned to this catway.
 * 
 */
const Catway = new Schema(
  {
    catwayNumber: {
      type: Number,
      required: [true, "catwayNumber is required"],
      unique: true,
    },
    catwayState: {
      type: String,
      required: [true, "catwayState is required"],
      trim: true,
    },
    type: {
      type: Boolean,
      required: [true, "type is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Catway", Catway);
