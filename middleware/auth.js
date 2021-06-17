const Users = require('../models/user');
const jwt = require('jsonwebtoken');

const auth = async(req, res, next) => {
    try{
        const token = req.header("Authorization")
        
        if(!token) return res.status(400).json({msg: "Invalid Authentication"})

        const decoded = jwt.verify(token, process.env.Access_Token_Secret)
        if(!decoded) return res.status(400).json({msg: "Invalid Authorization"})

        const user = await Users.findOne({_id: decoded.id})

        req.user = user
        next()
    } catch(err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = auth;