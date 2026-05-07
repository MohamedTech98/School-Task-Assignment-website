let editTask = localStorage.getItem("edit_task");
editTask = JSON.parse(editTask);

let allTasks = localStorage.getItem("all_tasks");
allTasks = JSON.parse(allTasks);

document.getElementById("task-id").value = editTask.id_task;
document.getElementById("task-title").value = editTask.title_task;
document.getElementById("assigned-teacher-name").value = editTask.teacher_task;
document.getElementById("task-status").value = editTask.progress.toLowerCase();

let prioritySelect = document.getElementById("priority-level");
for (let i = 0; i < prioritySelect.options.length; i++) {
    if (prioritySelect.options[i].value.toLowerCase() == editTask.prioirty_task.toLowerCase()) {
        prioritySelect.options[i].selected = true;
    }
}

let createdAt = "N/A";
for (let i = 0; i < allTasks.length; i++) {
    if (allTasks[i].task_id == editTask.id_task) {
        document.getElementById("due-date").value = allTasks[i].task_date;
        document.getElementById("task-description").value = allTasks[i].task_description;

        if (!allTasks[i].task_created_at) {
            allTasks[i].task_created_at = new Date().toLocaleDateString();
            localStorage.setItem("all_tasks", JSON.stringify(allTasks));
        }

        createdAt = allTasks[i].task_created_at;
    }
}

let allInfoSpans = document.querySelectorAll(".Task-ID-Info");
allInfoSpans[0].textContent = editTask.id_task;
allInfoSpans[1].textContent = editTask.admin_task;
allInfoSpans[2].textContent = createdAt;           

document.querySelector(".Status-Info").textContent = editTask.progress;


function save_task() {

    let newId       = document.getElementById("task-id").value;
    let newTitle    = document.getElementById("task-title").value;
    let newTeacher  = document.getElementById("assigned-teacher-name").value;
    let newPriority = document.getElementById("priority-level").value;
    let newDate     = document.getElementById("due-date").value;
    let newStatus   = document.getElementById("task-status").value;
    let newDesc     = document.getElementById("task-description").value;

    if (!newId || !newTitle || !newTeacher || !newPriority || !newDate || !newDesc) {
        Swal.fire({
            icon: "error",
            title: "Missing Fields!",
            text: "Please fill in all fields before saving.",
        });
        return;
    }

    for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i].task_id == editTask.id_task) {
            allTasks[i].task_id          = newId;
            allTasks[i].task_title       = newTitle;
            allTasks[i].task_teacher     = newTeacher;
            allTasks[i].task_prioirty    = newPriority;
            allTasks[i].task_date        = newDate;
            allTasks[i].task_progress    = newStatus;
            allTasks[i].task_description = newDesc;
        }
    }

    localStorage.setItem("all_tasks", JSON.stringify(allTasks));
    localStorage.removeItem("edit_task");

    Swal.fire({
        icon: "success",
        title: "Task Edited!",
        text: "Task updated successfully!",
    }).then(function() {
        window.location.href = "Dashboard.html";
    });
}

document.getElementById("create").addEventListener("click", save_task);