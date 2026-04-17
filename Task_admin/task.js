
const welcome = window.document.getElementById("name_admin");
const user_admin = JSON.parse(localStorage.getItem("user"));

if (user_admin && user_admin.role == "admin") {
    welcome.innerHTML = user_admin.username + '!';
} else {
    window.location.href = "index.html";
    alert("You are not admin");
}

function update_stats() {
    const tasks = JSON.parse(localStorage.getItem("all_tasks")) || [];

    const total      = tasks.length;
    const pending    = tasks.filter(t => t.task_progress?.toLowerCase() === "pending").length;
    const completed  = tasks.filter(t => t.task_progress?.toLowerCase() === "completed").length;
    const highPri    = tasks.filter(t => t.task_prioirty?.toLowerCase() === "hard" ||
                                        t.task_prioirty?.toLowerCase() === "high").length;

    document.getElementById("total-tasks").innerHTML      = total;
    document.getElementById("total-pending").innerHTML    = pending;
    document.getElementById("total-completed").innerHTML  = completed;
    document.getElementById("total-HighPriority").innerHTML = highPri;
}

function read_all_tasks() {
    const tasks = JSON.parse(localStorage.getItem("all_tasks")) || [];
    const tbody = document.querySelector('tbody');
    const emptyState = document.getElementById("empty-state");

    tbody.innerHTML = "";

    if (tasks.length === 0) {
        if (emptyState) emptyState.style.display = "";
        return;
    }
    if (emptyState) emptyState.style.display = "none";

    for (let i = 0; i < tasks.length; i++) {
        if(user_admin.username != tasks[i].task_admin) {
            continue;
        }
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


function insert_row() {
    const insert_task = JSON.parse(localStorage.getItem("new_task"));

    if (insert_task) {
        let tasks = JSON.parse(localStorage.getItem("all_tasks")) || [];

        const new_task = {
            task_id:       insert_task.id_task,
            task_title:    insert_task.title_task,
            task_teacher:  insert_task.teacher_task,
            task_prioirty: insert_task.prioirty_task,
            task_progress: "Pending",
            task_admin:    insert_task.name_admin
        };

        tasks.push(new_task);
        localStorage.setItem("all_tasks", JSON.stringify(tasks));

        localStorage.removeItem("new_task");
    }

    read_all_tasks();
    update_stats();
}

window.addEventListener("load", insert_row);


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
