function applyFilters() {
    const selectedPriority = document.getElementById('filter-priority').value.toLowerCase();

    const UserData = JSON.parse(localStorage.getItem("user"));
    const FullName = UserData
        ? (UserData.first_name + " " + UserData.last_name).trim().toLowerCase()
        : "";

    const allTasks = JSON.parse(localStorage.getItem('all_tasks')) || [];

    let myTasks = allTasks.filter(t => t.task_teacher.trim().toLowerCase() === FullName);

    let matchedTasks = [];
    for (let i = 0; i < myTasks.length; i++) {
        const Task = myTasks[i];
        if (selectedPriority === '' || Task.task_prioirty.toLowerCase() == selectedPriority)
            matchedTasks.push(Task);
    }

    DisplayTasks(matchedTasks);
}

function resetFilters() {
    document.getElementById('filter-priority').value = '';
    DisplayTasks();
}

function DisplayTasks(FilteredTasks = null) {
    let tasks;

    const UserData = JSON.parse(localStorage.getItem("user"));
    const FullName = UserData
        ? (UserData.first_name + " " + UserData.last_name).trim().toLowerCase()
        : "";

    if (FilteredTasks != null) {
        tasks = FilteredTasks;
    } else {
        const allTasks = JSON.parse(localStorage.getItem("all_tasks")) || [];
        tasks = allTasks.filter(t => t.task_teacher.trim().toLowerCase() === FullName);
    }

    const CardBody = document.querySelector('.card-body');
    const emptyState = document.getElementById('empty-state');

    const OldCards = document.querySelectorAll('.taskcards');
    OldCards.forEach(card => card.remove());

    if (tasks.length == 0) {
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';

    for (let i = 0; i < tasks.length; i++) {
        const Task = tasks[i];
        const CardHTML = `
        <div class="taskcards">
            <div class="headerofcard">
                <span class="priorityoftask priority-${Task.task_prioirty.toLowerCase()}">${Task.task_prioirty}</span>
                &nbsp;
                <span>${Task.task_id}</span>
            </div>
            <br>
            <h3 class="nameoftask">${Task.task_title}</h3>
            <p class="paragraphoftask">${Task.task_description || 'No description provided.'}</p>
            <div id="bottomofcards">
                <button class="viewdetailsbutton" onclick="openTaskDetails('${Task.task_id}')">View Details</button>
                &nbsp;
                <button class="completebutton" onclick="MarkAsCompleted('${Task.task_id}')">✔ Complete</button>
            </div>
        </div>`;
        CardBody.insertAdjacentHTML('beforeend', CardHTML);
    }
}

window.onload = function () {
    const UserData = JSON.parse(localStorage.getItem("user"));
    const allTasks = JSON.parse(localStorage.getItem('all_tasks')) || [];

    const teachername    = document.getElementById('spanteachername');
    const welcomename    = document.getElementById('pwelcomemsg');
    const fname          = document.getElementById('firstname');
    const lname          = document.getElementById('lastname');
    const totalname      = document.getElementById('teachern');
    const temail         = document.getElementById('email');
    const completedstats = document.getElementById('totaltaskscompleted');
    const pendingstats   = document.getElementById('currenttasks');

    if (UserData) {
        const FullName = UserData.first_name + " " + UserData.last_name;

        const myTasks = allTasks.filter(task =>
            task.task_teacher.trim().toLowerCase() === FullName.trim().toLowerCase()
        );

        let completedCount = 0;
        let pendingCount = 0;

        for (let i = 0; i < myTasks.length; i++) {
            if (myTasks[i].task_progress === 'Completed') completedCount++;
            else pendingCount++;
        }

        if (teachername)    teachername.innerText = FullName;
        if (welcomename)    welcomename.innerHTML = `Welcome back, ${FullName}! Here are your assigned tasks.`;
        if (fname)          fname.value = UserData.first_name;
        if (lname)          lname.value = UserData.last_name;
        if (temail)         temail.value = UserData.email;
        if (totalname)      totalname.innerText = FullName;
        if (completedstats) completedstats.innerText = completedCount;
        if (pendingstats)   pendingstats.innerText = pendingCount;
    }
    UpdateDashboardStats();

    if (window.location.pathname.toLowerCase().includes('teachertasks')) {
        DisplayTasks();
    }
};

function MarkAsCompleted(taskID) {
    let allTasks = JSON.parse(localStorage.getItem('all_tasks')) || [];

    allTasks = allTasks.map(task => {
        if (task.task_id == taskID) {
            task.task_progress = 'Completed';
            task.task_completed_at = new Date().toISOString();
        }
        return task;
    });

    localStorage.setItem('all_tasks', JSON.stringify(allTasks));
    alert("Task marked as completed! 🎉");
    DisplayTasks();
    UpdateDashboardStats();
}

function openTaskDetails(taskId) {
    const allTasks = JSON.parse(localStorage.getItem('all_tasks')) || [];
    const task = allTasks.find(t => t.task_id === taskId);
    if (task) {
        localStorage.setItem('selected_task', JSON.stringify(task));
        window.location.href = 'task_details.html';
    }
}
function UpdateDashboardStats() {
    const allTasks = JSON.parse(localStorage.getItem('all_tasks')) || [];
    const UserData = JSON.parse(localStorage.getItem("user"));
    
    if (!UserData) return;

    const FullName = (UserData.first_name + " " + UserData.last_name).trim().toLowerCase();


    const myTasks = allTasks.filter(t => t.task_teacher.trim().toLowerCase() === FullName);


    const totalAssigned = myTasks.length;
    const pendingCount  = myTasks.filter(t => t.task_progress !== 'Completed').length;
    const completedCount = myTasks.filter(t => t.task_progress === 'Completed').length;
    const highPriorityCount = myTasks.filter(t => t.task_prioirty === 'High').length;


    if(document.getElementById('TotalCounting')) 
        document.getElementById('TotalCounting').innerText = totalAssigned;
    
    if(document.getElementById('PendingCounting')) 
        document.getElementById('PendingCounting').innerText = pendingCount;
    
    if(document.getElementById('CompletedCounting')) 
        document.getElementById('CompletedCounting').innerText = completedCount;
    
    if(document.getElementById('HighCounting')) 
        document.getElementById('HighCounting').innerText = highPriorityCount;
}