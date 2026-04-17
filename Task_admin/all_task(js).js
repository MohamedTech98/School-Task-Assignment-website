function read_all_tasks() {
    const tasks = JSON.parse(localStorage.getItem("all_tasks")) || [];
    const tbody = document.querySelector('#task-tbody');
    const emptyState = document.getElementById("empty-state");

    tbody.innerHTML = "";

    if (tasks.length === 0) {
        if (emptyState) emptyState.style.display = "block";
        return;
    }

    emptyState.style.display = "none";

    for (let i = 0; i < tasks.length; i++) {
        tbody.innerHTML += `
            <tr>
                <td class="task-ID">${tasks[i].task_id}</td>
                <td class="task-name">${tasks[i].task_title}</td>
                <td class="teacher-assigned">${tasks[i].task_teacher}</td>
                <td class="Prioirty-task">${tasks[i].task_prioirty}</td>
                <td class="Progress-task">${tasks[i].task_progress}</td>
                <td class="admin-created">${tasks[i].task_admin}</td>
                <td>
                    <button class="edit_task btn btn-danger btn-sm">Edit</button>
                    <button class="delete_row btn btn-danger btn-sm">Delete</button>
                </td>
            </tr>
        `;
    }
}

document.addEventListener("DOMContentLoaded", read_all_tasks);

const target = document.querySelector("table");

function Delete_Row(e) {
    if (!e.target.classList.contains("delete_row")) return;

    const row = e.target.closest("tr");
    const id  = row.querySelector(".task-ID").textContent.trim();

    let tasks = JSON.parse(localStorage.getItem("all_tasks")) || [];
    tasks = tasks.filter(t => t.task_id !== id);
    localStorage.setItem("all_tasks", JSON.stringify(tasks));

    row.remove();
    update_stats();
}

function edit_task(e) {
    if (!e.target.classList.contains("edit_task")) return;

    const row      = e.target.closest("tr");
    const id       = row.querySelector(".task-ID").textContent.trim();
    const title    = row.querySelector(".task-name").textContent.trim();
    const teacher  = row.querySelector(".teacher-assigned").textContent.trim();
    const priority = row.querySelector(".Prioirty-task").textContent.trim();
    const progress = row.querySelector(".Progress-task").textContent.trim();
    const admin    = row.querySelector(".admin-created").textContent.trim();

    const task = {
        id_task:       id,
        title_task:    title,
        teacher_task:  teacher,
        prioirty_task: priority,
        progress:      progress,
        admin_task:    admin,
    };

    localStorage.setItem("edit_task", JSON.stringify(task));
    window.location.href = "edit_task.html";
}

target.addEventListener("click", Delete_Row);
target.addEventListener("click", edit_task);
