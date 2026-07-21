
global.timert = {
    msRemaining: 0,
    targetTime: null,
    runing: false
};

let countdownTicker = null;

global.startCountdown = function(durationInSeconds) {
    if (global.timert.runing) return;

    global.timert.runing = true;
    global.timert.targetTime = Date.now() + (durationInSeconds * 1000);

    countdownTicker = setInterval(() => {
        let diff = global.timert.targetTime - Date.now();

        if (diff <= 0) {
            global.timert.msRemaining = 0;
            global.timert.runing = false;
            clearInterval(countdownTicker);
        } else {
            global.timert.msRemaining = diff;
        }
    }, 100);
};

global.stopCountdown = function() {
    clearInterval(countdownTicker);
    global.timert.runing = false;
    global.timert.msRemaining = 0;
};

nw.Window.open('index.html', {}, function(win) {});
