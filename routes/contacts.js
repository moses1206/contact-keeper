const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { body, validationResult } = require("express-validator");

const User = require("../models/User");
const Contact = require("../models/Contact");

// @route   GET    api/contacts
// @desc    Get all users contacts
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });

    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("서버에러!!");
  }
});

// @route   POST    api/contacts
// @desc    Add new contact
// @access  Private
router.post(
  "/",
  [auth, body("username", "이름을 입력하세요!!.").not().isEmpty()],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        username,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const contacts = await newContact.save();

      res.json(contacts);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Contacts 서버에러!!");
    }
  }
);

// @route   PUT    api/contacts/:id
// @desc    Update contact
// @access  Private
router.put("/:id", auth, async (req, res) => {
  const { username, userid, phone, type } = req.body;

  // Build contact object
  const contactFields = {};
  if (username) contactFields.username = username;
  if (userid) contactFields.userid = userid;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact)
      return res.status(404).json({ msg: "약속을 찾을 수 없습니다.!!" });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "인증정보가 정확하지 않습니다. !!" });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Contacts 서버에러!!");
  }
});

// @route   DELETE    api/contacts/:id
// @desc    Delete contact
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact)
      return res.status(404).json({ msg: "약속을 찾을 수 없습니다.!!" });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "인증정보가 정확하지 않습니다. !!" });
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.json({ msg: "약속이 삭제되었습니다.!!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Contacts 서버에러!!");
  }
});

module.exports = router;
