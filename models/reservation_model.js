const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Reservation model for MongoDB using Mongoose.
 * 
 * @module ReservationModel
 * 
 */

/**
 * Reservation schema representing a reservation for a catway in the marina.
 * 
 * This schema includes information such as the catway number, client name, 
 * boat name, and reservation dates.
 * 
 * @typedef {Object} Reservation
 * @property {string} catwayId - ID of the catway.
 * @property {string} clientName - Name of the client.
 * @property {string} boatName - Name of the boat.
 * @property {Date} checking - Checking date for the reservation.
 * @property {Date} checkOut - Check-out date for the reservation.
 * 
 */
const ReservationSchema = new Schema(
  {
    catwayId: {
      type: Schema.Types.ObjectId,
      ref: "Catway",
      required: true,
    },
    clientName: {
      type: String,
      required: true,
      trim: true,
    },
    checking: {
      type: Date,
      required: true,
    },
    checkout: {
      type: Date,
      required: true,
    },
    boatName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Reservation", ReservationSchema);
