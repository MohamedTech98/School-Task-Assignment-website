# 📚 School Task Assignment Website

A web application that enables school admins to assign and manage tasks for teachers, and allows teachers to track and complete their assigned tasks — all within a role-based, dynamic interface.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [User Roles](#user-roles)
- [Pages & Navigation](#pages--navigation)
- [Task Model](#task-model)
- [Getting Started](#getting-started)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Screenshots](#screenshots)

---

## 📖 Project Overview

The **School Task Assignment Website** is a role-based task management system built as a school project. It allows two types of users — **Admins** and **Teachers** — to interact with tasks in different ways. Admins create and manage tasks, while teachers view, filter, and complete their assigned tasks.

---

## ✨ Features

### 🔐 Authentication
- Sign up with username, password, confirm password, email, and role selection (`Admin` or `Teacher`)
- Secure login for both user types
- Dynamic navigation bar that adjusts based on the logged-in user's role

### 🛠️ Admin Capabilities
| # | Feature |
|---|---------|
| 1 | Sign up and create an admin account |
| 2 | Log in to the dashboard |
| 3 | Add a new task with full details |
| 4 | View all tasks created by the logged-in admin |
| 5 | Edit a task's details |
| 6 | Delete a task |

### 👩‍🏫 Teacher Capabilities
| # | Feature |
|---|---------|
| 1 | Sign up and create a teacher account |
| 2 | Log in to the dashboard |
| 3 | Search tasks by priority (only tasks assigned to them) |
| 4 | View all assigned tasks |
| 5 | View detailed information for a specific task |
| 6 | Mark a task as completed |
| 7 | View a list of completed tasks |

---

## 👥 User Roles

### Admin
An admin is responsible for task creation and management. After logging in, an admin can create tasks and assign them to specific teachers, then edit or delete them as needed.

### Teacher
A teacher can only see tasks that are assigned to them. They can browse, filter by priority, view task details, and mark tasks as done.

---

## 🗺️ Pages & Navigation

The navigation bar is **persistent across all pages** and **dynamically rendered** based on the logged-in user's role.

| Page | Access |
|------|--------|
| Home / Landing | Public |
| Sign Up | Public |
| Login | Public |
| Admin Dashboard (task list) | Admin only |
| Add Task | Admin only |
| Edit Task | Admin only |
| Teacher Dashboard (task list) | Teacher only |
| Task Detail Page | Teacher only |
| Completed Tasks | Teacher only |

---

## 📦 Task Model

Each task contains the following fields:

| Field | Description |
|-------|-------------|
| `ID` | Unique identifier for the task |
| `Task Title` | Short name of the task |
| `Teacher Name` | The teacher the task is assigned to |
| `Priority` | One of: `low`, `medium`, or `high` |
| `Description` | Detailed description of the task |
| `Created By` | Username of the admin who created the task |

---

## 🚀 Getting Started

### Prerequisites
- A web browser (Chrome, Firefox, Edge, etc.)
- A local development server or live server extension (e.g., VS Code Live Server)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/school-task-assignment.git

# 2. Navigate into the project folder
cd school-task-assignment

# 3. Open in your browser or start a local server
# (e.g., using VS Code Live Server or any HTTP server)
```

> If the project uses a backend (e.g., Node.js or Django), follow additional setup instructions in the `/backend` folder.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | HTML, CSS, JavaScript |
| Styling | CSS / Bootstrap (if used) |
| Storage | LocalStorage / Backend API |
| Authentication | Session-based / Token-based |

> Update this table to reflect your actual tech choices.

---

## 🗂️ Folder Structure

```
school-task-assignment/
│
├── index.html              # Landing / Home page
├── signup.html             # Sign up page
├── login.html              # Login page
│
├── admin/
│   ├── dashboard.html      # Admin task list
│   ├── add-task.html       # Add new task
│   └── edit-task.html      # Edit existing task
│
├── teacher/
│   ├── dashboard.html      # Teacher task list
│   ├── task-detail.html    # Task detail view
│   └── completed.html      # Completed tasks list
│
├── css/
│   └── style.css           # Global styles
│
├── js/
│   ├── auth.js             # Authentication logic
│   ├── tasks.js            # Task CRUD logic
│   └── navbar.js           # Dynamic navbar logic
│
└── README.md
```

---

## 📸 Screenshots

> Add screenshots of your pages here once the project is complete.

```
[Screenshot: Login Page]
[Screenshot: Admin Dashboard]
[Screenshot: Add Task Form]
[Screenshot: Teacher Task List]
[Screenshot: Task Detail Page]
```

---

## 👨‍💻 Author

- **Project Type:** School Assignment — Project 3
- **Course:** Web Development
- **Developer:** *(Your Name)*

---

## 📄 License

This project was created for educational purposes as part of a school assignment.
