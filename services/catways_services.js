const Catway = require("../models/catway_model");


exports.getAllCatways = async () => {
  try {
    const catways = await Catway.find();
    return { data: catways };
  } catch (error) {
    console.error("Error in getAllCatways:", error);
    return { error: "Internal server error" };
  }
};

exports.getCatwayNumbers = async () => {
  try {
    const catways = await Catway.find({}, "catwayNumber _id");
    return { data: catways };
  } catch (error) {
    console.error("Error fetching catway numbers:", error);
    return { error: "Error fetching catway numbers" };
  }
};

exports.getCatwayById = async (id) => {
  try {
    const catway = await Catway.findById(id);
    if (!catway) {
      return { error: "Catway not found" };
    }
    return { data: catway };
  } catch (error) {
    console.error(`Error fetching catway ${id}:`, error);
    return { error: "Error fetching catway details" };
  }
};

exports.addCatway = async (catwayData) => {
  try {
    const newCatway = await Catway.create(catwayData);
    return { data: newCatway };
  } catch (error) {
    console.error("Error in addCatway:", error);
    return { error: "Error creating catway" };
  }
};

exports.updateCatwayById = async (id, updateData) => {
  try {
    const catway = await Catway.findById(id);
    if (!catway) {
      return { error: "Catway not found" };
    }

    Object.assign(catway, updateData);
    await catway.save();
    return { data: catway };
  } catch (error) {
    console.error("Error in updateCatwayById:", error);
    return { error: "Error updating catway" };
  }
};

exports.deleteCatwayById = async (id) => {
  try {
    const catway = await Catway.findById(id);
    if (!catway) {
      return { error: "Catway not found" };
    }

    await Catway.deleteOne({ _id: id });
    return { data: { message: "Catway deleted successfully" } };
  } catch (error) {
    console.error("Error in deleteCatwayById:", error);
    return { error: "Error deleting catway" };
  }
};

exports.patchCatwayById = async (id, catwayState) => {
  if (
    !catwayState ||
    typeof catwayState !== "string" ||
    catwayState.trim() === ""
  ) {
    return { error: "Invalid catwayState" };
  }

  try {
    const catway = await Catway.findByIdAndUpdate(
      id,
      { catwayState: catwayState.trim() },
      { new: true }
    );
    if (!catway) {
      return { error: "Catway not found" };
    }
    return { data: catway };
  } catch (error) {
    console.error("Error updating Catway:", error);
    return { error: "Error updating Catway" };
  }
};
