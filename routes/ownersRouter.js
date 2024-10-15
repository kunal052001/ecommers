const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");

router.post("/create", async function (req, res) {
    try {
        let owner = await ownerModel.find();
        if (owner.length > 0) {
            return res
                .status(500)
                .send("You don't have permission to create a new owner");
        }
        let { fullname, email, password } = req.body;
        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password,
        });
        res.status(201).send(createdOwner);
    } catch (err) {
        res.status(500).send("An error occurred: " + err.message);
    }
});

router.get("/", (req, res) => {
    res.send("This is working");
});

module.exports = router;
