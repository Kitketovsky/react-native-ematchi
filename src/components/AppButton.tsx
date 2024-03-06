import { scale } from "react-native-size-matters";
import { Pressable, StyleSheet, Text } from "react-native";
import type { GestureResponderEvent } from "react-native";

interface Props {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
}

export function AppButton({ label, onPress }: Props) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={[styles.buttonText, styles.font]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "purple",
    borderWidth: 0,
    paddingHorizontal: scale(16),
    paddingVertical: scale(8),
    borderRadius: scale(10),
  },
  buttonText: {
    fontSize: scale(20),
    color: "#fff",
  },
  font: {
    fontFamily: "Grandstander",
  },
});
