// // We keep tasks in a plain JS variable instead of localStorage
// // Every function below reads from / writes to this variable
// let currentTasks = [];

// // ===================== STATS =====================
// // Reads from currentTasks (no localStorage)
// function update_stats() {
//     const total     = currentTasks.length;
//     const pending   = currentTasks.filter(t => t.task_progress?.toLowerCase() === "pending").length;
//     const completed = currentTasks.filter(t => t.task_progress?.toLowerCase() === "completed").length;
//     const highPri   = currentTasks.filter(t => t.task_prioirty?.toLowerCase() === "hard" ||
//                                                t.task_prioirty?.toLowerCase() === "high").length;

//     document.getElementById("total-tasks").innerHTML       = total;
//     document.getElementById("total-pending").innerHTML     = pending;
//     document.getElementById("total-completed").innerHTML   = completed;
//     document.getElementById("total-HighPriority").innerHTML = highPri;
// }

// // ===================== RENDER TABLE =====================
// // Reads from currentTasks (no localStorage)
// function read_all_tasks(filter_task = null) {
//     let tasks = filter_task !== null ? filter_task : currentTasks;

//     const tbody      = document.querySelector('tbody');
//     const emptyState = document.getElementById("empty-state");

//     tbody.innerHTML = "";

//     if (tasks.length === 0) {
//         if (emptyState) emptyState.style.display = "";
//         return;
//     }
//     if (emptyState) emptyState.style.display = "none";

//     for (let i = 0; i < tasks.length; i++) {
//         // Only show tasks that belong to the logged-in admin
//         if (user_admin.username != tasks[i].task_admin) {
//             continue;
//         }
//         tbody.innerHTML += `
//             <tr>
//                 <td class="task-ID">${tasks[i].task_id}</td>
//                 <td class="task-name">${tasks[i].task_title}</td>
//                 <td class="teacher-assigned">${tasks[i].task_teacher}</td>
//                 <td class="Prioirty-task">${tasks[i].task_prioirty}</td>
//                 <td class="Progress-task">${tasks[i].task_progress}</td>
//                 <td class="admin-created">${tasks[i].task_admin}</td>
//                 <td>
//                     <button class="edit_task btn btn-danger btn-sm">Edit</button>
//                     <button class="delete_row btn btn-danger btn-sm">Delete</button>
//                 </td>
//             </tr>
//         `;
//     }
// }

// // ===================== AJAX — LOAD ALL TASKS =====================
// // Runs when the page loads. Fetches all tasks from the server
// // and puts them in currentTasks, then draws the table.
// window.addEventListener("load", function() {
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
//                 task_prioirty:    t.priority  || "N/A",
//                 task_progress:    t.progress  || "Pending",
//                 task_admin:       t.admin,
//                 task_description: t.description,
//                 task_date:        t.deadline
//             });
//         }

//         // Step 4: draw the table and update the stat cards
//         read_all_tasks();
//         update_stats();
//     })

//     // Step 5: network failure — show empty table
//     .catch(function(error) {
//         console.log("AJAX request failed (network error):", error);
//         read_all_tasks();
//         update_stats();
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
//             // 204 No Content is the normal response for a successful DELETE
//             console.log("Task deleted from server successfully.");

//             // Step 2: remove from our local array too
//             currentTasks = currentTasks.filter(t => t.task_id !== id);

//             // Step 3: remove the row from the table and refresh stats
//             row.remove();
//             update_stats();
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
// // We pass the task_code in the URL so edit_task.js can fetch it from the server
// function edit_task(e) {
//     if (!e.target.classList.contains("edit_task")) return;

//     const row = e.target.closest("tr");
//     const id  = row.querySelector(".task-ID").textContent.trim();

//     // Pass the task code as a query parameter — no localStorage needed
//     window.location.href = "edit_task.html?task_code=" + encodeURIComponent(id);
// }

// // ===================== FILTERS =====================
// // Filters currentTasks in memory — no localStorage needed
// function applyFilters() {
//     const selectedPriority = document.getElementById('filter-priority').value.toLowerCase();

//     let matchedTasks = [];
//     for (let i = 0; i < currentTasks.length; i++) {
//         const Task = currentTasks[i];
//         if (selectedPriority === '' || Task.task_prioirty.toLowerCase() == selectedPriority) {
//             matchedTasks.push(Task);
//         }
//     }

//     read_all_tasks(matchedTasks);
// }

// function resetFilters() {
//     document.getElementById('filter-priority').value = '';
//     read_all_tasks();
// }

// target.addEventListener("click", Delete_Row);
// target.addEventListener("click", edit_task);


// // Helper function to read the CSRF token from the browser cookies.
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
