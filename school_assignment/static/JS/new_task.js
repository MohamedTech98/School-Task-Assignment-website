function new_task() {
    const id       = document.querySelector("#task-id").value.trim();
    const title    = document.querySelector("#task-title").value.trim();
    const teacher  = document.querySelector("#assigned-teacher-name").value.trim();
    const priority = document.querySelector("#priority-level").value;
    const date     = document.querySelector("#due-date").value;
    const descr    = document.querySelector("#task-description").value.trim();

    // Basic validation — make sure nothing is empty
    if (!id || !title || !teacher || !priority || priority === "-Select Priority-" || !date || !descr) {
        alert("Please fill in all fields before creating a task.");
        return;
    }

    // ===================== AJAX START =====================
    // This is the data the Django API is expecting (matches the serializer fields)
    const dataToSend = {
        task_code:   id,
        title:       title,
        teacher:     teacher,   // teacher's user ID
        admin:       JSON.parse(localStorage.getItem("user")).id,  // admin's user ID (session only)
        deadline:    date,
        description: descr
    };

    // Step 1: use fetch to send a POST request to the create endpoint
    fetch("/api/tasks/create/", {
        method: "POST",                           // we are sending (creating) data
        headers: {
            "Content-Type": "application/json",   // tell the server we are sending JSON
            "X-CSRFToken": getCookie("csrftoken") // Django needs this for security
        },
        body: JSON.stringify(dataToSend)          // convert our JS object to a JSON string
    })

    // Step 2: when the server responds, check if it worked
    .then(function(response) {
        if (response.ok) {
            // response.ok means status 200-299 — task was created!
            console.log("Task was saved to the server successfully.");
            window.location.href = "Dashboard.html"; // go to dashboard only after success
        } else {
            // Something went wrong on the server side
            return response.json().then(function(err) {
                console.log("Server returned an error:", err);
                alert("Could not create task. Please check your inputs and try again.");
            });
        }
    })

    // Step 3: if the network itself failed (no internet, wrong URL, etc.)
    .catch(function(error) {
        console.log("AJAX request failed (network error):", error);
        alert("Network error. Please check your connection and try again.");
    });

    // ===================== AJAX END =====================
}


// Helper function to read the CSRF token from the browser cookies.
// Django uses this token to protect against cross-site request forgery attacks.
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + "=")) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


document.querySelector("#create").addEventListener("click", new_task);
