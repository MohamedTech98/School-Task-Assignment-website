function applyFilters() {
    const selectedPriority = document.getElementById('filter-priority').value.toLowerCase();

    const taskcards = document.querySelectorAll('.task-item');

    taskcards.forEach(card=>{
        const task_prioirty = card.getAttribute('data-priority').toLowerCase();
        if(selectedPriority==''||task_prioirty===selectedPriority){
            card.style.dispaly='block';
        }
        else{
           card.style.dispaly='none'; 
        }
    });
}

function resetFilters() {
    document.getElementById('filter-priority').value = '';
    const taskcards = document.querySelectorAll('.task-item')
    taskcards.forEach(card=>{
        card.style.dispaly='block';
    });
}
