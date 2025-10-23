import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    minPlayers: {
      type: String,
      required: true,
    },
    maxPlayers: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    gameType: {
      // e.g., board game, card game
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Game = mongoose.model("Game", gameSchema);

export default Game;
