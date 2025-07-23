const jwt = require("jsonwebtoken")
const User = require('../models/User')

//Middleware to protect routes
const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ){
        try {
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select("-password")
            if (!req.user) {
            console.error("User not found in DB with ID:", decoded.id);
            return res.status(401).json({ message: "User not found" });
}
            next()
        } catch (error) {
            console.error("Token Verification failed:",error)
            res.status(401).json({ message: "Not authorized, token failed"})
        }
    } else {
        res.status(401).json({ message: "Not authorized, no token provided"})
    }
}

//Middleware to check if user is admin
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next()
    } else {
        res.status(403).json({ message: "Not authorized as an admin" })
    }
}

module.exports = { protect, admin }