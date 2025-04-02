import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../models/db.js";  // Assuming db.js has the MySQL connection
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const router = express.Router();

// Registration Route
router.post("/register", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const query = "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)";
        
        db.query(query, [firstName, lastName, email, hashedPassword], (err, result) => {
            if (err) return res.status(500).json({ error: "Database error", details: err });
            res.status(201).json({ message: "User registered successfully" });
        });
    } catch (err) {
        res.status(500).json({ error: "Server error", details: err });
    }
});

// Login Route
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], async (err, results) => {
        if (err) return res.status(500).json({ error: "Database error", details: err });
        if (results.length === 0) return res.status(401).json({ error: "Invalid email or password" });

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Invalid email or password" });

        // Sign JWT token with user ID
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ message: "Login successful", token });
    });
});

export default router;  // Default export
