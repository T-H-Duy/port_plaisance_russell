const Catway = require("../models/catway_model");

/**
 * @module CatwaysServices
 */

/**
 * Fetch all catways from the database.
 * @async
 * @function getAllCatways
 * @returns {Promise<{data: Array<Object>} | {error: string}>} A promise that resolves to an array of all catways.
 */
exports.getAllCatways = async () => {
  try {
    const catways = await Catway.find();
    return { data: catways };
  } catch (error) {
    console.error("Error in getAllCatways:", error);
    return { error: "Internal server error" };
  }
};

/**
 * Fetch a specific catway by number.
 * @async
 * @function getCatwayNumbers
 * @returns {Promise<{data: Array<Object>} | {error: string}>} A promise that resolves to the catway object if found or an error message.
 */
exports.getCatwayNumbers = async () => {
  try {
    const catways = await Catway.find({}, "catwayNumber _id");
    return { data: catways };
  } catch (error) {
    console.error("Error fetching catway numbers:", error);
    return { error: "Error fetching catway numbers" };
  }
};

/**
 * Fetch a specific catway by ID.
 * @async
 * @function getCatwayById
 * @param {string} id - The ID of the catway to retrieve.
 * @returns {Promise<{data: Object} | {error: string}>} A promise that resolves to the catway object if found or an error message.
 */
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

/**
 * Add a new catway to the database.
 * @async
 * @function addCatway
 * @param {Object} catwayData - The data for the new catway.
 * @returns {Promise<{data: Object} | {error: string}>} A promise that resolves to the newly created catway object.
 */
exports.addCatway = async (catwayData) => {
  try {
    const newCatway = await Catway.create(catwayData);
    return { data: newCatway };
  } catch (error) {
    console.error("Error in addCatway:", error);
    return { error: "Error creating catway" };
  }
};

/**
 * Update an existing catway by ID.
 * @async
 * @function updateCatwayById
 * @param {string} id - The ID of the catway to update.
 * @param {Object} updateData - The data to update the catway with.
 * @returns {Promise<{data: Object} | {error: string}>} A promise that resolves to the updated catway object or an error message.
 */
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

/**
 * Delete a catway by ID.
 * @async
 * @function deleteCatwayById
 * @param {string} id - The ID of the catway to delete.
 * @returns {Promise<{data: Object} | {error: string}>} A promise that resolves to the deleted catway object or an error message.
 */
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

/**
 * Partially update a catway's state by ID.
 * @async
 * @function patchCatwayById
 * @param {string} id - The ID of the catway to update.
 * @param {string} catwayState - The new state of the catway.
 * @returns {Promise<{data: Object} | {error: string}>} A promise that resolves to an object containing the updated catway data if the update is successful or an error message.
 */
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
