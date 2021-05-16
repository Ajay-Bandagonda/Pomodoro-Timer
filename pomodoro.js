let secondsLabel = document.querySelector("#seconds")
let minutesLabel = document.querySelector("#minutes")
let stopBtn = document.querySelector("#stopTimer")
let studyMinutes = document.querySelector("#studySelect")
let sessionType = document.querySelector("#sessionType")
let form = document.querySelector("form")

let secondsCounter;
let sec = 0
let mins = 30

class Timer {
    constructor(minutes, seconds, minutesLabel, secondsLabel, sessionLabel, sessionType = 'study') {
        this.minutes = minutes;
        this.seconds = seconds;
        this.secondsLabel = secondsLabel
        this.minutesLabel = minutesLabel
        this.sessionType = sessionType
        this.sessionLabel = sessionLabel
        this.isFinished = false
    }
    start() {
        this.timer = setInterval(() => {
            if (this.minutes <= 0 && this.seconds <= 0) {
                this.stop()
                this.isFinished = true
            }
            else if (this.seconds == 0) {
                this.seconds = 59
                if (this.minutes > 0) {
                    this.minutes--;
                }
            }
            if (this.minutes < 10) {
                this.minutesLabel.innerHTML = `0${this.minutes}`
            }
            else {
                this.minutesLabel.innerHTML = `${this.minutes}`
            }
            if (this.seconds < 10) {
                this.secondsLabel.innerHTML = `:0${this.seconds--}`
            } 
            else {
                this.secondsLabel.innerHTML = `:${this.seconds--}`
            }
        }, 1000);
        this.setMessage()
    }
    stop(){
        clearInterval(this.timer)
    }
    setMessage(){
        if (this.sessionType === 'break') {
            this.sessionLabel.innerText = "Enjoy your short break!"
        }
        else {
            this.sessionLabel.innerText = "Study Session in progress! Focus!!"
        }
    }
}

var timer = new Timer(0, 5, minutesLabel, secondsLabel, sessionType)

stopBtn.addEventListener("click", (e) => {
    e.preventDefault()
    timer.stop()
})

form.addEventListener("submit", (e) => {
    e.preventDefault()
    //timer(0, 5)
    
    timer.start()
})

studyMinutes.addEventListener("change", (e) => {
    mins = studyMinutes.value
    minutesLabel.innerHTML = `${studyMinutes.value}`
})

/*const timer = (minutes, seconds=0) => {
    secondsCounter = setInterval(myClock, 1000);
    let isBreak = false;

    function myClock() {
        if (minutes <= 0 && seconds <= 0) {
            if (isBreak) {
                clearInterval(secondsCounter);
            }
            else{
                minutes = 1
                seconds = 0
                isBreak = true
            }
        }
        if (seconds == 0) {
            seconds = 59
            if (minutes > 0) {
                minutes--;
            }
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
        if (isBreak) {
            sessionType.innerText = "Enjoy your short break!"
        } 
        else {
            sessionType.innerText = "Study Session in progress! Focus!!"
        }
    }
}*/