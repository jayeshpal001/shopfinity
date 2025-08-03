const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        res.status(401)
        throw new Error("Not authorized, no token");
    }
    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decode.id).select("-password");
    console.log(`Requesting user: ${req.user.name}`);
    next();
})

module.exports = protect; 