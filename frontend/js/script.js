let schedule = JSON.parse(localStorage.getItem("schedule")) || [];

// DOM Elements
const addCourseForm = document.getElementById("add-course-form");
const calendar = document.getElementById("calendar");

// Days of the week
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// Function to save schedule to localStorage
function saveSchedule() {
	localStorage.setItem("schedule", JSON.stringify(schedule));
}

// Function to check for overlapping courses
function isOverlapping(newCourse) {
	return schedule.some((course) => {
		return (
			course.day === newCourse.day &&
			((newCourse.startTime >= course.startTime &&
				newCourse.startTime < course.endTime) ||
				(newCourse.endTime > course.startTime &&
					newCourse.endTime <= course.endTime))
		);
	});
}

// Function to update the calendar
function updateCalendar() {
	calendar.innerHTML = "";

	days.forEach((day) => {
		const dayColumn = document.createElement("div");
		dayColumn.classList.add("day-column");
		dayColumn.innerHTML = `<h3>${day}</h3>`;

		schedule
			.filter((course) => course.day === day)
			.forEach((course) => {
				const courseBlock = document.createElement("div");
				courseBlock.classList.add("course-block");
				courseBlock.textContent = `${course.name} (${course.startTime} - ${course.endTime})`;
				dayColumn.appendChild(courseBlock);
			});

		calendar.appendChild(dayColumn);
	});
}

// Event listener for adding a course
addCourseForm.addEventListener("submit", (e) => {
	e.preventDefault();

	const courseName = document.getElementById("course-name").value;
	const courseDay = document.getElementById("course-day").value;
	const startTime = document.getElementById("start-time").value;
	const endTime = document.getElementById("end-time").value;

	const newCourse = { name: courseName, day: courseDay, startTime, endTime };

	if (isOverlapping(newCourse)) {
		alert("This course overlaps with an existing one!");
		return;
	}

	schedule.push(newCourse);
	saveSchedule(); // Save updated schedule to localStorage
	updateCalendar();
	addCourseForm.reset();
});

// Initialize calendar
updateCalendar();
