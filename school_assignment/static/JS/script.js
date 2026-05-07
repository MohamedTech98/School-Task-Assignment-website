// ROLE
let role = "teacher";

// toggle buttons
document.addEventListener("DOMContentLoaded", function () {

    let buttons = document.querySelectorAll(".role-toggle button");

    if (buttons.length > 0) {
        buttons[0].onclick = function () {
            role = "teacher";
            this.classList.add("active");
            buttons[1].classList.remove("active");
        };

        buttons[1].onclick = function () {
            role = "admin";
            this.classList.add("active");
            buttons[0].classList.remove("active");
        };
    }
});

// SIGNUP 
function signup(event) {
    event.preventDefault();

    let isValid = true;
    let inputs = document.querySelectorAll(".signup-box input");

    inputs.forEach(input => {
        let error = input.nextElementSibling;
        if (input.value.trim() === "") {
            error.textContent = "This field is required";
            isValid = false;
        } else {
            error.textContent = "";
        }
    });

    let password = document.getElementById("password").value;
    let confirm = document.getElementById("confirmPassword").value;

    if (password.length < 8) {
        document.getElementById("password").nextElementSibling.textContent =
            "Password must be at least 8 characters";
        isValid = false;
    }

    if (password !== confirm) {
        document.getElementById("confirmPassword").nextElementSibling.textContent =
            "Passwords do not match";
        isValid = false;
    }

    if (!isValid) return;

    let user = {
        username:   document.getElementById("username").value,
        first_name: document.getElementById("firstname").value,  
        last_name:  document.getElementById("lastname").value,   
        email:      document.getElementById("email").value,
        password:   password,
        role:       role
    };

    localStorage.setItem("user", JSON.stringify(user));
    alert("Account created");
    window.location.href = "Login.html";
}
//Login

function login(event) {
    event.preventDefault();

    let username = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;

    let user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        alert("No account found ");
        return;
    }

    
    if (username === user.username && password === user.password) {

        
        if (user.role === "admin") {
            window.location.href = "../Task_admin/Dashboard.html";
        } else {
            window.location.href = "../Task_Teacher/TeacherTasks.html";
        }

    } else {
        alert("Wrong username or password ");
    }
}
