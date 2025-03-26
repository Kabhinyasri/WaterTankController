import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";
import CustomButton from "./components/Button";

const ControlScreen: React.FC = () => {
const [pumpStatus, setPumpStatus] = useState<string>("OFF");

const togglePump = async (state: string) => {
try {
await axios.post("http://192.168.230.141:5000/control", { pumpState: state });
setPumpStatus(state);
} catch (error) {
console.error("Error updating pump status:", error);
}
};

return (
<View style={styles.container}>
<Text style={styles.statusText}>Pump Status: {pumpStatus}</Text>
<CustomButton title="Turn Pump ON" onPress={() => togglePump("ON")} />
<CustomButton title="Turn Pump OFF" onPress={() => togglePump("OFF")} />
</View>
);
};

const styles = StyleSheet.create({
container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#f5f5f5" },
statusText: { fontSize: 20, fontWeight: "bold", marginBottom: 20, color: "#050A44" },
});

export default ControlScreen;