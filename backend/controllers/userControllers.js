const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../config/generateToken');
const jwt = require('jsonwebtoken');

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(404);
        throw new Error("Please enter all the required fields")
    }

    const userExists = await User.findOne({ email: email });

    if (userExists) {
        res.status(404);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name, email, password
    });

    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        });
    } else {
        res.status(404);
        throw new Error("Failed to create user");
    }
});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        });
    } else {
        res.status(404);
        throw new Error("Invalid Email or password");
    }
});

// /api/user?search=anirban
const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search
        ? {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
            ],
        }
        : {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
});

const isLoggedIn = asyncHandler((req, res) => {
    try {
        const { token } = req.body;

        if (!token) return res.json(false);

        jwt.verify(token, process.env.JWT_SECRET);
        res.json(true);

    } catch (err) {
        res.json(false);
    }
});

module.exports = { registerUser, authUser, allUsers, isLoggedIn };