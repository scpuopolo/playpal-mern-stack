import { create } from "zustand";

export const useGameStore = create((set) => ({
  games: [],
  setGames: (games) => set({ games }),
  addGame: async (newGame) => {
    if (
      !newGame.title ||
      !newGame.minPlayers ||
      !newGame.maxPlayers ||
      !newGame.duration ||
      !newGame.gameType
    ) {
      return {
        success: false,
        message: "Please Provide All Fields",
      };
    }

    const res = await fetch("/api/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGame),
    });

    const data = await res.json();
    set((state) => ({ games: [...state.games, data.data] }));

    return { success: true, message: "Game added successfully" };
  },
  fetchGames: async () => {
    const res = await fetch("/api/games");
    const data = await res.json();
    set({ games: data.data });
  },
  deleteGame: async (id) => {
    const res = await fetch(`/api/games/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    set((state) => ({ games: state.games.filter((game) => game._id !== id) }));
    return { success: true, message: data.message };
  },
  updateGame: async (id, updatedGame) => {
    const res = await fetch(`/api/games/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedGame),
    });

    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };
    set((state) => ({
      games: state.games.map((game) => (game._id === id ? data.data : game)),
    }));

    return { success: true, message: data.message };
  }
}));
