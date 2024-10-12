import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


import User from "../model/user.js";

const router = express.Router();

// SignUp Route
router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        user = new User({ username, email, password });
        await user.save();

        //  JWT token
        const payload = { id: user._id, email: user.email };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        window.localStorage.setItem('token', token);
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// SignIn Route
router.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user 
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Wrong password" });
        }

        //  JWT token
        const payload = { id: user._id, email: user.email };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        window.localStorage.setItem('token', token);
    } catch (e) {
        res.status(500).json({
            message: "Unable to sign in"
        });
    }
});

export default router;
