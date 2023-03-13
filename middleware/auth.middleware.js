const jwt = require('jsonwebtoken');
const {blackModel} = require('../model/black.model');
require("dotenv").config();

const auth = async (req, res, next) => {
    try {
        
        const token = req.headers.authorization
        const s = await blackModel.find({token});
        if(s.length>0){
            res.send("sorry You are logged out");
        }
        console.log(s)

        const user = jwt.verify(token, process.env.secret_1);
        req.user = user;
        next();
    } catch (error) {
        res.send(error.message);
    }
}

module.exports = { auth };