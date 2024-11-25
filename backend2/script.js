// Array to store courses
let courses = [];

// Load courses from localStorage
if (localStorage.getItem('courses')) {
    courses = JSON.parse(localStorage.getItem('courses'));
    updateScheduleDisplay();
}

// Form submission event listener
document.getElementById('courseForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const courseName = document.getElementById('courseName').value;
    const courseDay = document.getElementById('courseDay').value;
    const courseTime = document.getElementById('courseTime').value;

    addCourse(courseName, courseDay, courseTime);
    
    // Reset form
    this.reset();
});

function addCourse(name, day, time) {
    const course = {
        name: name,
        day: day,
        time: time
    };

    courses.push(course);
    updateScheduleDisplay();
    saveCourses();
}

function updateScheduleDisplay() {
    const table = document.getElementById('scheduleTable');
    
    // Clear existing rows except header
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    // Add courses to table
    courses.forEach((course, index) => {
        const row = table.insertRow(-1);
        row.insertCell(0).textContent = course.day;
        row.insertCell(1).textContent = course.name;
        row.insertCell(2).textContent = course.time;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteCourse(index);
        row.insertCell(3).appendChild(deleteButton);
    });
}

function deleteCourse(index) {
    courses.splice(index, 1);
    updateScheduleDisplay();
    saveCourses();
}

function saveCourses() {
    localStorage.setItem('courses', JSON.stringify(courses));
}