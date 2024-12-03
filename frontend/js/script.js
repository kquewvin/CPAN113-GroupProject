// Initialize schedule array from localStorage or as an empty array
let schedule = JSON.parse(localStorage.getItem("schedule")) || [];

// DOM Elements
const addCourseForm = document.getElementById("add-course-form");
const calendar = document.getElementById("calendar");
const deleteModal = document.getElementById("delete-modal");
const editModal = document.getElementById("edit-modal");
const confirmDeleteButton = document.getElementById("confirm-delete");
const cancelDeleteButton = document.getElementById("cancel-delete");
const saveEditButton = document.getElementById("save-edit");
const cancelEditButton = document.getElementById("cancel-edit");

// Days of the week
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// Variables to hold the course being edited or deleted
let courseToDelete = null;
let courseToEdit = null;

// Save schedule to localStorage
function saveSchedule() {
	localStorage.setItem("schedule", JSON.stringify(schedule));
}

// Check for overlapping courses
function isOverlapping(newCourse, ignoreCourse = null) {
	return schedule.some((course) => {
		if (course === ignoreCourse) return false; // Ignore the course being edited
		return (
			course.day === newCourse.day &&
			((newCourse.startTime >= course.startTime &&
				newCourse.startTime < course.endTime) ||
				(newCourse.endTime > course.startTime &&
					newCourse.endTime <= course.endTime))
		);
	});
}

// Update the calendar
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
				courseBlock.innerHTML = `
                        <span>${course.name}<br>(${course.startTime} - ${course.endTime})</span>
                        <div>
                        <button class="edit-btn">Edit</button>
                        <button class="delete-btn">X</button></div>
                    `;

				// Delete functionality
				const deleteButton = courseBlock.querySelector(".delete-btn");
				deleteButton.addEventListener("click", () => {
					courseToDelete = course;
					deleteModal.style.display = "block";
				});

				// Edit functionality
				const editButton = courseBlock.querySelector(".edit-btn");
				editButton.addEventListener("click", () => {
					courseToEdit = course;
					document.getElementById("edit-start-time").value = course.startTime;
					document.getElementById("edit-end-time").value = course.endTime;
					editModal.style.display = "block";
				});

				dayColumn.appendChild(courseBlock);
			});

		calendar.appendChild(dayColumn);
	});
}

// Add a course
addCourseForm.addEventListener("submit", (e) => {
	e.preventDefault();

	const courseName = document.getElementById("course-name").value.trim();
	const courseDay = document.getElementById("course-day").value;
	const startTime = document.getElementById("start-time").value;
	const endTime = document.getElementById("end-time").value;

	if (!courseName) {
		alert("Course name cannot be empty!");
		return;
	}

	const newCourse = { name: courseName, day: courseDay, startTime, endTime };

	if (isOverlapping(newCourse)) {
		alert("This course overlaps with an existing one!");
		return;
	}

	schedule.push(newCourse);
	saveSchedule();
	updateCalendar();
	addCourseForm.reset();
	document.getElementById("course-name").focus();
});

// Confirm deletion
confirmDeleteButton.addEventListener("click", () => {
	schedule = schedule.filter((course) => course !== courseToDelete);
	saveSchedule();
	updateCalendar();
	deleteModal.style.display = "none";
	document.getElementById("course-name").focus();
});

// Cancel deletion
cancelDeleteButton.addEventListener("click", () => {
	courseToDelete = null;
	deleteModal.style.display = "none";
	document.getElementById("course-name").focus();
});

// Save edited course
saveEditButton.addEventListener("click", () => {
	const newDay = document.getElementById("edit-course-day").value;
	const newStartTime = document.getElementById("edit-start-time").value;
	const newEndTime = document.getElementById("edit-end-time").value;

	// Updated course info
	const updatedCourse = {
		...courseToEdit,
		day: newDay,
		startTime: newStartTime,
		endTime: newEndTime,
	};

	if (isOverlapping(updatedCourse, courseToEdit)) {
		alert("This course overlaps with an existing one!");
		return;
	}
	courseToEdit.day = newDay;
	courseToEdit.startTime = newStartTime;
	courseToEdit.endTime = newEndTime;
	saveSchedule();
	updateCalendar();
	editModal.style.display = "none";
	document.getElementById("course-name").focus();
});

// Cancel editing
cancelEditButton.addEventListener("click", () => {
	courseToEdit = null;
	editModal.style.display = "none";
	document.getElementById("course-name").focus();
});

// Initialize calendar
updateCalendar();

document.addEventListener("DOMContentLoaded", () => {
	document.getElementById("course-name").focus();
});
