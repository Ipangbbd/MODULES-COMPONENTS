const display = document.getElementById('timerDisplay');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');

let timeInterval;
let seconds = 0;
let miliseconds = 0;

function TimeFormat() {
    let secondsString = seconds.toString().padStart(3, '0');
    let milisecondsString = miliseconds.toString().padStart(2, '0');
    return `${secondsString} : ${milisecondsString}`;
}

function UpdateTime() {
    miliseconds++;
    if (miliseconds === 100) {
        miliseconds = 0;
        seconds++;
    }

    if (seconds === 999.59) {
        seconds = 0;
        alert('udah max kocak');
    }

    display.textContent = TimeFormat();
}

startBtn.addEventListener('click', () => {
    if (!timeInterval) {
        timeInterval = setInterval(UpdateTime, 10);
    }
});

stopBtn.addEventListener('click', () => {
    clearInterval(timeInterval);
    timeInterval = null;
});

resetBtn.addEventListener('click', () => {
    clearInterval(timeInterval);
    timeInterval = null;
    seconds = 0;
    miliseconds = 0;
    display.textContent = TimeFormat();
});