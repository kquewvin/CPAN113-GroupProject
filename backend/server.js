const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware to serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to get JSON data
app.get("/data", (req, res) => {
	fs.readFile("./data.json", "utf8", (err, data) => {
		if (err) {
			res.status(500).send("Error reading data file");
			return;
		}
		res.json(JSON.parse(data));
	});
});

// Endpoint to update JSON data
app.post("/update-data", (req, res) => {
	const newData = req.body;

	// Read the existing data
	fs.readFile("./data.json", "utf8", (err, data) => {
		if (err) {
			res.status(500).send("Error reading data file");
			return;
		}

		// Update the data and write back to the file
		const jsonData = JSON.parse(data);
		jsonData.push(newData);

		fs.writeFile("./data.json", JSON.stringify(jsonData, null, 2), (err) => {
			if (err) {
				res.status(500).send("Error writing to data file");
				return;
			}
			res.status(200).send("Data successfully updated!");
		});
	});
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});


// vinny git test