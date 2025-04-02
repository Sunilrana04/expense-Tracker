import express from "express";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Serve frontend files
app.use(express.static(path.join(path.resolve(), "public")));

// API routes
app.use("/api/auth", authRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));