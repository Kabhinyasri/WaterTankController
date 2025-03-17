import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  title: string;
  value: string;
}

const SensorCard: React.FC<Props> = ({ title, value }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardValue}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: "#fff", padding: 20, borderRadius: 10, marginVertical: 5 },
  cardTitle: { fontSize: 16, fontWeight: "bold", color: "#050A44" },
  cardValue: { fontSize: 18, fontWeight: "bold", color: "#0A21C0" },
});

export default SensorCard;
