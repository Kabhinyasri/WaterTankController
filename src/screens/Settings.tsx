import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

const SettingsScreen: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [autoPump, setAutoPump] = useState(false);
  const [manualPump, setManualPump] = useState(true); // Manual starts as ON

  // Function to handle Automatic Mode toggle
  const toggleAutoPump = (value: boolean) => {
    setAutoPump(value);
    if (value) {
      setManualPump(false); // Turn OFF Manual Mode when Auto is ON
    }
  };

  // Function to handle Manual Mode toggle
  const toggleManualPump = (value: boolean) => {
    setManualPump(value);
    if (value) {
      setAutoPump(false); // Turn OFF Auto Mode when Manual is ON
    }
  };

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Notifications</Text>
        <Switch value={notifications} onValueChange={setNotifications} />
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Automatic Mode</Text>
        <Switch value={autoPump} onValueChange={toggleAutoPump} />
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Manual Mode</Text>
        <Switch value={manualPump} onValueChange={toggleManualPump} />
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