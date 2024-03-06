import {
  GestureResponderEvent,
  Pressable,
  View,
  Text,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { scale } from "react-native-size-matters";

interface Props {
  emoji: string;
  selected: boolean;
  found: boolean;
  onPress: (event: GestureResponderEvent) => void;
}

export function Square({ emoji, selected, found, onPress }: Props) {
  const [currentFont, setCurrentFont] = useState(50);

  return (
    <Pressable
      onPress={onPress}
      disabled={selected || found}
      style={styles.squareWrapper}
      onLayout={(event) => {
        setCurrentFont((event.nativeEvent.layout.width / 100) * 60);
      }}
    >
      {selected || found ? (
        <View style={[styles.button]}>
          <Text
            adjustsFontSizeToFit
            style={[styles.emoji, { fontSize: currentFont }]}
          >
            {emoji}
          </Text>
        </View>
      ) : (
        <View style={[styles.background]}></View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  squareWrapper: { flex: 1, width: "100%" },
  background: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ccc",
    borderRadius: scale(10),
  },
  button: {
    borderRadius: scale(10),
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: scale(2),
    borderColor: "purple",
  },
  emoji: {
    fontSize: 9999,
    pointerEvents: "none",
  },
});
