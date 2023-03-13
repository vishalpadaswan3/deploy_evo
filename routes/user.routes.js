const express = require('express');
const { userModel } = require('../model/user.model');
const bcrypt = require('bcrypt');
const {blackModel} = require('../model/black.model');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const router = express.Router();

router.get("/k", (req, res) => {
    res.send("Hello World");
}
);


router.post("/signup", async (req, res) => {
    try {
        const s = await userModel.find({ email: req.body.email });
        if (s.length > 0) {
            res.send('User already exists');
        }
        let { email, password, role } = req.body;
        password = bcrypt.hashSync(password, 10);

        const user = new userModel({ email, password, role });
        await user.save();
        res.send('User created');
    } catch (error) {
        res.send({ msg: "error", error: error.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        let { email, password } = req.body;
        const s = await userModel.find({ email })
        if (s.length === 0) {
            res.send('User does not exist');
        }

        const d = bcrypt.compareSync(password, s[0].password)
        if (d) {
            const token = jwt.sign({ "user": s }, process.env.secret_1, { expiresIn: 60 });
            const refresh_token = jwt.sign({ "user": s }, process.env.secret_2, { expiresIn: 300 });
            res.send({ msg: "Login successful", token, refresh_token });
        } else {
            res.send('Invalid credentials');
        }
    } catch (error) {
        res.send(error.message);
    }
})

router.get("/logout", async (req, res) => {
    try {
        const token = req.headers.authorization;
        const s = new blackModel({token});
        await s.save();
        res.send("User logged out");
    } catch (error) {
        res.send(error.message);
    }
});

router.get("/refresh", async (req, res) => {
    try {
        const refresh_token = req.headers.authorization;
        const s = jwt.verify(refresh_token, process.env.secret_2);
        const token = jwt.sign({ "user": s.user }, process.env.secret_1, { expiresIn: 60 })
        if(s){
            res.send({msg:"refreshed", token});
        }else{
            res.send("Invalid refresh token");
        }
    }catch(error){
        res.send(error.message);
    }
})


module.exports = {
    router
}