const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware to serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Middleware to parse JSON data
app.use(express.json());

// Endpoint to get JSON data
app.get("/backend/courses", (req, res) => {
	fs.readFile("./courses.json", "utf8", (err, data) => {
		if (err) {
			res.status(500).send("Error reading data file");
			return;
		}
		res.json(JSON.parse(data));
	});
});

// Endpoint to save a new course
app.post("/courses", (req, res) => {
	const courseData = req.body;

	// Read the existing data
	fs.readFile("/courses.json", "utf8", (err, data) => {
		if (err && err.code !== "ENOENT") {
			res.status(500).send("Error reading data file");
			return;
		}

		// Parse existing data or initialize as empty array
		const courses = data ? JSON.parse(data) : [];
		courses.push(courseData);

		// Write the updated courses back to the file
		fs.writeFile("/courses.json", JSON.stringify(courses, null, 2), (err) => {
			if (err) {
				res.status(500).send("Error writing to data file");
				return;
			}
			res.status(200).send("Course saved successfully!");
		});
	});
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});


// vinny git test