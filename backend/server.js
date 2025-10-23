import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import gameRoutes from "./routes/game.route.js";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/games", gameRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
});
