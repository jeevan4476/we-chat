import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


import User from "../model/user.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({ username, email, password });
        await user.save();

        const payload = { id: user._id, email: user.email };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.log(error)
    }
});

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Wrong password" });
        }

        const payload = { id: user._id, email: user.email };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    } catch (e) {
        res.status(500).json({
            message: "Unable to sign in"
        });
    }
});

export default router;
