# Technical Overview — EduTask (School Task Assignment Website)

---

## 1. Project Overview

**EduTask** is a role-based school task management web application. It allows two types of users — **Admins** and **Teachers** — to interact with tasks in different ways. Admins create, edit, delete, and oversee tasks, while teachers view their assigned tasks, filter them, mark them complete, and track progress.

**Target Users:** School administrators and teachers.

### Core Features
- User registration and login with role selection (admin / teacher)
- Role-based dashboards (separate UI for admin and teacher)
- Admin: create, read, update, delete tasks
- Teacher: view assigned tasks, filter by priority, mark complete, view completed history
- Session-based authentication with Django's built-in auth framework
- All task CRUD handled client-side via `localStorage`

---

## 2. Tech Stack

| Layer | Technology |
|-------|-----------|
| **Backend Framework** | Django 6.0.5 (Python 3.13) |
| **Frontend** | HTML5, CSS3, Vanilla JavaScript (ES6) |
| **Database** | SQLite3 (default Django) |
| **CSS Architecture** | Custom CSS with design tokens (CSS custom properties), dark/light mode, Google Fonts (Playfair Display + DM Sans) |
| **Client-side Storage** | Browser `localStorage` |
| **Package Manager** | Pipenv (`Pipfile`) |
| **Auth Provider** | Django `django.contrib.auth` with custom `AbstractUser` model |
| **Dependencies** | `django` only (production); dev: none |

---

## 3. Project Architecture

### Overall Style — Monolithic Django + Client-Side Heavy

The project follows a **Django monolith** structure with a significant architectural quirk: authentication and page rendering are handled server-side by Django, but **all task data is managed entirely on the client side** via `localStorage`. The Django `Task` model exists but is never used in views — it is only reflected in a migration and the admin interface.

### Folder Structure

```
School-Task-Assignment-website/
├── Pipfile                        # Python dependencies (Django + Python 3.13)
├── Pipfile.lock
├── README.md
├── school_assignment/             # Django project root
│   ├── manage.py                  # Django CLI entry point
│   ├── db.sqlite3                 # SQLite database
│   ├── static/                    # Static assets
│   │   ├── CSS/
│   │   │   ├── style.css          # Global design system (variables, reset, dark/light)
│   │   │   ├── auth.css           # Login/Signup page styles
│   │   │   ├── style1.css         # Teacher dashboard styles
│   │   │   ├── style_task.css     # Admin dashboard styles
│   │   │   └── createTask_editTask.css  # Create/Edit form styles (float-based, legacy)
│   │   └── JS/
│   │       ├── task.js            # Admin dashboard CRUD + filtering
│   │       ├── new_task.js        # Create task form handler
│   │       ├── edit_task.js       # Edit task form handler
│   │       ├── all_task(js).js    # All tasks page CRUD (duplicate of task.js)
│   │       ├── completed.js       # Teacher completed tasks page
│   │       ├── task_details.js    # Teacher task detail + status update
│   │       └── java.js            # Teacher task filter/reset logic
│   ├── templates/                 # Django templates
│   │   ├── index.html             # Public landing page
│   │   ├── Login_Sign/
│   │   │   ├── Login.html         # Login form
│   │   │   └── Signup.html        # Registration form with role toggle
│   │   ├── Task_admin/
│   │   │   ├── Dashboard.html     # Admin main dashboard
│   │   │   ├── create_task.html   # Task creation form
│   │   │   ├── edit_task.html     # Task edit form
│   │   │   └── all_task.html      # All tasks listing
│   │   └── Task_Teacher/
│   │       ├── TeacherTasks.html  # Teacher task list
│   │       ├── Completed_tasks.html # Completed tasks history
│   │       ├── task_details.html  # Single task detail + status update
│   │       └── TeacherProfile.html # Teacher profile page
│   ├── school_assignment/         # Django project config
│   │   ├── settings.py            # All Django settings
│   │   ├── urls.py                # Root URL configuration
│   │   ├── wsgi.py
│   │   └── asgi.py
│   ├── authentication/            # Auth app (users, login, register, admin views)
│   │   ├── models.py              # Custom User (AbstractUser + role field)
│   │   ├── forms.py               # RegistrationForm, LoginForm
│   │   ├── views.py               # Auth views + admin dashboard/create/all/edit views
│   │   ├── urls.py                # Auth + admin URL routes
│   │   ├── admin.py               # User model registered in Django admin
│   │   └── migrations/
│   ├── teacher/                   # Teacher app
│   │   ├── views.py               # Teacher views (tasks, completed, profile, details)
│   │   ├── urls.py                # Teacher URL routes
│   │   └── models.py              # Empty (no custom models)
│   └── task_admin/                # Task admin app (partially implemented)
│       ├── models.py              # Task model (defined but unused in views)
│       ├── forms.py               # Empty file
│       ├── views.py               # dashboard_view (never routed)
│       └── urls.py                # URL config (never included in root)
└── "Screenshot 2026-04-16 221436.jpg"
```

---

## 4. Application Flow

### Execution Flow

```
User hits URL → Django URL dispatcher → View function → Render template (+ context)
                                                              ↓
                                                     Browser loads HTML + CSS + JS
                                                              ↓
                                                     JS manages all task CRUD via localStorage
```

### Detailed Flow

```
Startup (/) → home_view → authenticated? → YES → redirect to role dashboard
                          → NO  → render index.html (landing page)

Registration (/register/) → register_view → POST → validate RegistrationForm
       → save User (role=admin → is_staff=True, is_superuser=True)
       → login(request, user) → redirect to role dashboard

Login (/login/) → login_view → POST → validate LoginForm (AuthenticationForm)
       → login(request, user) → redirect to ?next= or role dashboard

Admin Dashboard (/dashboard/) → admin_dashboard (empty view, no context)
       → renders Dashboard.html → JS (task.js) reads localStorage for task data

Teacher Dashboard (/teacher/) → teacher_tasks
       → renders TeacherTasks.html with context (alltasks, counts)

Create Task (/create-task/) → admin_create_task (empty view)
       → renders create_task.html → JS (new_task.js) saves to localStorage

All Tasks (/all-tasks/) → admin_all_task (empty view)
       → renders all_task.html → JS (all_task(js).js) reads localStorage

Edit Task (/edit-task/) → admin_edit_task (empty view)
       → renders edit_task.html → JS (edit_task.js) reads/writes localStorage
```

### Component Interaction

```
Django Server Side:
  settings.py ──> urls.py ──> views.py ──> forms.py ──> models.py
                    │              │            │             │
                    │              ▼            ▼             ▼
                    │         templates/   validates    SQLite DB
                    │              │       User data    (users only)
                    │              ▼
                    │         HTML + CSS + JS sent to browser

Browser Side:
  HTML templates ──> JS files ──> localStorage (all task data)
       │                │
       ▼                ▼
  CSS styling      DOM manipulation
```

### Routing Map

| URL Pattern | View | Name | Access |
|---|---|---|---|
| `/` | `home_view` | `Home` | Public |
| `/register/` | `register_view` | `register` | Public |
| `/login/` | `login_view` | `login` | Public |
| `/logout/` | `logout_view` | `logout` | Authenticated |
| `/dashboard/` | `admin_dashboard` | `admin_dashboard` | Login required |
| `/create-task/` | `admin_create_task` | `admin_create_task` | Login required |
| `/all-tasks/` | `admin_all_task` | `admin_all_task` | Login required |
| `/edit-task/` | `admin_edit_task` | `admin_edit_task` | Login required |
| `/teacher/` | `teacher_tasks` | `teacher_tasks` | Login required |
| `/teacher/completed/` | `completed` | `completed` | Login required |
| `/teacher/profile/` | `profile` | `profile` | Login required |
| `/teacher/details/` | `details` | `details` | Login required |

---

## 5. Frontend Analysis

### UI Structure

The frontend consists of 11 Django template pages with a shared design system:

- **Public**: Landing page (index.html), Login, Signup
- **Admin**: Dashboard, Create Task, All Tasks, Edit Task
- **Teacher**: My Tasks, Completed Tasks, Task Details, Profile

### Styling System

5 CSS files using a tiered approach:

| File | Lines | Purpose |
|------|-------|---------|
| `style.css` | 432 | **Design system** — CSS custom properties (`--navy`, `--amber`, `--red`, `--green`), global reset, dark/light mode, typography (Playfair Display + DM Sans), shared components |
| `auth.css` | 312 | Authentication pages — gradient background, centered card layout, fade-up animation |
| `style1.css` | 561 | Teacher dashboard — stat cards grid, teacher name badge, task listing |
| `style_task.css` | 402 | Admin dashboard — admin greeting, stat pills, table layout |
| `createTask_editTask.css` | 291 | Create/Edit forms — float-based legacy layout, distinct from the flexbox/grid used elsewhere |

### Client-Side Logic (7 JS files)

The JavaScript layer is the **de facto backend for all task operations**:

| File | Size | Role |
|------|------|------|
| `task.js` | 156 lines | **Admin hub** — loads/stores admin data from localStorage, renders task table, CRUD operations (edit, delete), stats calculation, priority filtering |
| `new_task.js` | 38 lines | Creates a task object from form fields, validates uniqueness by ID, saves to `localStorage.new_task`, redirects to dashboard |
| `edit_task.js` | 85 lines | Pre-populates edit form from `localStorage.edit_task`, saves changes back to `localStorage.all_tasks`, uses SweetAlert2 for UX |
| `all_task(js).js` | 76 lines | Near-duplicate of CRUD logic in `task.js` for the All Tasks page |
| `completed.js` | 36 lines | Filters tasks by teacher name from localStorage, renders completed table, calculates stats |
| `task_details.js` | 53 lines | Loads selected task from `localStorage.selected_task`, allows status update (pending → completed) |
| `java.js` | 21 lines | Simple priority filter/reset for teacher task cards |

### localStorage Data Model

```js
// User session (set by login JS? — actually never set, but expected by JS)
localStorage.setItem("user", JSON.stringify({
  username, role, first_name, last_name
}));

// All tasks array
localStorage.setItem("all_tasks", JSON.stringify([{
  task_id: "T001",
  task_title: "Grade Mid-Term Papers",
  task_teacher: "Sara Ahmed",
  task_prioirty: "High",          // typo in key name
  task_progress: "Pending",
  task_admin: "admin_user",
  task_description: "...",
  task_date: "2026-05-15",
  task_created_at: "..."
}]));

// Transient state
localStorage.setItem("new_task", JSON.stringify({...}));     // create task form
localStorage.setItem("edit_task", JSON.stringify({...}));    // edit task form
localStorage.setItem("selected_task", JSON.stringify({...})); // task detail
```

---

## 6. Backend Analysis

### Server Structure (Django)

3 Django apps:

| App | Purpose |
|-----|---------|
| `authentication` | Custom User model, registration/login/logout views, admin dashboard views |
| `teacher` | Teacher-specific views (tasks list, completed, profile, details) |
| `task_admin` | Task model definition, empty forms.py, unused dashboard_view |

### Authentication & Authorization

- **Model**: Custom `User(AbstractUser)` with `role` field (`admin` / `teacher`)
- **Strategy**: Session-based authentication via `django.contrib.auth`
- **Login Decorator**: `@login_required` on all protected views; `LOGIN_URL = 'login'` in settings
- **Role Handling**:
  - `get_role_dashboard(user)`: Maps role to URL name (`admin` → `admin_dashboard`, `teacher` → `teacher_tasks`)
  - Admin users automatically get `is_staff=True, is_superuser=True` on registration/login
  - Templates use `{{ user.role }}` to conditionally render UI elements

### Middleware (default Django stack)

```
SecurityMiddleware → SessionMiddleware → CommonMiddleware
→ CsrfViewMiddleware → AuthenticationMiddleware → MessagesMiddleware
```

### Key Backend Observations

- **`task_admin/views.py`** has `dashboard_view` but is never routed — the URL config in `task_admin/urls.py` is not included in the root `urls.py`
- **`authentication/views.py`** hosts admin views (`admin_dashboard`, `admin_create_task`, etc.) even though they belong to the `task_admin` domain
- **All admin views render empty templates** — they pass no context data. Task data is populated entirely by client-side JS reading `localStorage`
- **`teacher/views.py:teacher_tasks`** is the only view that actually queries the database, but the data is never displayed since `TeacherTasks.html` hardcodes `0` in stat cards and the task listing is done client-side

---

## 7. Database Analysis

### Database Type: SQLite3 (via Django ORM)

### Tables

#### `authentication_user` (Custom User)

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | BigAutoField | PK |
| `password` | CharField(128) | NOT NULL |
| `last_login` | DateTime | NULL |
| `is_superuser` | Boolean | default=False |
| `username` | CharField(150) | UNIQUE, NOT NULL |
| `first_name` | CharField(150) | blank |
| `last_name` | CharField(150) | blank |
| `email` | EmailField(254) | blank |
| `is_staff` | Boolean | default=False |
| `is_active` | Boolean | default=True |
| `date_joined` | DateTime | auto_now_add |
| `role` | CharField(10) | choices: admin/teacher, default=teacher |
| `groups` | M2M | to auth.Group |
| `user_permissions` | M2M | to auth.Permission |

#### `task_admin_task` (Defined but UNUSED at runtime)

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | BigAutoField | PK |
| `title` | CharField(60) | NOT NULL |
| `teacher` | FK → User | NULL, related_name='tasks' |
| `admin` | FK → User | NULL, related_name='created_tasks' |
| `priority` | CharField(10) | choices: high/medium/low |
| `date` | DateField | auto_now |
| `description` | CharField(200) | NOT NULL |
| `is_completed` | BooleanField | default=False |

### Relationships

```
User (1) ──< Task (teacher)     # tasks assigned to a teacher
User (1) ──< Task (admin)       # tasks created by an admin
```

### Schema Note

The Task model is fully migrated but the application never writes to or reads from this table via views. All task data exists only in browser `localStorage`.

---

## 8. Integration Points

- **No external APIs** are consumed.
- **No third-party services** are integrated.
- **SweetAlert2** (CDN) is used only in `edit_task.html` for save confirmation dialogs.
- **Google Fonts** (Playfair Display, DM Sans) loaded via `@import` in `style.css`.

---

## 9. Important Files

| File | Why It Matters |
|------|----------------|
| `school_assignment/settings.py` | Core Django configuration: AUTH_USER_MODEL, INSTALLED_APPS, TEMPLATES, LOGIN_URL |
| `authentication/models.py` | Custom User model with `role` field — the foundation of authz |
| `authentication/views.py` | All auth logic + admin page views; central to the execution flow |
| `authentication/forms.py` | RegistrationForm (password validation, unique email) and LoginForm |
| `authentication/urls.py` | Maps all auth + admin routes |
| `teacher/views.py` | Teacher views; the only view that queries the Task model from DB |
| `teacher/urls.py` | Teacher route definitions |
| `task_admin/models.py` | Task model definition (DB schema exists but is unused at runtime) |
| `static/JS/task.js` | The most complex JS file — admin task management hub |
| `static/JS/new_task.js` | Create task form handler; writes to localStorage |
| `static/JS/edit_task.js` | Edit task form handler; reads/writes localStorage |
| `templates/index.html` | Landing page with role-based nav switching |
| `templates/Login_Sign/Signup.html` | Registration UI with role toggle JS |
| `templates/Task_Teacher/TeacherTasks.html` | Teacher dashboard template (stat cards hardcoded to 0) |
| `templates/Task_admin/Dashboard.html` | Admin dashboard template |
| `Pipfile` | Single dependency: Django |

---

## 10. Dependency & Execution Map

```
Pipfile ──> django ──> manage.py ──> settings.py ──> urls.py
                                                       │
                            ┌──────────────────────────┼──────────────────────────┐
                            │                          │                          │
                    authentication/urls.py      teacher/urls.py         admin/ (Django built-in)
                            │                          │
                            ▼                          ▼
                    authentication/views.py     teacher/views.py
                            │                          │
                    ┌───────┼───────┐          ┌───────┼────────┐
                    │       │       │          │       │        │
                    ▼       ▼       ▼          ▼       ▼        ▼
               forms.py models.py templates/  models  templates/
                                             (empty)
```

### Main Execution Path

```
manage.py runserver
  → Django loads settings.py
  → URL dispatcher (urls.py)
  → Request hits authentication/urls.py or teacher/urls.py
  → View function processes request (auth validation, form handling)
  → render() produces HTML with embedded Django template tags
  → Browser loads page, executes JS
  → JS reads/writes localStorage for all task operations
  → No data ever flows back to Django Server for tasks
```

---

## 11. Environment & Setup

### Requirements

- Python 3.13
- Pipenv

### Installation

```bash
pipenv install          # Installs Django
pipenv shell            # Activates virtual environment
cd school_assignment
python manage.py migrate   # Creates SQLite DB + tables
python manage.py runserver # Starts dev server at http://127.0.0.1:8000
```

### Environment Variables

**None.** The `SECRET_KEY` is hardcoded in `settings.py:6`. No `.env` file exists.

---

## 12. Code Quality Review

### ⚠️ Critical Issues

#### 1. **Task Data Lives Only in localStorage (Architectural Fragility)**
All task CRUD operations persist in browser `localStorage`. This means:
- Data is per-device, per-browser — two admins on different machines see different tasks
- Clearing browser cache = complete data loss
- No server-side validation or persistence
- The Django Task model in `task_admin/models.py` is defined, migrated, and completely unused

#### 2. **Admin Views in Wrong App**
`admin_dashboard`, `admin_create_task`, `admin_all_task`, and `admin_edit_task` live in `authentication/views.py` instead of a proper admin/task_admin app. The `task_admin` app has an unused `dashboard_view` and the app's `urls.py` is not even included in the root `urls.py`.

#### 3. **No User Session in localStorage**
The JS code expects `localStorage.getItem("user")` to contain `{username, role, first_name, last_name}`, but **nothing in the codebase ever sets this value**. The Django templates render `{{ user }}` in template tags, but the JS layer never receives the user data. This means admin JS redirects (`window.location.href = "../index.html"`) and teacher name filtering (`completed.js`) will silently fail.

#### 4. **Hardcoded Stat Values in Template**
`TeacherTasks.html` stat cards all show `0` instead of using the Django context variables (`totalassigned`, `totalpending`, `totalcompleted`, `totalhighpriority`) that `teacher/views.py:teacher_tasks` passes.

### Code Smells

- **`Prioirty-task`** — typo in JS/CSS class names (should be `Priority`)
- **`task_prioirty`** — typos in localStorage keys (should be `task_priority`)
- **Duplicate CRUD logic** — `task.js` and `all_task(js).js` contain nearly identical delete/edit/filter logic
- **Mixed architectural approaches** — Django server-rendered auth + localStorage-only task management
- **`createTask_editTask.css`** — hardcoded URLs referencing `createTask_editTask.css` (not `{% static %}`) and JS paths without `{% static %}` tag in `create_task.html`/`edit_task.html`
- **`task_admin/forms.py`** — completely empty file
- **`teacher/models.py`** — empty file; the teacher app has no models

### Security Concerns

- **Hardcoded `SECRET_KEY`** in `settings.py` committed to version control
- **No CSRF on client-side operations** — though localStorage isn't server-facing, any XSS vulnerability would expose all task data
- **`DEBUG = True`** in production config
- **No permission checks** in views beyond `@login_required` — any authenticated user can access admin or teacher URLs directly
- **`is_superuser=True`** is granted to all admin registrations automatically

### Performance Concerns

- For the current scope (localStorage), performance is not a concern
- If migrated to server-side persistence, no pagination or query optimization exists — the `Task` model uses simple `filter()` calls

### Scalability Observations

- localStorage is inherently unscalable (5-10MB limit, single-device)
- No API layer exists — the frontend cannot be decoupled from the backend
- No pagination, search indexing, or caching anywhere

---

## 13. Developer Notes

### Missing Documentation

- No API docs (no API exists)
- No docstrings in any Python function
- No README setup for the Django backend (README describes a static HTML project structure that no longer matches reality)
- No test coverage beyond Django boilerplate (`tests.py` files are empty/default)

### Areas Needing Refactoring

1. **Data Layer** — Move task CRUD from `localStorage` to Django views + database. Create REST API endpoints or server-rendered task management with proper form handling.

2. **App Boundaries** — Move admin views from `authentication/views.py` to `task_admin/views.py` and include `task_admin/urls.py` in the root URL config.

3. **JS Duplication** — Consolidate `task.js` and `all_task(js).js` into a shared module.

4. **Static Asset Paths** — Fix hardcoded CSS/JS references in templates to use `{% static %}` tag consistently.

5. **User Data Bridge** — Pass Django user session data to JavaScript via a data attribute or inline script tag (e.g., `window.user = { "username": "{{ user.username }}", "role": "{{ user.role }}" }`).

6. **Template Context** — Wire up the context variables in `teacher/views.py` to the actual template stat cards in `TeacherTasks.html`.

### Suggested Improvements

| Priority | Improvement |
|----------|-------------|
| P0 | Build server-side task CRUD endpoints using the existing `Task` model |
| P0 | Bridge Django session user data to the JS layer |
| P1 | Add role-based permission checks beyond `@login_required` |
| P1 | Remove duplicated JS CRUD logic |
| P1 | Fix hardcoded `SECRET_KEY` — use environment variables |
| P2 | Add proper test coverage (unit tests for views, forms) |
| P2 | Implement pagination for task listings |
| P2 | Add input sanitization and server-side validation for all task fields |
| P3 | Extract shared CSS into a single design system (reduce 5 CSS files to 2-3) |
| P3 | Add a proper Tailwind CSS or Bootstrap-based UI framework for consistency |

### Architectural Recommendation

The cleanest path forward is to choose **one architecture**:
- **Option A (Server-rendered Django)** — Remove all localStorage JS logic, use Django forms + views for all task CRUD, render everything server-side with template context
- **Option B (SPA + REST API)** — Build a Django REST Framework API for tasks, keep the client-side JS but have it call API endpoints instead of localStorage
- **Hybrid (current, not recommended)** — Keep auth server-side but replace localStorage with fetch/axios calls to Django views that persist to the `Task` model

Option A is the minimal refactor given the existing codebase structure.
