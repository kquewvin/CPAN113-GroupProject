// document.getElementById("add-course-btn").addEventListener("click", loadData);
// document.getElementById("course-form").addEventListener("submit", addData);

// async function loadData() {
// 	const response = await fetch("./backend/data.json");
// 	const data = await response.json();
// 	const display = document.getElementById("data-display");
// 	display.innerHTML = "";
// 	data.forEach((item) => {
// 		display.innerHTML += `<p>Name: ${item.name}, Email: ${item.email}</p>`;
// 	});
// }

// async function addData(event) {
// 	event.preventDefault();
// 	const name = document.getElementById("name").value;
// 	const email = document.getElementById("email").value;
// 	const newData = { name, email };

// 	const response = await fetch("/update-data", {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(newData),
// 	});

// 	if (response.ok) {
// 		console.log("Data successfully updated!");
// 		loadData(); // Refresh the displayed data
// 	} else {
// 		console.error("Error updating data");
// 	}
// }

const $ = (selector = document.querySelector(selector));

$("course-form").addEventListener("submit", async (evt) => {
	evt.preventDefault(); // prevent page to reload on form submission

	// Get values from the form
	const courseCode = $("course-code").value;
	const courseName = $("course-name").value;
	const courseStart = $("course-start").value;
	const courseEnd = $("course-end").value;

	// Create JSON object
	const courseData = {
		code: courseCode,
		name: courseName,
		start: courseStart,
		end: courseEnd,
	};

	try {
		// Send data to backend
		const response = await fetch("/save-course", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(courseData),
		});

		if (response.ok) {
			alert("Course saved");
		} else {
			alert("Failed to save course");
		}
	} catch (error) {
		console.log("Error: ", error);
		alert("An error occured saving the course");
	}
});
