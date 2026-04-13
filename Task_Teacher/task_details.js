window.onload = function () {
    const task = JSON.parse(localStorage.getItem('selected_task'));

    if (!task) {
        alert('No task selected!');
        window.location.href = 'TeacherTasks.html';
        return;
    }

    document.getElementById('task-id').textContent = '#' + task.task_id;
    document.getElementById('task-title').textContent = task.task_title;
    document.getElementById('task-teacher').textContent = task.task_teacher;
    document.getElementById('task-description-text').textContent = task.task_description || 'No description provided.';

    // Priority
    const priorityEl = document.getElementById('task-priority');
    priorityEl.textContent = task.task_priority;
    priorityEl.className = `priority priority-${task.task_priority.toLowerCase()}`;

    // Status
    const statusEl = document.getElementById('task-status');
    statusEl.textContent = task.task_progress;

    
    const statusSelect = document.getElementById('status');
    if (statusSelect) {
        statusSelect.value = task.task_progress.toLowerCase();
    }

    // Update
    document.querySelector('.btn.btn-primary').addEventListener('click', function () {
        const newStatus = statusSelect.value;
        
        let allTasks = JSON.parse(localStorage.getItem('all_tasks')) || [];
        allTasks = allTasks.map(t => {
            if (t.task_id === task.task_id) {
                t.task_progress = newStatus.charAt(0).toUpperCase() + newStatus.slice(1);
            }
            return t;
        });

        localStorage.setItem('all_tasks', JSON.stringify(allTasks));
        
    
        task.task_progress = newStatus.charAt(0).toUpperCase() + newStatus.slice(1);
        localStorage.setItem('selected_task', JSON.stringify(task));
        
        statusEl.textContent = task.task_progress;
        alert('Status updated successfully! ✅');
    });
};