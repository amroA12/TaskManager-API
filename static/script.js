function loadTasks() {
    fetch("/tasks")
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById("taskList");
            list.innerHTML = "";
            data.forEach(task => {
                const li = document.createElement("li");
                li.innerHTML = `
                    ${task.title}
                    <button onclick="deleteTask(${task.id})">Delete</button>
                `;
                list.appendChild(li);
            });
        });
}

function addTask() {
    const input = document.getElementById("taskInput");
    fetch("/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: input.value })
    }).then(() => {
        input.value = "";
        loadTasks();
    });
}

function deleteTask(id) {
    fetch(`/tasks/${id}`, { method: "DELETE" })
        .then(() => loadTasks());
}

window.onload = loadTasks;
