let minutes = 0, seconds = 0, milliseconds = 0, interval;
let running = false;

const minuteDisplay = document.getElementById("minutes");
const secondDisplay = document.getElementById("seconds");
const milliDisplay = document.getElementById("milliseconds");
const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapList = document.getElementById("laps");

function updateDisplay() {
    minuteDisplay.innerText = String(minutes).padStart(2, '0');
    secondDisplay.innerText = String(seconds).padStart(2, '0');
    milliDisplay.innerText = String(milliseconds).padStart(2, '0');
}

function startPauseTimer() {
    if (!running) {
        interval = setInterval(() => {
            milliseconds++;
            if (milliseconds >= 100) {
                milliseconds = 0;
                seconds++;
            }
            if (seconds >= 60) {
                seconds = 0;
                minutes++;
            }
            updateDisplay();
        }, 10);
        startPauseBtn.innerText = "Pause";
        startPauseBtn.style.background = "#ffc107";
    } else {
        clearInterval(interval);
        startPauseBtn.innerText = "Start";
        startPauseBtn.style.background = "#28a745";
    }
    running = !running;
}

function resetTimer() {
    clearInterval(interval);
    minutes = seconds = milliseconds = 0;
    running = false;
    updateDisplay();
    startPauseBtn.innerText = "Start";
    startPauseBtn.style.background = "#28a745";
    lapList.innerHTML = "";
}

function addLap() {
    if (running) {
        let lapTime = `${minuteDisplay.innerText}:${secondDisplay.innerText}:${milliDisplay.innerText}`;
        let lapItem = document.createElement("li");
        lapItem.innerText = `Lap ${lapList.children.length + 1}: ${lapTime}`;
        lapList.appendChild(lapItem);
    }
}

startPauseBtn.addEventListener("click", startPauseTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", addLap);
