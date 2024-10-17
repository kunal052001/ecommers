const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const productModel = require("../models/product-model");

router.get("/", function (req, res) {
    let error = req.flash("error");
    res.render("index", { error });
});

router.get("/shop", isLoggedIn, async function (req, res) {
    let product = await productModel.find()
    res.render("shop",{product}); 
});
router.get("/logout", isLoggedIn, function (req, res) {
    res.render("shop");
});
module.exports = router;
