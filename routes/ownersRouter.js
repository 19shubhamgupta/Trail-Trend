const express = require("express");
const router = express.Router();
const ownerModel = require("../models/ownerModel");
const productModel = require("../models/productModel");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.send("running");
});
console.log(process.env.NODE_ENV);

router.get("/create", async (req, res) => {
  if (process.env.NODE_ENV === "development") {
    let alreadyOwner = await ownerModel.find();
    if (alreadyOwner.length > 0) {
      res.send("route unavailable");
    } else {
      let owner = await ownerModel.create({
        name: process.env.OWNER_NAME,
        email: process.env.OWNER_EMAIL,
        password: process.env.OWNER_PASSWORD,
      });
      res.redirect("/owners/admin");
    }
  }
});

router.get("/admin/create", (req, res) => {
  const sucess = req.flash("sucess");
  res.render("createproducts", { sucess });
});

router.get("/admin", async (req, res) => {
  const data = jwt.verify(req.cookies.token, "secret");
  console.log(data);
  const owner = await ownerModel
    .findOne({ email: data.email })
    .populate("products");
  const sucess = req.flash("sucess");
  res.render("admin", { sucess, Allproducts: owner });
});

router.get("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await productModel.findByIdAndDelete(id);
    res.redirect("/owners/admin");
  } catch (error) {
    res.send(error.message);
  }
});
module.exports = router;
