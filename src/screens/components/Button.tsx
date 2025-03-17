import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface Props {
  title: string;
  onPress: () => void;
}

const CustomButton: React.FC<Props> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: { backgroundColor: "#0A21C0", padding: 15, borderRadius: 8, alignItems: "center", marginVertical: 10 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default CustomButton;
