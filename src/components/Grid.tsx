import { FlatList, StyleSheet, View } from "react-native";
import { Square } from "./Square";
import { useContext, useRef, useState } from "react";
import { GameStateContext } from "../context/gameContext";

export function Grid() {
  const timeoutId = useRef<NodeJS.Timeout>();
  const { state, setState } = useContext(GameStateContext);
  const [selected, setSelected] = useState({ a: -1, b: -1 });

  function onSquarePress({ item, index }: { item: string; index: number }) {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    // if none has been selected
    if (selected.a === -1 && selected.b === -1) {
      setSelected((prev) => ({ ...prev, a: index }));

      // if one emoji has been selected
    } else if (selected.b === -1) {
      if (state.grid[selected.a] === state.grid[index]) {
        setState((prev) => ({
          ...prev,
          found: [...prev.found, item],
        }));
      }

      setSelected((prev) => ({ ...prev, b: index }));

      timeoutId.current = setTimeout(() => {
        setSelected({ a: -1, b: -1 });
      }, 1000);

      // if both emojis has been selected
    } else {
      setSelected({ a: index, b: -1 });
    }
  }

  return (
    <FlatList
      style={styles.list}
      data={state.grid}
      contentContainerStyle={styles.listGap}
      columnWrapperStyle={styles.listGap}
      keyExtractor={(item, index) => `${item}-${index}`}
      renderItem={({ index, item }) => (
        <View style={styles.squareContainer}>
          <Square
            emoji={item}
            found={state.found.includes(item)}
            selected={selected.a === index || selected.b === index}
            onPress={() => onSquarePress({ item, index })}
          />
        </View>
      )}
      numColumns={Math.sqrt(state.grid.length)}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flexGrow: 0,
    width: "100%",
    aspectRatio: 1 / 1,
  },
  listGap: {
    gap: 6,
  },
  squareContainer: {
    flex: 1,
    aspectRatio: 1 / 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
