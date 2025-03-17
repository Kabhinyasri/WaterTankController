import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

const SettingsScreen: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [autoPump, setAutoPump] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Notifications</Text>
        <Switch value={notifications} onValueChange={setNotifications} />
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Auto Pump Control</Text>
        <Switch value={autoPump} onValueChange={setAutoPump} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  settingRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 10 },
  settingLabel: { fontSize: 16 },
});

export default SettingsScreen;
