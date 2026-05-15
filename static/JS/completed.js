const allTasks = JSON.parse(localStorage.getItem('all_tasks') || '[]');
const UserData = JSON.parse(localStorage.getItem("user"));
const FullName = UserData ? (UserData.first_name + " " + UserData.last_name).trim().toLowerCase() : "";
const myTasks = allTasks.filter(t => t.task_teacher.trim().toLowerCase() === FullName);
const completed = myTasks.filter(t => t.task_progress === 'Completed');
const pending = myTasks.filter(t => t.task_progress === 'Pending');

document.getElementById('stat-done').textContent = completed.length;
document.getElementById('stat-pending').textContent = pending.length;
const rate = myTasks.length > 0 ? Math.round((completed.length / myTasks.length) * 100) : 0;
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
        <td><span class="badge badge-${t.task_prioirty.toLowerCase()}">${t.task_prioirty}</span></td>
        <td style="font-size:0.85rem;">${t.task_date ? new Date(t.task_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}</td>
        <td style="font-size:0.85rem;color:var(--green);">${t.task_completed_at? new Date(t.task_completed_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }): '—'}</td>
        <td>${t.task_admin}</td>
        <td><button class="btn btn-outline btn-sm" onclick="openTaskDetails('${t.task_id}')">View →</button></td>
      `;
        tbody.appendChild(tr);
    });
}
