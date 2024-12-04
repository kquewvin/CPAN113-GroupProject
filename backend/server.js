const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

// Parse JSON
app.use(bodyParser.json());

// Path to JSON file
const scheduleFile = "schedule.json";

// Serve the frontend files
app.use(express.static("public"));

// Endpoint to get JSON data (GET)
app.get("/schedule", (req, res) => {
	fs.readFile(scheduleFile, (err, data) => {
		if (err) {
			return res.status(500).send("Error reading schedule file");
		}
		res.json(JSON.parse(data));
	});
});

// Endpoint to save schedule to JSON (POST)
app.post("/schedule", (req, res) => {
	const schedule = req.body;

	// Read the existing data
	fs.writeFileFile(scheduleFile, JSON.stringify(schedule, null, 2), (err) => {
		if (err) {
			return res.status(500).send("Error saving schedule file");
		}
		res.send("Schedule saved successfully");
	});
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
