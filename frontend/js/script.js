document.getElementById("#add-course-btn").addEventListener("click", loadData);
document.getElementById("course-form").addEventListener("submit", addData);

async function loadData() {
	const response = await fetch("./backend/data.json");
	const data = await response.json();
	const display = document.getElementById("data-display");
	display.innerHTML = "";
	data.forEach((item) => {
		display.innerHTML += `<p>Name: ${item.name}, Email: ${item.email}</p>`;
	});
}

async function addData(event) {
	event.preventDefault();
	const name = document.getElementById("name").value;
	const email = document.getElementById("email").value;
	const newData = { name, email };

	const response = await fetch("/update-data", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newData),
	});

	if (response.ok) {
		console.log("Data successfully updated!");
		loadData(); // Refresh the displayed data
	} else {
		console.error("Error updating data");
	}
}
