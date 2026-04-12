const allTasks = JSON.parse(localStorage.getItem('all_tasks') || '[]');
const completed = allTasks.filter(t => t.task_progress === 'Completed');
const pending = allTasks.filter(t => t.task_progress === 'Pending');


document.getElementById('stat-done').textContent = completed.length;
document.getElementById('stat-pending').textContent = pending.length;
const rate = allTasks.length > 0 ? Math.round((completed.length / allTasks.length) * 100) : 0;
document.getElementById('stat-rate').textContent = rate + '%';

if (completed.length >= 3) {
    document.getElementById('celebration').style.display = 'flex';
}

if (completed.length === 0) {
    document.getElementById('completed-table').style.display = 'none';
    document.getElementById('empty-state').style.display = 'block';
} else {
    const tbody = document.getElementById('completed-tbody');

    completed.forEach(t => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td><code style="font-size:0.8rem;color:var(--text-muted)">#${t.task_id}</code></td>
        <td style="font-weight:500;">${t.task_title}</td>
        <td><span class="badge badge-${t.task_prioirty}">${t.task_prioirty}</span></td>
        <td style="font-size:0.85rem;">—</td>
        <td style="font-size:0.85rem;color:var(--green);">${t.task_teacher}</td>
        <td>${t.task_admin}</td>
        <td><a href="teacher-task-detail.html?id=${t.task_id}" class="btn btn-outline btn-sm">View →</a></td>
      `;
        tbody.appendChild(tr);
    });
}
