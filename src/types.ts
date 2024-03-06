type State = "waiting" | "won" | "lost" | "paused" | "playing";

export interface GameState {
  grid: string[];
  found: string[];
  state: State;
}
