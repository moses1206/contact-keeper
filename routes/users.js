const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const User = require("../models/User");

// @route   POST    api/users
// @desc    Register a user
// @access  public
router.post(
  "/",
  [body("name", "name is required").not().isEmpty()],
  (req, res) => {
    res.send(req.body);
  }
);

module.exports = router;
