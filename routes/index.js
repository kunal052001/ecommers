const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/", function (req, res) {
    let error = req.flash("error");
    res.render("index", { error });
});

router.get("/shop", isLoggedIn, async function (req, res) {
    let product = await productModel.find()
    let success=req.flash("success");
    res.render("shop",{product,success}); 
});
router.get("/cart",isLoggedIn,async function (req,res) {
    let user=await userModel
    .findOne({email:req.user.email})
    .populate("cart");
      
    const bill=(Number(user.cart[0].price+20)-Number(user.cart[0].discount))
    res.render("cart",{user,bill})
});
router.get("/addtocart/:id",isloggedin, async function(req,res){
    let user=await userModel.findOne({eamil:req.user.eamil});
    user.cart.push(req.params.id);
    req.flash("success","Added to cart");
    req.redirect("/shop")
})
router.get("/logout", isLoggedIn, function (req, res) {
    res.render("shop");
});
module.exports = router;
