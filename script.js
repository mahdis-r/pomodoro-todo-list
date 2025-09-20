// Pomodoro Timer Logic
const timerDisplay = document.getElementById('timer-display');
const startButton = document.getElementById('start-button');

let countdown;
const pomodoroDuration = 25 * 60; // 25 minutes in seconds
let timeRemaining = pomodoroDuration;

function startTimer() {
    if (countdown) {
        clearInterval(countdown);
    }

    const now = Date.now();
    const then = now + timeRemaining * 1000;

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft < 0) {
            clearInterval(countdown);
            timerDisplay.textContent = "00:00";
            alert("Pomodoro session finished!");
            return;
        }
        timeRemaining = secondsLeft;
        displayTimeLeft(secondsLeft);
    }, 1000);

    startButton.textContent = "Pause";
    startButton.removeEventListener('click', startTimer);
    startButton.addEventListener('click', pauseTimer);
}

function pauseTimer() {
    clearInterval(countdown);
    startButton.textContent = "Resume";
    startButton.removeEventListener('click', pauseTimer);
    startButton.addEventListener('click', startTimer);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    timerDisplay.textContent = display;
}

startButton.addEventListener('click', startTimer);

// To-Do List Logic
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task-button');
const tasksContainer = document.getElementById('tasks-container');

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert("Please enter a task.");
        return;
    }

    const li = document.createElement('li');
    li.textContent = taskText;

    // Toggle 'completed' class on click
    li.addEventListener('click', () => {
        li.classList.toggle('completed');
    });

    tasksContainer.appendChild(li);
    taskInput.value = ''; // Clear the input field
}

addTaskButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});