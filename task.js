
// let name_admin = get_name();

const welcome = window.document.getElementById("name_admin");

let total_task = 10;
let n_pending = 3;
let n_completed = 4;
let n_HighPrioirty = 5;

welcome.innerHTML = "Mohamed Ahmed" + '!';

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

function insert_row() {
    const data = ["T001","web","Nammet","High","Pending","Mohamed Ahmed"];

    const tbody = document.querySelector('tbody');
    tbody.innerHTML += `
        <tr>
            <td class = "task-ID">${data[0]}</td>
            <td class = "task-name">${data[1]}</td>
            <td class = "teacher-assigned">${data[2]}</td>
            <td class = "Prioirty-task">${data[3]}</td>
            <td class = "Progress-task">${data[4]}</td>
            <td class = "admin-created">${data[5]}</td>
            <td>
                <button class="delete_row">
                    Delete
                </button>
                <button class="edit_task">
                    Edit
                </button>
            </td>
    `;
    tbody.innerHTML += `
        <tr>
            <td>${data[0]}</td>
            <td>${data[1]}</td>
            <td>${data[2]}</td>
            <td>${data[3]}</td>
            <td>${data[4]}</td>
            <td>${data[5]}</td>
            <td>
                <button class="delete_row">
                    Delete
                </button>
            </td>
    `;
    tbody.innerHTML += `
        <tr>
            <td>${data[0]}</td>
            <td>${data[1]}</td>
            <td>${data[2]}</td>
            <td>${data[3]}</td>
            <td>${data[4]}</td>
            <td>${data[5]}</td>
            <td>
                <button class="delete_row">
                    Delete
                </button>
            </td>
    `;
    // const table = document.getElementById("task-table");
    // const new_row = table.insertRow();

    // for(let i = 0;i<data.length;i++) {
    //     const new_cell = new_row.insertCell();
    //     new_cell.innerHTML = data[i]; 
    // }

    // const col_action = new_row.insertCell();
    // const edit_link = document.createElement("a");
    // edit_link.innerText = "edit";
    // // const delete_link = document.createElement("a");
    // col_action.appendChild(edit_link);

}

insert_row();
// tbody.addEventListener("submit",insert_row);

