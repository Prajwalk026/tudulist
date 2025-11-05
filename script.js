
document.addEventListener('DOMContentLoaded', () => {
    const tasInput = document.getElementById('task-input');
    const addTaskBtn =document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const emptyImage = document.querySelector('.Image-empty');
    const todosContainer = document.querySelector('.todos-container')
    const progressbar = document.getElementById('progress');
    const progressnumber = document.getElementById('numbers');

    const toggleEmptyState = () => {
        emptyImage.style.display = taskList.children.length === 0 ? 'block' : 'none';
        todosContainer.style.width = taskList.children.length > 0 ? '100%' : '50%' ;
    };

    const updateprogress = (checkcompletion = true) =>
    {
        const totalTasks = taskList.children.length;
        const completedTasks = taskList.querySelectorAll('.checkbox:checked').length

        progressbar.style.width = totalTasks ? `${(completedTasks / totalTasks) * 100}%`:'0%';
        progressnumber.textContent = `${completedTasks} / ${totalTasks}` ;

        if(checkcompletion && totalTasks > 0 && 
            completedTasks === totalTasks) {
                Confetti();
            }

    };
    
    
    const addTask = (text, completed = false, 
        checkcompletion = true) => {
        const taskText = text || tasInput.value.trim();
        if(!taskText){
            return;
        }

        const li = document.createElement('li'); 
        li.innerHTML = `
        <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''} /><span>${taskText}</span><div class="task-buttons">
        <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
        <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
        </div>
        `;

        const checkbox = li.querySelector('.checkbox');
        const editbtn = li.querySelector('.edit-btn');

        if(completed) {
            li.classList.add('completed');
            editbtn.disabled = true;
            editbtn.style.opacity = '0.5';
            editbtn.style.pointerEvents = 'none';
        }

        checkbox.addEventListener('change', () => {
            const isChecked = checkbox.checked;
            li.classList.toggle('completed', isChecked);
            editbtn.disabled = isChecked;
            editbtn.style.opacity = isChecked ? '0.5' : '1';
            editbtn.style.pointerEvents = isChecked ? 'none' : 'auto';
            updateprogress();
        });

        editbtn.addEventListener('click', () => { 
            if(!checkbox.checked) {
                tasInput .value = li.querySelector
                ('span').textContent;
                li.remove();
                toggleEmptyState();
                updateprogress(false);
            }
        });


        li.querySelector('.delete-btn').addEventListener('click', () => { 
            li.remove();   
            toggleEmptyState();
            updateprogress(); 
        });
        


        
        taskList.appendChild(li);
        tasInput.value= '';
        toggleEmptyState();
        updateprogress(checkcompletion);
    };

    addTaskBtn.addEventListener('click', () => addTask());
    tasInput.addEventListener('keypress', (e) =>  {
        if(e.key === 'Enter') { 
            e.preventDefault();
                addTask();
        }
    });

});

const Confetti = () => {

    const duration = 15 * 1000,
  animationEnd = Date.now() + duration,
  defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

const interval = setInterval(function() {
  const timeLeft = animationEnd - Date.now();

  if (timeLeft <= 0) {
    return clearInterval(interval);
  }

  const particleCount = 50 * (timeLeft / duration);

  // since particles fall down, start a bit higher than random
  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    })
  );
  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    })
  );
}, 250);
}

