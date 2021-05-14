let secondsLabel = document.querySelector("#seconds")
let minutesLabel = document.querySelector("#minutes")
let stopBtn = document.querySelector("#stopTimer")
let studyMinutes = document.querySelector("#studySelect")
let form = document.querySelector("form")

let secondsCounter, minutesCounter;
let sec = 0
let mins = 30

stopBtn.addEventListener("click", (e) => {
    e.preventDefault()
    clearInterval(secondsCounter)
})

form.addEventListener("submit", (e) => {
    e.preventDefault()
    timer(mins, sec)
})

studyMinutes.addEventListener("change", (e) => {
    mins = studyMinutes.value
    minutesLabel.innerHTML = `${studyMinutes.value}`
})

function timer(minutes, seconds) {
    secondsCounter = setInterval(myClock, 1000);

    function myClock() {
        if (minutes <= 0 && seconds <= 0) {
            clearInterval(secondsCounter);
        }
        else if (seconds == 0) {
            seconds = 59
            minutes--;
        }
        if (minutes < 10) {
            minutesLabel.innerHTML = `0${minutes}`
        }
        else {
            minutesLabel.innerHTML = `${minutes}`
        }
        if (seconds < 10) {
            secondsLabel.innerHTML = `:0${seconds--}`
        } 
        else {
            secondsLabel.innerHTML = `:${seconds--}`
        }
    }
}