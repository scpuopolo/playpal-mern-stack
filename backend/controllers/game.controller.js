import Game from "../models/game.model.js";
import mongoose from "mongoose";

export const getGames = async (req, res) => {
  try {
    const games = await Game.find({});
    res.status(200).json({
      success: true,
      data: games,
    });
  } catch (error) {
    console.error("Error Fetching Games:", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error While Fetching Games",
    });
  }
};

export const addGame = async (req, res) => {
  const game = req.body;
  if (
    !game.title ||
    !game.minPlayers ||
    !game.maxPlayers ||
    !game.duration ||
    !game.gameType
  ) {
    return res.status(400).json({
      success: false,
      message: "Please Provide All Fields",
    });
  }

  const newGame = new Game(game);

  try {
    await newGame.save();
    res.status(201).json({
      success: true,
      data: newGame,
    });
  } catch (error) {
    console.error("Error Adding a Game", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error While Adding Game",
    });
  }
};

export const updateGame = async (req, res) => {
  const { id } = req.params;
  const game = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid Game ID",
    });
  }

  try {
    const updatedGame = await Game.findByIdAndUpdate(id, game, { new: true });
    res.status(200).json({
      success: true,
      data: game,
    });
  } catch (error) {
    console.error("Error Updating Game:", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error While Updating Game",
    });
  }
};

export const deleteGame = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid Game ID",
    });
  }

  try {
    await Game.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Game Deleted",
    });
  } catch (error) {
    console.error("Error Deleting Game:", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error While Deleting Game",
    });
  }
};
