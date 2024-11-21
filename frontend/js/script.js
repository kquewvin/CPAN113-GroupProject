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
