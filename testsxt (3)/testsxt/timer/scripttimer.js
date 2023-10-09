document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task");
    const durationInput = document.getElementById("duration");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        const duration = parseInt(durationInput.value, 10);

        if (taskText !== "" && !isNaN(duration) && duration > 0) {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${taskText} (Duration: ${duration} min)</span>
                <span id="countdown">${duration}:00</span>
                <button class="delete-button">Delete</button>
            `;
            taskList.appendChild(li);
            taskInput.value = "";
            durationInput.value = "";

            // Start the countdown timer and show notification when time ends
            startCountdownTimer(duration, taskText, li);
        }
    });

    taskList.addEventListener("click", function (e) {
        if (e.target.classList.contains("delete-button")) {
            e.target.parentElement.remove();
        }
    });

    function startCountdownTimer(duration, taskText, listItem) {
        let timer = duration * 60; // Convert minutes to seconds
        const countdownElement = listItem.querySelector("#countdown");

        const interval = setInterval(function () {
            const minutes = Math.floor(timer / 60);
            const seconds = timer % 60;
            countdownElement.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

            if (--timer < 0) {
                clearInterval(interval);
                countdownElement.textContent = "00:00";

                const notificationTitle = "Task Completed";
                const notificationOptions = {
                    body: `Your task "${taskText}" has completed!`,
                    icon: "icon.png"
                };

                if (Notification.permission === "granted") {
                    new Notification(notificationTitle, notificationOptions);
                } else if (Notification.permission !== "denied") {
                    Notification.requestPermission().then(function (permission) {
                        if (permission === "granted") {
                            new Notification(notificationTitle, notificationOptions);
                        }
                    });
                }
            }
        }, 1000); // Update every second
    }
});

const body = document.querySelector('body');

body.addEventListener('mousemove', (e) => {
    const xOffset = Math.min(Math.max((window.innerWidth / 2 - e.pageX) / 20, -50), 50);
    const yOffset = Math.min(Math.max((window.innerHeight / 2 - e.pageY) / 20, -50), 50);
    body.style.backgroundPosition = `${xOffset}px ${yOffset}px`;
});
