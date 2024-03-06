import { View, StyleSheet, Text, Platform } from "react-native";
import { scale } from "react-native-size-matters";

export function Found({ found }: { found: string[] }) {
  if (!found.length) {
    return null;
  }

  return (
    <View style={styles.found}>
      {found.map((foundEmoji) => {
        return (
          <Text style={{ fontSize: 40 }} key={foundEmoji}>
            {foundEmoji}
          </Text>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  found: {
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: scale(10),
  },
});
