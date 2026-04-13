function applyFilters(){
    const selectedPriority = document.getElementById('filter-priority').value.toLowerCase();
    const ALLTASKS =JSON.parse(localStorage.getItem('all_tasks'))||[];
    let matchedTasks=[];
    for(let i =0;i<ALLTASKS.length;i++){
        const Task = ALLTASKS[i];
        if(selectedPriority===''||Task.task_priority.toLowerCase()==selectedPriority)
            matchedTasks.push(Task);
    }
    DisplayTasks(matchedTasks);
}
function resetFilters(){
    document.getElementById('filter-priority').value='';
    DisplayTasks();
}
function DisplayTasks(FilteredTasks=null){
    let tasks;

    if(FilteredTasks!=null){
        tasks=FilteredTasks;}
    else{
        tasks = JSON.parse(localStorage.getItem("all_tasks")) || [];
    }
    

    const CardBody = document.querySelector('.card-body');
    const emptyState = document.getElementById('empty-state');

    const OldCards = document.querySelectorAll('.taskcards');
    OldCards.forEach(card=>card.remove());

    if(tasks.length==0){
        emptyState.style.display='block';
        return;
    }

    emptyState.style.display='none';
    for(let i = 0;i<tasks.length;i++){
        const Task=tasks[i];

        const CardHTML = `<div class="taskcards">
                        <div class="headerofcard">
                            <span class="priorityoftask priority-${Task.task_priority.toLowerCase()}" >${Task.task_priority}</span>&nbsp;
                            <span id="codeoftask">${Task.task_id}</span>
                        </div><br>
                        <h3 class="nameoftask">${Task.task_title}</h3>
                         <p class="paragraphoftask">Grade all mid-term exam papers for Grade 10 and submit results by Friday.</p>
                         <div id="bottomofcards">
                            <button class="viewdetailsbutton" onclick="openTaskDetails('${Task.task_id}')">View Details</button>&nbsp;
                            <button class="completebutton" onclick="MarkAsCompleted('${Task.task_id}')">✔Complete</button>
                        </div>
                    </div>`
                    CardBody.insertAdjacentHTML('beforeend',CardHTML);
    }
};

    window.onload = function() {
    
    const UserData=JSON.parse(localStorage.getItem("user"));

    const allTasks = JSON.parse(localStorage.getItem('all_tasks')) || [];
    const teachername = document.getElementById('spanteachername');
    const welcomename=document.getElementById('pwelcomemsg');
    const fname= document.getElementById('firstname');
    const lname = document.getElementById('lastname');
    const totalname = document.getElementById('teachern');

    const temail = document.getElementById('email');

    const completedstats=document.getElementById('totaltaskscompleted');
    const pendingstats=document.getElementById('currenttasks');

    if(UserData){
        const FullName = UserData.first_name+" "+UserData.last_name;

        const myTasks = allTasks.filter(task => task.task_teacher === FullName);

        let completedCount = 0;
        let pendingCount = 0;

        for(let i =0;i<myTasks.length;i++){
            if(myTasks[i].task_progress=='Completed'){
                completedCount++;
            }
            else{
                pendingCount++;
            }
        }

        if(teachername){
            teachername.innerText = FullName;}
        if (welcomename){
            welcomename.innerHTML= `Welcome back, ${FullName}! Here are your assigned tasks.`
        }
        if(fname){
            fname.value=UserData.first_name;
        }
        if(lname){
            lname.value=UserData.last_name;
        }

        if(temail){
            temail.value= UserData.email;
        }
        if(totalname){
            totalname.innerText=FullName;
        }
        if(completedstats){
            completedstats.innerText=completedCount;
        }
        if(pendingstats){
            pendingstats.innerText=pendingCount;
        }
    }
    DisplayTasks();
} 

function MarkAsCompleted(taskID){
    let allTasks = JSON.parse(localStorage.getItem('all_tasks')) || [];

    allTasks= allTasks.map(task=>{
        if(task.id_task==taskID){ 
            task.progress='Completed';}
        return task;
    })
    localStorage.setItem('all_tasks', JSON.stringify(allTasks));
    alert("Task marked as completed! 🎉");
    DisplayTasks();

}
function openTaskDetails(taskId) {
    const allTasks = JSON.parse(localStorage.getItem('all_tasks')) || [];
    const task = allTasks.find(t => t.task_id === taskId);
    if (task) {
        localStorage.setItem('selected_task', JSON.stringify(task));
        window.location.href = 'task_details.html';
    }
}

