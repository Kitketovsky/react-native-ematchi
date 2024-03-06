import * as React from "react";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import {
  Grandstander_400Regular,
  Grandstander_700Bold,
} from "@expo-google-fonts/grandstander";
import { useEffect, useState } from "react";
import { Level, levels } from "./src/levels";
import { AppButton } from "./src/components/AppButton";
import { Game } from "./src/components/Game";
import { GameState } from "./src/types";
import { shuffle } from "./src/utils";
import { useFonts } from "expo-font";
import { GameStateContext } from "./src/context/gameContext";
import { scale } from "react-native-size-matters";

SplashScreen.preventAutoHideAsync();

function createInitialGrid(level: Level) {
  let pairs: string[] = [];
  let copy = level.emojis.slice();

  for (let i = 0; i < (level.size * level.size) / 2; i++) {
    const randomIndex = Math.floor(Math.random() * copy.length);
    const randomEmoji = copy[randomIndex];

    pairs.push(randomEmoji);

    copy.splice(randomIndex, 1);
  }

  pairs.push(...pairs);

  return shuffle(pairs);
}

export default function App() {
  const [fontsLoaded, fontsError] = useFonts({
    Grandstander: Grandstander_400Regular,
    "Grandstander-Bold": Grandstander_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded && !fontsError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsError]);

  const [gameState, setGameState] = useState<GameState>({
    found: [],
    grid: [],
    state: "waiting",
  });

  useEffect(() => {
    const { found, grid, state } = gameState;

    if (state === "playing" && found.length === grid.length / 2) {
      setGameState({ found: [], grid: [], state: "won" });
    }
  }, [gameState]);

  if (fontsError || !fontsLoaded) {
    return null;
  }

  if (gameState.state === "playing") {
    return (
      <GameStateContext.Provider
        value={{
          state: gameState,
          setState: setGameState,
        }}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={{ ...styles.container }}>
            <Pressable
              style={{
                zIndex: 999,
                backgroundColor: "purple",
                paddingHorizontal: "4%",
                paddingVertical: "2%",
                borderRadius: scale(10),
              }}
              onPress={() =>
                setGameState({ state: "waiting", grid: [], found: [] })
              }
            >
              <Text style={{ color: "white", fontSize: scale(16) }}>Menu</Text>
            </Pressable>

            <Game />
          </View>
        </SafeAreaView>
      </GameStateContext.Provider>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Text style={[styles.heading, styles.font]}>
            e<Text style={styles.accent}>match</Text>i
          </Text>

          <Text style={[styles.subheading, styles.font]}>
            the emoji matching game
          </Text>
        </View>

        <View style={styles.level}>
          <Text style={[styles.span, styles.font]}>choose a level:</Text>

          <View style={styles.buttons}>
            {gameState.state === "paused" ? (
              <React.Fragment>
                <AppButton
                  label={"resume"}
                  onPress={() =>
                    setGameState((prev) => ({ ...prev, state: "playing" }))
                  }
                />
                <AppButton
                  label={"quit"}
                  onPress={() =>
                    setGameState((prev) => ({ ...prev, state: "waiting" }))
                  }
                />
              </React.Fragment>
            ) : (
              levels.map((level) => (
                <AppButton
                  label={level.label}
                  key={level.label}
                  onPress={() =>
                    setGameState({
                      grid: createInitialGrid(level),
                      found: [],
                      state: "playing",
                    })
                  }
                />
              ))
            )}
          </View>
        </View>

        {gameState.state === "won" && (
          <Text
            style={[
              styles.subheading,
              styles.font,
              {
                marginTop: "4%",
                fontFamily: "Grandstander-Bold",
              },
            ]}
          >
            Congratulations! You won!
          </Text>
        )}

        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    position: "relative",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
    gap: scale(40),
  },
  font: {
    fontFamily: "Grandstander",
  },
  heading: {
    fontSize: scale(50),
  },
  subheading: {
    fontSize: scale(18),
    textAlign: "center",
  },
  span: {
    textAlign: "center",
    fontSize: scale(16),
  },
  accent: {
    color: "purple",
  },
  level: {
    display: "flex",
    gap: scale(10),
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: scale(10),
  },
});
