class Timer {
    constructor(duration, callback) {
        this.duration = duration;
        this.callback = callback;
        this.timerId = null;
    }

    start() {
        this.timerId = setInterval(() => {
            this.duration--;
            if (this.duration <= 0) {
                this.stop();
                this.callback();
            }
        }, 1000);
    }

    stop() {
        clearInterval(this.timerId);
    }
}

// Example usage
const timer = new Timer(60, () => {
    console.log("Timer finished!");
});

timer.start();