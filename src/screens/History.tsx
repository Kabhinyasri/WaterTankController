import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const HistoryScreen: React.FC = () => {
  const [history, setHistory] = useState([
    { id: "1", date: "March 20, 2025", usage: "50L" },
    { id: "2", date: "March 19, 2025", usage: "42L" },
    { id: "3", date: "March 18, 2025", usage: "60L" },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Water Usage History</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text style={styles.historyText}>{item.date} - {item.usage}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  historyItem: { padding: 15, backgroundColor: "#fff", borderRadius: 10, marginVertical: 5 },
  historyText: { fontSize: 16, color: "#333" },
});

export default HistoryScreen;
