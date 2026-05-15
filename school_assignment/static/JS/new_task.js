function new_task() {
    const id      = document.querySelector("#task-id").value.trim();
    const title   = document.querySelector("#task-title").value.trim();
    const teacher = document.querySelector("#assigned-teacher-name").value.trim();
    const priority = document.querySelector("#priority-level").value;
    const date    = document.querySelector("#due-date").value;
    const descr   = document.querySelector("#task-description").value.trim();

    
    if (!id || !title || !teacher || !priority || priority === "-Select Priority-" || !date || !descr) {
        alert("Please fill in all fields before creating a task.");
        return;
    }

    
    const existing = JSON.parse(localStorage.getItem("all_tasks")) || [];
    if (existing.some(t => t.task_id === id)) {
        alert(`Task ID "${id}" already exists. Please use a unique ID.`);
        return;
    }

    const task = {
        id_task:      id,
        title_task:   title,
        teacher_task: teacher,
        prioirty_task: priority,
        date_task:    date,
        name_admin:   JSON.parse(localStorage.getItem("user")).username,
        description:  descr
    };

    localStorage.setItem("new_task", JSON.stringify(task));
    window.location.href = "Dashboard.html";
}



document.querySelector("#create").addEventListener("click", new_task);