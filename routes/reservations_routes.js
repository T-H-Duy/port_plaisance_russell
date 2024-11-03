const express = require("express");
const router = express.Router();
const reservationService = require("../services/reservations_services");
const Reservations = require("../models/reservation_model");
const private = require("../middlewares/private");

router.get("/view", private.checkJWT, async (req, res) => {
  try {
    const reservations = await Reservations.find();
    res.render("reservations_view", { reservations });
  } catch (err) {
    console.error("Error in getAllReservations:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", private.checkJWT, async (req, res) => {
  try {
    const reservations = await Reservations.find();
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", private.checkJWT, async (req, res) => {
  const reservationId = req.params.id;

  try {
    const reservation = await Reservations.findById(reservationId);
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    res.json(reservation);
  } catch (error) {
    console.error("Error fetching reservation details:", error.message);
    res.status(500).json({ error: "Error fetching reservation details" });
  }
});

router.get("/:id/reservations", private.checkJWT, async (req, res) => {
  const catwayId = req.params.id;

  try {
    const reservations = await reservationService.getResByCatwayId(catwayId);
    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get(
  "/:id/reservations/:idReservation",
  private.checkJWT,
  async (req, res) => {
    const catwayId = req.params.id;
    const reservationId = req.params.idReservation;

    try {
      const reservation = await reservationService.getResByCatwayAndId(
        catwayId,
        reservationId
      );

      if (reservation) {
        res.status(200).json(reservation);
      } else {
        res
          .status(404)
          .json({ error: "Reservation not found for this catway" });
      }
    } catch (error) {
      console.error("Error fetching reservation:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.post("/:id/reservations", private.checkJWT, async (req, res) => {
  const catwayId = req.params.id;
  const { clientName, checking, checkout, boatName } = req.body;

  try {
    const newReservation = await reservationService.createReservation(
      catwayId,
      clientName,
      checking,
      checkout,
      boatName
    );
    res.status(201).json(newReservation);
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete(
  "/:id/reservations/:idReservation",
  private.checkJWT,
  async (req, res) => {
    const catwayId = req.params.id;
    const reservationId = req.params.idReservation;

    try {
      const result = await reservationService.deleteResByCatwayAndId(
        catwayId,
        reservationId
      );

      if (result.deletedCount === 1) {
        res.status(200).json({ message: "Reservation deleted successfully" });
      } else {
        res
          .status(404)
          .json({ error: "Reservation not found for this catway" });
      }
    } catch (error) {
      console.error("Error deleting reservation:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.get("/view/:id", async (req, res) => {
  const reservationId = req.params.id;

  try {
    const reservation = await Reservations.findById(reservationId);

    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    res.render("reservation_detail_view", { reservation });
  } catch (err) {
    console.error("Error in getReservationDetails:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
