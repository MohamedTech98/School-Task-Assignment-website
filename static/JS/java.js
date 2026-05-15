function applyFilters() {
    const selectedPriority = document.getElementById('filter-priority').value.toLowerCase();
    const taskcards = document.querySelectorAll('.task-item');

    taskcards.forEach(card => {
        const task_priority = card.getAttribute('data-priority').toLowerCase();
        if (selectedPriority === '' || task_priority === selectedPriority) {
            card.style.display = 'block';  
        } else {
            card.style.display = 'none';   
        }
    });
}

function resetFilters() {
    document.getElementById('filter-priority').value = '';
    const taskcards = document.querySelectorAll('.task-item');
    taskcards.forEach(card => {
        card.style.display = 'block';  
    });
}