const express = require("express");
const userModel = require("../models/userModel");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const productModel = require("../models/productModel");
const ownerModel = require("../models/ownerModel");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.get("/", (req, res) => {
  res.send("running");
});

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const checkUser = await userModel.findOne({ email });
  if (checkUser) {
    res.flash("error", "You already have a Account Please login");
    res.redirect("/");
  }

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      const user = await userModel.create({
        name,
        email,
        password: hash,
      });
      const token = jwt.sign({ email: email, userId: user._id }, "secret");
      res.cookie("token", token);
      res.redirect("/shop");
    });
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const checkOwner = await ownerModel.findOne({ email });
  if (checkOwner) {
    console.log("got owner");
    if (!req.cookies.token) {
      const token = jwt.sign(
        { email: email, userId: checkOwner._id }, // Fixed typo: it should be checkOwner._id
        "secret"
      );
      res.cookie("token", token);
      return res.redirect("/owners/admin"); // Return after redirect to stop further execution
    } else {
      return res.redirect("/owners/admin"); // Handle case where token already exists
    }
  } else {
    const checkUser = await userModel.findOne({ email });
    if (!checkUser) {
      req.flash("error", "You already don't have a Account Please signUp");
      return res.redirect("/");
    }

    if (checkUser) {
      bcrypt.compare(password, checkUser.password, function (err, result) {
        try {
          if (result) {
            if (!req.cookies.token) {
              const token = jwt.sign(
                { email: email, userId: checkUser._id },
                "secret"
              );
              res.cookie("token", token);
              res.redirect("/shop");
            }
          }
        } catch (err) {
          res.send(err.message);
        }
      });
    }
  }
});

router.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
});

router.get("/addToCart/:id", isLoggedIn, async (req, res) => {
  const user = await userModel.findOne({ email: req.user.email });
  user.cart.push(req.params.id);
  await user.save();
  res.redirect("/shop");
});

router.get("/cart", isLoggedIn, async (req, res) => {
  const user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart");
  res.render("cart", { user });
});

module.exports = router;
