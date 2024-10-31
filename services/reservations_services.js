const Reservation = require("../models/reservation_model");


exports.getResByCatwayId = async (catwayId) => {
  try {
    const reservations = await Reservation.find({ catwayId });
    return reservations;
  } catch (error) {
    console.error("Error in getResByCatwayId:", error);
    throw new Error("Failed to get reservations by catway ID");
  }
};

exports.getResByCatwayAndId = async (catwayId, reservationId) => {
  try {
    const reservation = await Reservation.findOne({
      _id: reservationId,
      catwayId,
    });
    return reservation;
  } catch (error) {
    console.error("Error in getResByCatwayAndId:", error);
    throw new Error("Failed to get reservation by catway ID and reservation ID");
  }
};

exports.createReservation = async (
  catwayId,
  clientName,
  checking,
  checkout,
  boatName
) => {
  try {
    const newReservation = new Reservation({
      catwayId,
      clientName,
      checking,
      checkout,
      boatName,
    });
    await newReservation.save();
    return newReservation;
  } catch (error) {
    console.error("Error in createReservation:", error);
    throw new Error("Failed to create reservation");
  }
};

exports.deleteResByCatwayAndId = async (catwayId, reservationId) => {
  try {
    const result = await Reservation.deleteOne({
      _id: reservationId,
      catwayId,
    });
    if (result.deletedCount === 0) {
      throw new Error("No reservation found to delete");
    }
    return result;
  } catch (error) {
    console.error("Error in deleteResByCatwayAndId:", error);
    throw new Error("Failed to delete reservation by catway ID and reservation ID");
  }
};
