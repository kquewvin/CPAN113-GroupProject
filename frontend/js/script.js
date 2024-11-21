const $ = (selector) => document.querySelector(selector);

document
	.getElementById("course-form")
	.addEventListener("submit", async (evt) => {
		evt.preventDefault(); // prevent page to reload on form submission

		// Get values from the form
		const courseCode = document.getElementById("course-code").value;
		const courseName = document.getElementById("course-name").value;
		const courseStart = document.getElementById("course-start").value;
		const courseEnd = document.getElementById("course-end").value;

		// Create JSON object
		const courseData = {
			code: courseCode,
			name: courseName,
			start: courseStart,
			end: courseEnd,
		};

		try {
			// Send data to backend
			const response = await fetch("/update-courses", {
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
			alert("Error: ", error);
		}
	});

async function loadCourses() {
	try {
		const response = await fetch("/courses");

		if (response.ok) {
			const courses = await response.json();
			const displayCourses = $("data-display");
			displayCourses.textContent = JSON.stringify(courses);
		} else {
			alert("failed to load courses");
		}
	} catch (error) {
		alert("Error: ", error);
	}
}

document.addEventListener("DOMContentLoaded", loadCourses);
