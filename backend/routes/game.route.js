import express from "express";
import {
  getGames,
  addGame,
  updateGame,
  deleteGame
} from "../controllers/game.controller.js";

const router = express.Router();

router.get("/", getGames);

router.post("/", addGame);

router.put("/:id", updateGame);

router.delete("/:id", deleteGame);

export default router;
