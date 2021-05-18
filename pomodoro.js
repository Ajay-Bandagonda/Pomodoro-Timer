let secondsLabel = document.querySelector("#seconds")
let minutesLabel = document.querySelector("#minutes")
let startBtn = document.querySelector("#startTimer")
let stopBtn = document.querySelector("#stopTimer")
let studyMinutes = document.querySelector("#studySelect")
let breakMinutes = document.querySelector("#breakSelect")
let sessionType = document.querySelector("#sessionType")
let sessionsSelect = document.querySelector("#sessionsSelect")
let form = document.querySelector("form")

let secondsCounter;
let mins = 1;

class Timer {
    constructor(minutes, minutesLabel, secondsLabel, sessionLabel, sessionType = 'study') {
        this.minutes = minutes;
        this.seconds = 0;
        this.secondsLabel = secondsLabel
        this.minutesLabel = minutesLabel
        this.sessionType = sessionType
        this.sessionLabel = sessionLabel
        this.finishedTimeout = null
        this.timeRemaining = (this.minutes * 60000) + (this.seconds * 1000) + 1000
    }
    start() {
        this.timer = setInterval(() => {
            if (this.minutes <= 0 && this.seconds <= 0) {
                this.stop()
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
        studyMinutes.disabled = false
        breakMinutes.disabled = false;
        sessionsSelect.disabled = false;
        startBtn.disabled = false;
        stopBtn.disabled = true;
    }
    setMessage(){
        if (this.sessionType === 'break') {
            this.sessionLabel.innerText = "Enjoy your short break!"
        }
        else {
            this.sessionLabel.innerText = "Study Session in progress! Focus!!"
        }
    }
    inMilliseconds(){
        return (this.minutes * 60000) + (this.seconds * 1000) + 1000
    }
    async isFinished(){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let audio = new Audio('Alarm-sound-effect.mp3');
                audio.play()
                console.log(this.sessionType + " timer finished");
                resolve("Timer promise resolved");
            }, this.inMilliseconds());
        })
    }
}

let timer;

stopBtn.addEventListener("click", (e) => {
    e.preventDefault()
    timer.stop()
})

form.addEventListener("submit", async (e) => {
    e.preventDefault()

    min = parseInt(studyMinutes.value)
    let breakMin = parseInt(breakMinutes.value)
    let numSessions = parseInt(sessionsSelect.value)

    studyMinutes.disabled = true
    breakMinutes.disabled = true;
    sessionsSelect.disabled = true;
    startBtn.disabled = true;
    stopBtn.disabled = false

    if (numSessions > 1) {
        for (let i = 0; i < numSessions - 1; i++) {
            timer = new Timer(mins, minutesLabel, secondsLabel, sessionType)
            timer.start()
            await timer.isFinished()
            let breakTimer = new Timer(breakMin, minutesLabel, secondsLabel, sessionType, "break")
            breakTimer.start()
            await breakTimer.isFinished()
        }
    } 

    let finalTimer = new Timer(mins, minutesLabel, secondsLabel, sessionType)
    finalTimer.start()
    sessionType.innerText = "Final Study Session! Make it count!!"
    await finalTimer.isFinished()
    sessionType.innerText = "Good Job on staying focused! Enjoy the rest of your day!"
    studyMinutes.disabled = false
    breakMinutes.disabled = false;
    sessionsSelect.disabled = false;
    startBtn.disabled = false;
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