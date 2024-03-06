import React from "react";
import { GameState } from "../types";

export const GameStateContext = React.createContext<{
  state: GameState;
  setState: React.Dispatch<React.SetStateAction<GameState>>;
}>({
  state: {
    found: [],
    grid: [],
    state: "waiting",
  },
  setState: () => null,
});
