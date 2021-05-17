const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("config");
const express = require("express");
const auth = require("../middleware/auth");
const { body, validationResult } = require("express-validator");

const router = express.Router();

// @route   GET    api/auth
// @desc    Get logged in user
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("서버 에러!!");
  }
});

// @route   POST    api/auth
// @desc    Auth user & get token
// @access  Public
router.post(
  "/",
  body("userid", "유저 아이디를 입력하세요!!").exists(),
  body("password", "패스워드를 입력하세요!!").exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userid, password } = req.body;

    try {
      let user = await User.findOne({ userid });

      if (!user) {
        return res.status(400).json({ msg: "아이디가 정확하지 않습니다.!!" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "패스워드가 정확하지 않습니다!!" });
      }

      const payload = {
        user: {
          id: user._id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 36000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("서버 에러!!");
    }
  }
);

module.exports = router;
