var express = require('express');
const router = express.Router();

const userController = require('../Controllers/user.controller');

// Routes for user CRUD operations
router.post("/save", userController.save); // Save user
router.get("/fetch", userController.fetch); // Fetch user
router.delete("/delete", userController.deleteUser); // Delete user
router.patch("/update", userController.updateUser); // Update user
router.post("/login", userController.login); // User login

module.exports = router;
