const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => {
    const token = req.cookies.jwt;
    console.log("Token from cookie:", token);
    if (!token) {
        console.log("Token missing");
        res.status(401);
        throw new Error("Not authorized, no token");
    }

    try {
        const decode = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decode.id).select("-password");
        console.log("Requesting user:", req.user);
        next();
    } catch (err) {
        console.log("JWT verification failed:", err.message);
        res.status(401);
        throw new Error("Not authorized, token invalid");
    }

})

module.exports = protect; 