const express = require("express");
const router = express.Router();
const Catway = require("../models/catway_model");
const services = require("../services/catways_services");

router.get("/view", async (req, res) => {
  try {
    const result = await services.getAllCatways();
    if (result.error) {
      console.error("Error in getAllCatways:", result.error);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.render("catways_view", { catways: result.data });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/catwayNumbers", async (req, res) => {
  try {
    const result = await services.getCatwayNumbers();
    if (result.error) {
      console.error("Error fetching catway numbers:", result.error);
      return res.status(500).json({ error: "Error fetching catway numbers" });
    }
    res.json(result.data);
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/view/:id", async (req, res) => {
  const catwayId = req.params.id;

  try {
    const result = await services.getCatwayById(catwayId);
    if (result.error) {
      if (result.error === "Catway not found") {
        return res.status(404).json({ error: "Catway not found" });
      }
      console.error("Error in getCatwayDetails:", result.error);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.render("catway_detail_view", { catway: result.data });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/detail/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await services.getCatwayById(id);
    if (result.error) {
      if (result.error === "Catway not found") {
        return res.status(404).json({ error: "Catway not found" });
      }
      console.error(`Error fetching catway ${id}:`, result.error);
      return res.status(500).json({ error: "Error fetching catway details" });
    }
    res.json(result.data);
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const { catwayState } = req.body;

  try {
    const result = await services.patchCatwayById(id, catwayState);
    if (result.error) {
      if (result.error === "Catway not found") {
        return res.status(404).json({ error: "Catway not found" });
      }
      console.error("Error updating Catway:", result.error);
      return res.status(500).json({ error: "Error updating Catway" });
    }
    res
      .status(200)
      .json({ message: "Catway updated successfully", catway: result.data });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await services.getAllCatways();
    if (result.error) {
      console.error("Error in getAllCatways:", result.error);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json(result.data);
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await services.getCatwayById(id);
    if (result.error) {
      if (result.error === "Catway not found") {
        return res.status(404).json({ error: "Catway not found" });
      }
      console.error("Error fetching catway:", result.error);
      return res.status(500).json({ error: "Error fetching catway details" });
    }
    res.json(result.data);
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  const { catwayNumber, catwayState, type } = req.body;
  try {
    const result = await services.addCatway({
      catwayNumber,
      catwayState,
      type,
    });
    if (result.error) {
      console.error("Error creating catway:", result.error);
      return res.status(500).json({ error: "Error creating catway" });
    }
    res.status(201).json(result.data);
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { catwayNumber, catwayState, type } = req.body;

  try {
    const result = await services.updateCatwayById(id, {
      catwayNumber,
      catwayState,
      type,
    });
    if (result.error) {
      if (result.error === "Catway not found") {
        return res.status(404).json({ error: "Catway not found" });
      }
      console.error("Error updating catway:", result.error);
      return res.status(500).json({ error: "Error updating catway" });
    }
    res.status(200).json(result.data);
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await services.deleteCatwayById(id);
    if (result.error) {
      if (result.error === "Catway not found") {
        return res.status(404).json({ error: "Catway not found" });
      }
      console.error("Error deleting catway:", result.error);
      return res.status(500).json({ error: "Error deleting catway" });
    }
    res.status(200).json({ message: "Catway deleted successfully" });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
