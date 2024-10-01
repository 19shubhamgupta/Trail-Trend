const express = require("express");
const upload = require("../config/multer-config");
const productModel = require("../models/productModel");
const ownerModel = require("../models/ownerModel");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("running");
});

router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const { name, price, discount, bgcolor, panelcolor, textcolor } =
      req.body;
    let product = await productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
    });
    const owner = await ownerModel.findOne({email :"s@s.com"})
    console.log('owner products id',owner)
    owner.products.push(product._id);
    await owner.save();
    req.flash("sucess", `${name} created sucessfully`);
    res.redirect("/owners/admin/create");
  } catch (error) {
    res.send(`error in product ${ error}`);
  }
});
module.exports = router;
