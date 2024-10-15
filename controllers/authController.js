const bcrypt = require("bcrypt");
const userModel = require("../models/user-model");
const { generateToken } = require("../utils/genaratetoken");

module.exports = {
    registerUser: async function (req, res) {
        try {
            let { email, password, fullname } = req.body;

            let user = await userModel.findOne({ email: email });
            if (user) return res.status(401).send("You already have an account");

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            user = await userModel.create({
                email,
                password: hash,
                fullname
            });

            let token = generateToken(user);
            res.cookie("token", token);
            res.send("User created successfully");
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    loginUser: async function (req, res) {
        try {
            let { email, password } = req.body;
            let user = await userModel.findOne({ email: email });
            if (!user) return res.send("Email or password incorrect");

            const result = await bcrypt.compare(password, user.password);
            if (result) {
                let token = generateToken(user);
                res.cookie("token", token);
                res.send("You can login");
            } else {
                return res.send("Email or password incorrect");
            }
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
};
