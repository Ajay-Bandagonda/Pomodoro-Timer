let timerLabel = document.querySelector("#timer")
let startBtn = document.querySelector("#startTimer")
let stopBtn = document.querySelector("#stopTimer")
let form = document.querySelector("form")

let myTimer;
let seconds = 15
let minutes = 1

stopBtn.addEventListener("click", (e) => {
    e.preventDefault()
    clearInterval(myTimer)
})

form.addEventListener("submit", (e) => {
    e.preventDefault()
    clock()
})

function clock() {
    myTimer = setInterval(myClock, 1000);

    function myClock() {
        if (minutes <= 0 && seconds <= 0) {
            clearInterval(myTimer);
        }
        else if (seconds == 0) {
            seconds = 59
        }
        if (seconds < 10) {
            timerLabel.innerHTML = `00:0${seconds--}`
        } 
        else {
            timerLabel.innerHTML = `00:${seconds--}`
        }
    }
}