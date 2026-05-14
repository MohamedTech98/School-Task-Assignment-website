// // ===================== LOAD TASK FROM SERVER =====================
// // Instead of reading from localStorage, we read the task_code from the URL
// // e.g.  edit_task.html?task_code=TASK-001
// // then fetch that specific task from the Django API.

// // Step 1: get the task_code from the URL query string
// const urlParams   = new URLSearchParams(window.location.search);
// const taskCode    = urlParams.get("task_code");

// // We still need the admin's session info (login data, not task data)
// const currentUser = JSON.parse(localStorage.getItem("user"));

// // We will store the task we loaded here so save_task() can use it
// let editTask = null;

// // Step 2: fetch this specific task from the server as soon as the page loads
// window.addEventListener("load", function() {
//     loadTaskFromServer();
// });

// function loadTaskFromServer() {

//     // GET /api/tasks/edit/<task_code>/  → returns one task object
//     fetch("/api/tasks/edit/" + taskCode + "/", {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json"
//         }
//     })

//     .then(function(response) {
//         if (response.ok) {
//             console.log("Loaded task from server successfully.");
//         } else {
//             console.log("Server error when loading task. Status:", response.status);
//             alert("Could not load task. Please go back and try again.");
//         }
//         return response.json();
//     })

//     .then(function(serverTask) {
//         console.log("Task data from server:", serverTask);

//         // Step 3: save the server data into our local variable
//         editTask = serverTask;

//         // Step 4: fill the form fields with the data we got from the server
//         document.getElementById("task-id").value                 = serverTask.task_code;
//         document.getElementById("task-title").value              = serverTask.title;
//         document.getElementById("assigned-teacher-name").value   = serverTask.teacher;
//         document.getElementById("due-date").value                = serverTask.deadline;
//         document.getElementById("task-description").value        = serverTask.description;

//         // Set the priority dropdown to the saved value
//         let prioritySelect = document.getElementById("priority-level");
//         for (let i = 0; i < prioritySelect.options.length; i++) {
//             if (prioritySelect.options[i].value.toLowerCase() == (serverTask.priority || "").toLowerCase()) {
//                 prioritySelect.options[i].selected = true;
//             }
//         }

//         // Set the status dropdown
//         if (serverTask.progress) {
//             document.getElementById("task-status").value = serverTask.progress.toLowerCase();
//         }

//         // Fill the info spans in the sidebar / header area
//         let allInfoSpans = document.querySelectorAll(".Task-ID-Info");
//         allInfoSpans[0].textContent = serverTask.task_code;
//         allInfoSpans[1].textContent = serverTask.admin;
//         allInfoSpans[2].textContent = serverTask.created_at || "N/A";

//         document.querySelector(".Status-Info").textContent = serverTask.progress || "Pending";
//     })

//     .catch(function(error) {
//         console.log("AJAX request failed (network error):", error);
//         alert("Network error. Could not load task.");
//     });
// }


// // ===================== SAVE (PATCH) TASK =====================
// function save_task() {

//     let newId       = document.getElementById("task-id").value;
//     let newTitle    = document.getElementById("task-title").value;
//     let newTeacher  = document.getElementById("assigned-teacher-name").value;
//     let newPriority = document.getElementById("priority-level").value;
//     let newDate     = document.getElementById("due-date").value;
//     let newStatus   = document.getElementById("task-status").value;
//     let newDesc     = document.getElementById("task-description").value;

//     if (!newId || !newTitle || !newTeacher || !newPriority || !newDate || !newDesc) {
//         Swal.fire({
//             icon: "error",
//             title: "Missing Fields!",
//             text: "Please fill in all fields before saving.",
//         });
//         return;
//     }

//     // This is the data the Django serializer expects
//     const dataToSend = {
//         task_code:   newId,
//         title:       newTitle,
//         teacher:     newTeacher,
//         admin:       currentUser.id,   // admin's user ID (from session only)
//         deadline:    newDate,
//         description: newDesc
//     };

//     // Step 1: use the ORIGINAL task_code (from URL) to identify the record on the server
//     // Step 2: send a PATCH request — "update only the fields I'm sending"
//     fetch("/api/tasks/edit/" + taskCode + "/", {
//         method: "PATCH",
//         headers: {
//             "Content-Type": "application/json",
//             "X-CSRFToken": getCookie("csrftoken")
//         },
//         body: JSON.stringify(dataToSend)
//     })

//     // Step 3: check if the update worked
//     .then(function(response) {
//         if (response.ok) {
//             console.log("Task updated on the server successfully.");

//             // Step 4: tell the user and go back to the dashboard
//             Swal.fire({
//                 icon: "success",
//                 title: "Task Edited!",
//                 text: "Task updated successfully!",
//             }).then(function() {
//                 window.location.href = "Dashboard.html";
//             });
//         } else {
//             return response.json().then(function(err) {
//                 console.log("Server error when updating:", err);
//                 Swal.fire({
//                     icon: "error",
//                     title: "Update Failed!",
//                     text: "Could not update task. Please check your inputs.",
//                 });
//             });
//         }
//     })

//     // Step 5: network failure
//     .catch(function(error) {
//         console.log("AJAX request failed (network error):", error);
//         Swal.fire({
//             icon: "error",
//             title: "Network Error!",
//             text: "Please check your connection and try again.",
//         });
//     });
// }


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

// document.getElementById("create").addEventListener("click", save_task);
