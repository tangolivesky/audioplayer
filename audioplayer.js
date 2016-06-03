/**
 * Created by tony on 2016/6/3.
 */

var AudioPlayer = (function () {
    function AudioPlayer(cfg) {

        var config = cfg || {};
        var duration;
        var myAudioPlayer = document.createElement("div");
        var audioPlayer = document.createElement("audio");
        var playButton = document.createElement("button");
        var timeLine = document.createElement("div");
        var timeProgressBar = document.createElement("span");
        var playhead = document.createElement("div");
        var currentTime = document.createElement("div");
        var timelineWidth;

        this.myAudioPlayer = myAudioPlayer;


        myAudioPlayer.className = "audioplayer";
        playButton.className = "playbutton play";
        timeLine.className = "timeline";
        timeProgressBar.className = "time-progress-bar";
        playhead.className = "playhead";
        currentTime.className = "current-time";
        if (config.hasOwnProperty("audio")) {
            if (config.audio.hasOwnProperty("src"))audioPlayer.setAttribute('src', config.audio.src);
        }
        audioPlayer.setAttribute('controls', 'controls');
        audioPlayer.style.display = "none";

        myAudioPlayer.appendChild(playButton);
        timeLine.appendChild(timeProgressBar);
        timeLine.appendChild(playhead);
        myAudioPlayer.appendChild(timeLine);
        myAudioPlayer.appendChild(audioPlayer);

        timelineWidth = timeLine.offsetWidth - playhead.offsetWidth;


        playButton.addEventListener('click', play, false);
        audioPlayer.addEventListener("timeupdate", timeUpdate, false);
        // Gets audio file duration
        audioPlayer.addEventListener("canplaythrough", function () {
            duration = audioPlayer.duration;
        }, false);



        //Play and Pause
        function play() {
            // start music
            if (audioPlayer.paused) {
                audioPlayer.play();
                // remove play, add pause
                playButton.className = "";
                playButton.className = "playbutton pause";
            } else { // pause music
                audioPlayer.pause();
                // remove pause, add play
                playButton.className = "";
                playButton.className = "playbutton play";
            }
        }

        function timeUpdate(){
            var playPercent = audioPlayer.currentTime / duration;
            var playPercentWidth = timelineWidth*(playPercent);
            //currentTime[0].innerHTML = audioPlayer.currentTime;
            playhead.style.marginLeft = playPercentWidth + "px";
            timeProgressBar.style.width = playPercent*100 + "%";
            if (playPercentWidth.currentTime == duration) {
                playButton.className = "";
                playButton.className = "playbutton play";
            }
        }

    }

    AudioPlayer.prototype.getAudioPlayer = function () {
        return this.myAudioPlayer;
    };

    return AudioPlayer;
})();



// function audioPlayer(cfg){
//
//     var config = cfg || {};
//     var myAudioPlayer = document.createElement("div");
//     var audioPlayer = document.createElement("audio");
//     var playButton = document.createElement("button");
//     var timeLine = document.createElement("div");
//     var timeProgressBar = document.createElement("span");
//     var playhead = document.createElement("div");
//     var currentTime = document.createElement("div");
//
//     this.initMyAudioPlayer = function () {
//
//         myAudioPlayer.className = "audioplayer";
//
//         playButton.className = "playbutton play";
//
//         timeLine.className = "timeline";
//
//         timeProgressBar.className = "time-progress-bar";
//
//         playhead.className = "playhead";
//
//         currentTime.className = "current-time";
//
//         if(config.hasOwnProperty("audio")) {
//             if(config.audio.hasOwnProperty("src"))audioPlayer.setAttribute('src',config.audio.src);
//         }
//         audioPlayer.setAttribute('controls', 'controls');
//         audioPlayer.style.display = "none";
//
//
//         myAudioPlayer.appendChild(playButton);
//         timeLine.appendChild(timeProgressBar);
//         timeLine.appendChild(playhead);
//         myAudioPlayer.appendChild(timeLine);
//         myAudioPlayer.appendChild(audioPlayer);
//
//         //audioPlayer.load();
//         //audioPlayer.play();
//
//         playButton.addEventListener('click',play,false);
//     };
//
//     //Play and Pause
//     var play =function() {
//         // start music
//         if (audioPlayer.paused) {
//             audioPlayer.play();
//             // remove play, add pause
//             playButton.className = "";
//             playButton.className = "playbutton pause";
//         } else { // pause music
//             audioPlayer.pause();
//             // remove pause, add play
//             playButton.className = "";
//             playButton.className = "playbutton play";
//         }
//     }
//
//
//     this.getAudioPlayer = function () {
//         return myAudioPlayer;
//     }
//
//
//
//     //initMyAudioPlayer();
//
// }

//     window.audioPlayer = audioPlayer;
//
// })(window);