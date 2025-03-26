import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import axios from "axios";
import SensorCard from "./components/Card";

const DashboardScreen: React.FC = () => {
const [waterLevel, setWaterLevel] = useState<number>(50);
const [pumpStatus, setPumpStatus] = useState<string>("OFF");

useEffect(() => {
fetchData();
}, []);

const fetchData = async () => {
try {
const response = await axios.get("http://192.168.230.141:5000/data");
setWaterLevel(response.data.waterLevel);
setPumpStatus(response.data.pumpStatus);
} catch (error) {
console.error("Error fetching data:", error);
}
};

return (
<View style={styles.container}>
<SensorCard title="Water Level" value={`${waterLevel}%`} />
<SensorCard title="Pump Status" value={pumpStatus} />
</View>
);
};

const styles = StyleSheet.create({
container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
});

export default DashboardScreen;



