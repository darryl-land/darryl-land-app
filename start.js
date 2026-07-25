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


const { exec } = require('child_process');



nw.Window.open('index.html', {}, function(win) {});


global.downloadyt = function(urlthing, sblockk, subb) {
    console.log(urlthing + sblockk)
    let cmdd = './yt-dlp_linux -P "~/Videos" ';
    if (sblockk) {
        cmdd += '--sponsorblock-remove default ';
    };
    if (subb){
        cmdd += '--write-auto-subs --sub-lang en --embed-subs ';
    };
    cmdd += urlthing
    console.log(cmdd)
    exec(cmdd, { shell: '/bin/bash' },(error, stdout, stderr) => {
        if (error) {
            console.error(error.message);
            return;
        }
        if (stderr) {
            console.warn(stderr);
            return;
        }
        console.log(stdout);
    });
}

exec('./yt-dlp_linux -U', { shell: '/bin/bash' }, (err, stdout, stderr) => {
    if (err) {
        console.error(`Error: ${err}`);
        return;
    }
    console.log(`Output: ${stdout}`);
});



