const express = require("express");
const router = express.Router();
const upload=require("../config/multer-config")
const productModel=require("../models/product-model")
router.post("/create", upload.single("image"),async function (req, res) {
    try{let {name,price,discount,bgcolor,panelcolor,textColor}=req.body;
    let product =await productModel.create({
        image:req.file.buffer,
        name,
        price,
        discount,
        bgcolor,
        panelcolor,
        textColor,
    });
      }
      catch(err)
      {
        res.send(err.message);
      }
    
});

module.exports = router;
