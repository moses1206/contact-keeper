const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

// @route   POST    api/users
// @desc    Register a user
// @access  public
router.post(
  "/",
  body("username", "이름을 입력하세요!!").not().isEmpty(),
  body("userid", "아이디를 입력하세요!!").not().isEmpty(),
  body("password", "패스워드를 6글자 이상 입력하세요!!").isLength({ min: 6 }),
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, userid, password } = req.body;

    try {
      let user = await User.findOne({ userid });

      if (user) {
        return res
          .status(400)
          .json({ msg: "아이디가 존재합니다. 다른 아이디를 입력해주세요!!" });
      }

      user = new User({
        username,
        userid,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

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
      res.status(500).send("Auth 서버 에러!!");
    }
  }
);

module.exports = router;
