
// let name_admin = get_name();

const welcome = window.document.getElementById("name_admin");

const user_admin = JSON.parse(localStorage.getItem("user"));

if(user_admin.role == "admin") {
    welcome.innerHTML = user_admin.username + '!';
} else {
    window.location.href = "index.html";
    alert("You are not admin");
}


let total_task = 10;
let n_pending = 3;
let n_completed = 4;
let n_HighPrioirty = 5;

function add_task() {
    total_task++;
    if(prioirty == "High") {
        n_HighPrioirty++;
    } else if(prioirty=="Pending") {
        n_pending++;
    } else {
        n_completed++;
    }
}

function get_total_task() {
    return total_task;
}

function get_task_pending() {
    return n_pending;
}

function get_task_completed() {
    return n_completed;
}

function get_HighPrioirty() {
    return n_HighPrioirty;
}

const card_tasks = window.document.getElementById("total-tasks");
const card_pending = window.document.getElementById("total-pending");
const card_completed = window.document.getElementById("total-completed");
const card_high = window.document.getElementById("total-HighPriority");

card_tasks.innerHTML = get_total_task();
card_pending.innerHTML = get_task_pending();
card_completed.innerHTML = get_task_completed();
card_high.innerHTML = get_HighPrioirty();

// Table

const target = document.querySelector("table");

function Delete_Row(e) {
    if(!e.target.classList.contains("delete_row")) {
        return;
    }
    const btn = e.target;
    btn.closest("tr").remove();
}

function edit_task(e) {
    if(!e.target.classList.contains("edit_task")) {
        return;
    }

    const row = e.target.closest("tr");
    const id = row.querySelector(".task-ID").textContent.trim();
    const title = row.querySelector(".task-name").textContent.trim();
    const teacher = row.querySelector(".teacher-assigned").textContent.trim();
    const Prioirty = row.querySelector(".Prioirty-task").textContent.trim();
    const Progress = row.querySelector(".Progress-task").textContent.trim();
    const admin = row.querySelector(".admin-created").textContent.trim();
    const task = {
        id_task:id,
        title_task:title,
        teacher_task:teacher,
        prioirty_task:Prioirty,
        progress:Progress,
        admin_task:admin,
    }
    
    localStorage.setItem("edit_task",JSON.stringify(task));

    window.location.href = "edit_task.html";

    
}

target.addEventListener("click",Delete_Row);
target.addEventListener("click",edit_task);

let tasks = [];

function read_all_tasks() {
    tasks = JSON.parse(localStorage.getItem("all_tasks")) || [];

    const tbody = document.querySelector('tbody');

    tbody.innerHTML = "";

    for(let i = 0;i<tasks.length;i++) {
        tbody.innerHTML += `
            <tr>
                <td class="task-ID">${tasks[i].task_id}</td>
                <td class="task-name">${tasks[i].task_title}</td>
                <td class="teacher-assigned">${tasks[i].task_teacher}</td>
                <td class="Prioirty-task">${tasks[i].task_prioirty}</td>
                <td class="Progress-task">${tasks[i].task_progress}</td>
                <td class="admin-created">${tasks[i].task_admin}</td>
                <td>
                    <button class="delete_row">Delete</button>
                    <button class="edit_task">Edit</button>
                </td>
            </tr>
        `;
    }
}

window.addEventListener("load", read_all_tasks);


function insert_row() {

    const new_task = {
        task_id: "T00" + (tasks.length + 1),
        task_title: "web",
        task_teacher: "Nammet",
        task_prioirty: "High",
        task_progress: "Pending",
        task_admin: "Mohamed Ahmed"
    }

    tasks.push(new_task);

    localStorage.setItem("all_tasks", JSON.stringify(tasks));

    read_all_tasks();
}

insert_row();

