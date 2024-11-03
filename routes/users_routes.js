const express = require("express");
const router = express.Router();
const userService = require("../services/users_services");

router.get("/", async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await userService.getUserById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json("user_not_found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/add", async (req, res) => {
  const userData = {
    name: req.body.name,
    firstname: req.body.firstname,
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const user = await userService.addUser(userData);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const userData = {
    name: req.body.name,
    firstname: req.body.firstname,
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const user = await userService.updateUserById(id, userData);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await userService.deleteUserById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/authenticate", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await userService.authenticateUser(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
