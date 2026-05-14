// // We keep tasks in a plain JS variable instead of localStorage
// let currentTasks = [];

// // ===================== RENDER TABLE =====================
// // Reads from currentTasks — no localStorage
// function read_all_tasks() {
//     const tbody      = document.querySelector('#task-tbody');
//     const emptyState = document.getElementById("empty-state");

//     tbody.innerHTML = "";

//     if (currentTasks.length === 0) {
//         if (emptyState) emptyState.style.display = "block";
//         return;
//     }

//     emptyState.style.display = "none";

//     for (let i = 0; i < currentTasks.length; i++) {
//         tbody.innerHTML += `
//             <tr>
//                 <td class="task-ID">${currentTasks[i].task_id}</td>
//                 <td class="task-name">${currentTasks[i].task_title}</td>
//                 <td class="teacher-assigned">${currentTasks[i].task_teacher}</td>
//                 <td class="Prioirty-task">${currentTasks[i].task_prioirty}</td>
//                 <td class="Progress-task">${currentTasks[i].task_progress}</td>
//                 <td class="admin-created">${currentTasks[i].task_admin}</td>
//                 <td>
//                     <button class="edit_task btn btn-danger btn-sm">Edit</button>
//                     <button class="delete_row btn btn-danger btn-sm">Delete</button>
//                 </td>
//             </tr>
//         `;
//     }
// }

// // ===================== AJAX — LOAD ALL TASKS =====================
// // Runs on page load. Fetches all tasks from the server
// // and puts them in currentTasks, then draws the table.
// document.addEventListener("DOMContentLoaded", function() {
//     loadTasksFromServer();
// });

// function loadTasksFromServer() {

//     // Step 1: send a GET request — "give me all tasks"
//     fetch("/api/tasks/create/", {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json"
//         }
//     })

//     // Step 2: read the response as JSON
//     .then(function(response) {
//         if (response.ok) {
//             console.log("Got tasks from the server successfully!");
//         } else {
//             console.log("Server error when loading tasks. Status:", response.status);
//         }
//         return response.json();
//     })

//     // Step 3: convert server shape → shape the rest of the code expects
//     .then(function(serverTasks) {
//         console.log("Tasks from server:", serverTasks);

//         currentTasks = []; // reset before filling

//         for (let i = 0; i < serverTasks.length; i++) {
//             const t = serverTasks[i];
//             currentTasks.push({
//                 task_id:          t.task_code,
//                 task_title:       t.title,
//                 task_teacher:     t.teacher,
//                 task_prioirty:    t.priority || "N/A",
//                 task_progress:    t.progress || "Pending",
//                 task_admin:       t.admin,
//                 task_description: t.description,
//                 task_date:        t.deadline
//             });
//         }

//         // Step 4: draw the table
//         read_all_tasks();
//     })

//     // Step 5: network failure — show empty table
//     .catch(function(error) {
//         console.log("AJAX request failed (network error):", error);
//         read_all_tasks();
//     });
// }


// // ===================== DELETE =====================
// const target = document.querySelector("table");

// function Delete_Row(e) {
//     if (!e.target.classList.contains("delete_row")) return;

//     const row = e.target.closest("tr");
//     const id  = row.querySelector(".task-ID").textContent.trim();

//     // Step 1: send a DELETE request to the server
//     fetch("/api/tasks/edit/" + id + "/", {
//         method: "DELETE",
//         headers: {
//             "X-CSRFToken": getCookie("csrftoken")
//         }
//     })

//     .then(function(response) {
//         if (response.ok || response.status === 204) {
//             // 204 No Content is the normal Django response for a successful DELETE
//             console.log("Task deleted from server successfully.");

//             // Step 2: remove from our local array
//             currentTasks = currentTasks.filter(t => t.task_id !== id);

//             // Step 3: remove the row from the table
//             row.remove();
//         } else {
//             console.log("Server error when deleting. Status:", response.status);
//             alert("Could not delete task. Please try again.");
//         }
//     })

//     .catch(function(error) {
//         console.log("AJAX delete failed (network error):", error);
//         alert("Network error. Please check your connection and try again.");
//     });
// }

// // ===================== EDIT (navigate to edit page) =====================
// // Pass the task_code in the URL — no localStorage needed
// function edit_task(e) {
//     if (!e.target.classList.contains("edit_task")) return;

//     const row = e.target.closest("tr");
//     const id  = row.querySelector(".task-ID").textContent.trim();

//     window.location.href = "edit_task.html?task_code=" + encodeURIComponent(id);
// }

// target.addEventListener("click", Delete_Row);
// target.addEventListener("click", edit_task);


// // Helper function to read the CSRF token from the browser cookies.
// // Django uses this token to protect against cross-site request forgery attacks.
// function getCookie(name) {
//     let cookieValue = null;
//     if (document.cookie && document.cookie !== "") {
//         const cookies = document.cookie.split(";");
//         for (let i = 0; i < cookies.length; i++) {
//             const cookie = cookies[i].trim();
//             if (cookie.startsWith(name + "=")) {
//                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                 break;
//             }
//         }
//     }
//     return cookieValue;
// }
