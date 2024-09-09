let isRunning = false;
let startTime;
let updatedTime;
let timerID;
let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let difference = 0;
let laps = [];
let lastLapTime = 0;

function startStop() {
const startStopBtn = document.getElementById("startStopBtn");
const lapBtn = document.getElementById("lapBtn");

if (!isRunning) {
    isRunning = true;
    startStopBtn.textContent = "Stop";
    lapBtn.disabled = false;
    // Start the timer from the current time minus any difference
    startTime = new Date().getTime() - difference;
    timerID = setInterval(updateTime, 10); // Update every 10 milliseconds
} else {
    isRunning = false;
    startStopBtn.textContent = "Start";
    lapBtn.disabled = true;
    clearInterval(timerID);
    // Save the difference between the current time and the start time
    difference = updatedTime - startTime;
}
}

function updateTime() {
updatedTime = new Date().getTime();
difference = updatedTime - startTime;

  milliseconds = Math.floor((difference % 1000) / 10); // Only 2 decimal places
seconds = Math.floor((difference / 1000) % 60);
  minutes = Math.floor((difference / (1000 * 60)) % 60);
  hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

document.getElementById("display").textContent =
    (hours < 10 ? "0" : "") + hours + ":" +
    (minutes < 10 ? "0" : "") + minutes + ":" +
    (seconds < 10 ? "0" : "") + seconds + ":" +
    (milliseconds < 10 ? "0" : "") + (milliseconds < 100 ? "0" : "") + milliseconds;
}

function recordLap() {
const currentLapTime = difference;
const lapTimeDifference = currentLapTime - lastLapTime;

const lapMilliseconds = Math.floor((lapTimeDifference % 1000) / 10);
const lapSeconds = Math.floor((lapTimeDifference / 1000) % 60);
  const lapMinutes = Math.floor((lapTimeDifference / (1000 * 60)) % 60);
  const lapHours = Math.floor((lapTimeDifference / (1000 * 60 * 60)) % 24);

const lapText =
    (lapHours < 10 ? "0" : "") + lapHours + ":" +
    (lapMinutes < 10 ? "0" : "") + lapMinutes + ":" +
    (lapSeconds < 10 ? "0" : "") + lapSeconds + ":" +
    (lapMilliseconds < 10 ? "0" : "") + (lapMilliseconds < 100 ? "0" : "") + lapMilliseconds;

laps.push(lapText);
lastLapTime = currentLapTime;

displayLaps();
}

function displayLaps() {
const lapsList = document.getElementById("lapsList");
lapsList.innerHTML = "";
laps.forEach((lap, index) => {
    const li = document.createElement("li");
    li.textContent = `Lap ${index + 1}: ${lap}`;
    lapsList.appendChild(li);
});
}

function reset() {
clearInterval(timerID);
isRunning = false;
document.getElementById("startStopBtn").textContent = "Start";
document.getElementById("display").textContent = "00:00:00:000";
document.getElementById("lapBtn").disabled = true;
document.getElementById("lapsList").innerHTML = "";

difference = 0;
hours = 0;
minutes = 0;
seconds = 0;
milliseconds = 0;
laps = [];
lastLapTime = 0;
}
