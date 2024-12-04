const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const PORT = 3000;

// Serve the frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

// Parse JSON
app.use(bodyParser.json());

// Path to JSON file
const scheduleFile = path.join(__dirname, "../backend/schedule.json");

// GET Method
app.get("/schedule", (req, res) => {
	fs.readFile(scheduleFile, "utf-8", (err, data) => {
		if (err) {
			return res.status(500).send("Error reading schedule file");
		}
		try {
			const schedule = data ? JSON.parse(data) : [];
			res.json(schedule);
		} catch (parseError) {
			console.error("Error parsing JSON: ", parseError);
			res.status(500).send("Error parsing schedule file")
		}
	});
});

// POST Method
app.post("/schedule", (req, res) => {
	const schedule = req.body;

	// Read the existing data
	fs.writeFile(scheduleFile, JSON.stringify(schedule, null, 2), (err) => {
		if (err) {
      console.error("Error saving schedule file: ", err)
			return res.status(500).send("Error saving schedule file");
		}
		res.send("Schedule saved successfully");
	});
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
