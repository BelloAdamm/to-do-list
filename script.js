let tasks = JSON.parse(localStorage.getItem("myTasks")) || [];

const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");
const taskCount = document.getElementById("taskCount");
const completedCount = document.getElementById("completedCount");


// ADD TASK
addTaskBtn.addEventListener("click", function () {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    const task = {
        id: Date.now(),
        text: text,
        date: taskDate.value,
        completed: false
    };

    tasks.push(task);

    saveTasks();
    displayTasks();

    // Clear inputs
    taskInput.value = "";
    taskDate.value = "";

});


// SAVE TASKS
function saveTasks() {
    localStorage.setItem("myTasks", JSON.stringify(tasks));
}


// DISPLAY TASKS
function displayTasks() {

    taskList.innerHTML = "";

    if (tasks.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }

    let completed = 0;

    tasks.forEach(function (task) {

        if (task.completed) {
            completed++;
        }

        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }


        // CHECK BUTTON
        const checkButton = document.createElement("button");

        checkButton.className = "check-btn";
        checkButton.textContent = task.completed ? "✓" : "";

        checkButton.addEventListener("click", function () {
            toggleTask(task.id);
        });


        // TASK CONTENT
        const taskContent = document.createElement("div");

        taskContent.className = "task-content";


        const taskText = document.createElement("div");

        taskText.className = "task-text";
        taskText.textContent = task.text;

        taskContent.appendChild(taskText);


        // DATE
        if (task.date) {

            const date = document.createElement("div");

            date.className = "task-date";

            date.textContent =
                "⏰ " + new Date(task.date).toLocaleString();

            taskContent.appendChild(date);
        }


        // DELETE BUTTON
        const deleteButton = document.createElement("button");

        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {
            deleteTask(task.id);
        });


        li.appendChild(checkButton);
        li.appendChild(taskContent);
        li.appendChild(deleteButton);

        taskList.appendChild(li);

    });


    taskCount.textContent = tasks.length;
    completedCount.textContent = completed + " completed";
}


// COMPLETE TASK
function toggleTask(id) {

    tasks = tasks.map(function (task) {

        if (task.id === id) {
            task.completed = !task.completed;
        }

        return task;

    });

    saveTasks();
    displayTasks();
}


// DELETE TASK
function deleteTask(id) {

    tasks = tasks.filter(function (task) {
        return task.id !== id;
    });

    saveTasks();
    displayTasks();
}


// PRESS ENTER TO ADD
taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        addTaskBtn.click();
    }

});


// LOAD SAVED TASKS
displayTasks();
