const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const portPath = "COM4"; // Change this to match your Arduino's COM port

// Connect to Arduino Serial Port
const arduinoPort = new SerialPort({
  path: portPath,
  baudRate: 115200,
});

const parser = arduinoPort.pipe(new ReadlineParser({ delimiter: "\n" }));

let waterLevel = null;
let pumpStatus = "OFF";

// Read Data from Arduino
parser.on("data", (data) => {
  console.log("🔹 Received from Arduino:", data);
  
  // ✅ Fix: Process correct format "279,OFF"
  const values = data.trim().split(",");

  if (values.length === 2) {
    const parsedLevel = parseInt(values[0]); // Extract water level
    const parsedStatus = values[1].trim();  // Extract pump status

    if (!isNaN(parsedLevel) && (parsedStatus === "ON" || parsedStatus === "OFF")) {
      waterLevel = parsedLevel;
      pumpStatus = parsedStatus;
      console.log(`✅ Updated API Data: Water Level = ${waterLevel}, Pump Status = ${pumpStatus}`);
    } else {
      console.warn("⚠️ Invalid format received:", data);
    }
  } else {
    console.warn("⚠️ Unknown data received:", data);
  }
});

// API to Send Data to React Native App
app.get("/data", (req, res) => {
  console.log("📡 API Response Sent:", { waterLevel, pumpStatus });
  if (waterLevel !== null) {
    res.json({ waterLevel, pumpStatus });
  } else {
    res.status(500).json({ error: "No valid data received yet." });
  }
});

// API to Receive Pump Control from React Native App
app.post("/control", (req, res) => {
  const { pumpState } = req.body;
  if (pumpState === "ON" || pumpState === "OFF") {
    arduinoPort.write(pumpState + "\n", (err) => {
      if (err) {
        console.error("⚠️ ERROR: Could not send data to Arduino -", err.message);
        return res.status(500).json({ success: false, message: "Failed to send command to Arduino" });
      }
      pumpStatus = pumpState;
      res.json({ success: true, pumpStatus });
    });
  } else {
    res.status(400).json({ success: false, message: "Invalid pump state" });
  }
});

// Start Express Server
app.listen(5000, "0.0.0.0", () => console.log(`✅ Server running on http://0.0.0.0:5000`));
