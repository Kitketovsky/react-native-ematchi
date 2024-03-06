import React from "react";
import { View } from "react-native";
import { Found } from "./Found";
import { Grid } from "./Grid";
import { useContext } from "react";
import { GameStateContext } from "../context/gameContext";

export function Game() {
  const { state } = useContext(GameStateContext);

  return (
    <View style={{ gap: 18, width: "100%" }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid />
      </View>

      <View
        style={{
          height: 60,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Found found={state.found} />
      </View>
    </View>
  );
}
