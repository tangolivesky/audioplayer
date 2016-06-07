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
        var volumeLine = document.createElement("div");
        var volumeLineBar = document.createElement("span");
        var volumeLineHead = document.createElement("div");
        var volumeHorn = document.createElement('span');
        var playheadSpan = document.createElement('span');


        var timelineWidth = 230;
        var volumelinewidth = 50;
        var onplayhead = false;

        this.myAudioPlayer = myAudioPlayer;
        this.playhead = playhead;
        this.timeProgressBar = timeProgressBar;
        this.timelineWidth = timelineWidth;
        this.playButton = playButton;
        this.currentTime = currentTime;
        this.transTime = transTime;
        this.intialStatus = intialStatus;
        this.playStatus = playStatus;
        this.volumeHorn = volumeHorn;


        myAudioPlayer.className = "audioplayer";
        playButton.className = "playbutton play";
        timeLine.className = "timeline";
        timeProgressBar.className = "time-progress-bar";
        playhead.className = "playhead intial";
        playheadSpan.className = 'round';
        currentTime.className = "current-time";
        audioPlayer.setAttribute('controls', 'controls');
        audioPlayer.style.display = "none";
        volumeLine.className = "audio-line";
        volumeLineHead.className = "audio-line-head";
        volumeLineBar.className = "audio-line-bar";
        volumeHorn.className = 'horn full';

        myAudioPlayer.appendChild(playButton);
        playhead.appendChild(playheadSpan);
        timeLine.appendChild(timeProgressBar);
        timeLine.appendChild(playhead);
        myAudioPlayer.appendChild(timeLine);
        myAudioPlayer.appendChild(currentTime);
        myAudioPlayer.appendChild(audioPlayer);
        volumeLine.appendChild(volumeLineBar);
        volumeLine.appendChild(volumeLineHead);
        myAudioPlayer.appendChild(volumeHorn);
        myAudioPlayer.appendChild(volumeLine);

        currentTime.innerHTML = '00:00';

        if (config.hasOwnProperty("audiosrc")) {
            audioPlayer.setAttribute('src', config.audiosrc);
        }
        if(config.hasOwnProperty("showVolume")){
            if(!config.showVolume){
                volumeLine.style.display='block';
                volumeLineHead.style.display='block';
                volumeLineBar.style.display='block';
                myAudioPlayer.style.width ='430px';
            }
        }


        playButton.addEventListener('click', play, false);
        audioPlayer.addEventListener('timeupdate', timeUpdate, false);
        audioPlayer.addEventListener('canplaythrough', function () {
            duration = audioPlayer.duration;
        }, false);
        timeLine.addEventListener('click', function (event) {
            moveplayhead(event);
            audioPlayer.currentTime = duration * clickPercent(event);
        }, false);
        playhead.addEventListener('mousedown', mouseDown, false);
        window.addEventListener('mouseup', mouseUp, false);
        volumeLine.addEventListener('click', function (event) {
            movevolumehead(event);
            audioPlayer.volume = volumeClickPercent(event);
            if (audioPlayer.volume == 0) {
                volumeHorn.className = 'horn';
            }else if(audioPlayer.volume>=0.8){
                volumeHorn.className = 'horn full';
            }else if(audioPlayer.volume>=0.5){
                volumeHorn.className = 'horn two';
            }else if(audioPlayer.volume>0){
                volumeHorn.className = 'horn one';
            }
        }, false);
        //volumeLineHead.addEventListener('mousedown', volumeMouseDown, false);
        //window.addEventListener('mouseup', volumeMouseUp, false);

        //样式调整
        //设置成初始状态
        function intialStatus(){
            playhead.className = 'playhead intial';
        }
        //设置成播放状态
        function playStatus(){
            playhead.className = 'playhead';
        }
        function mouseDown() {
            //样式调整
            playStatus();

            onplayhead = true;
            window.addEventListener('mousemove', moveplayhead, true);
            audioPlayer.removeEventListener('timeupdate', timeUpdate, false);
        }

        function mouseUp(e) {
            //样式调整
            if (parseInt(playhead.style.marginLeft) <= 0) {
                intialStatus();
            }

            if (onplayhead == true) {
                moveplayhead(e);
                window.removeEventListener('mousemove', moveplayhead, true);
                // change current time
                audioPlayer.currentTime = duration * clickPercent(e);
                audioPlayer.addEventListener('timeupdate', timeUpdate, false);
            }
            onplayhead = false;
        }

        function clickPercent(e) {
            return (e.pageX - timeLine.offsetLeft) / timelineWidth;
        }

        function volumeClickPercent(e) {
            var volume = 0;
            if ((e.pageX - volumeLine.offsetLeft) / volumelinewidth < 0)volume = 0;
            if ((e.pageX - volumeLine.offsetLeft) / volumelinewidth > 1)volume = 1;
            if ((e.pageX - volumeLine.offsetLeft) / volumelinewidth >= 0 && (e.pageX - volumeLine.offsetLeft) / volumelinewidth <= 1)volume = (e.pageX - volumeLine.offsetLeft) / volumelinewidth;
            return volume;
        }

        function moveplayhead(e) {
            var newMargLeft = e.pageX - timeLine.offsetLeft;
            if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
                playhead.style.marginLeft = newMargLeft + "px";
                timeProgressBar.style.width = newMargLeft * 100 / timelineWidth + "%";
            }
            if (newMargLeft < 0) {
                playhead.style.marginLeft = "0px";
                timeProgressBar.style.width = "0%";
            }
            if (newMargLeft > timelineWidth) {
                playhead.style.marginLeft = timelineWidth + "px";
                timeProgressBar.style.width = "100%";
            }
        }

        function movevolumehead(e) {
            //debugger;
            var newMargLeft = e.pageX - volumeLine.offsetLeft;
            if (newMargLeft >= 0 && newMargLeft <= volumelinewidth) {
                volumeLineHead.style.marginLeft = newMargLeft-10 + "px";
                volumeLineBar.style.width = newMargLeft * 100 / volumelinewidth + "%";
            }
            if (newMargLeft < 0) {
                volumeLineHead.style.marginLeft = "0px";
                volumeLineBar.style.width = "0%";
            }
            if (newMargLeft > timelineWidth) {
                volumeLineHead.style.marginLeft = volumelinewidth-10 + "px";
                volumeLineBar.style.width = "100%";
            }
        }

        function play() {
            //样式控制
            playStatus();

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

        function timeUpdate() {
            var playPercent = audioPlayer.currentTime / duration;
            var playPercentWidth = timelineWidth * playPercent;
            var playTime = transTime(parseInt(audioPlayer.currentTime));
            currentTime.innerHTML = playTime;
            
            playhead.style.marginLeft = playPercentWidth + "px";
            timeProgressBar.style.width = playPercent * 100 + "%";
            if (audioPlayer.currentTime == duration) {
                playButton.className = "";
                playButton.className = "playbutton play";
            }
        }
        function transTime(time){
            if (time<10) {
                return('00:0'+time);
            }else if(time<60){
                return('00:'+time);
            }else if(time<600){
                var i = parseInt(time/60);
                var j = parseInt(time%60);
                if (j<10) {
                    return('0'+i+':0'+j);    
                }else{
                    return('0'+i+':'+j); 
                }
                
            }else if(time<6000){
                var i = parseInt(time/60);
                var j = parseInt(time%60);
                if (j<10) {
                    return(i+':0'+j);    
                }else{
                    return(i+':'+j); 
                }
            }else{
                return time;
            }
        }

        function volumeMouseDown() {
            onplayhead = true;
            window.addEventListener('mousemove', movevolumehead, true);
            //audioPlayer.removeEventListener('timeupdate', timeUpdate, false);
        }

        function volumeMouseUp(e) {
            if (onplayhead == true) {
                movevolumehead(e);
                window.removeEventListener('mousemove', movevolumehead, true);
                audioPlayer.volume = volumeClickPercent(e);
            }
            onplayhead = false;
        }

    }

    AudioPlayer.prototype.getAudioPlayer = function () {
        return this.myAudioPlayer;
    };

    AudioPlayer.prototype.record = function (recordTime) {

        var ct = 0;
        var playhead = this.playhead;
        var timeLineWidth = this.timelineWidth;
        var timeProgressBar = this.timeProgressBar;
        var playButton = this.playButton;
        var currentTime = this.currentTime;
        var transTime = this.transTime;
        var intialStatus = this.intialStatus;
        var playStatus = this.playStatus;

        playButton.setAttribute("disabled", "true");
        var recoding = setInterval(
            function showProgress() {
                ct = ct + 1;
                currentTime.innerHTML = transTime(ct);
                var playPercent = ct / recordTime;
                var playPercentWidth = timeLineWidth * playPercent;
                playhead.style.marginLeft = playPercentWidth + "px";
                timeProgressBar.style.width = playPercent * 100 + "%";
            }, 1000);

        this.recording = recoding;

        setTimeout(function stopProgress() {
            clearInterval(recoding);
            playButton.removeAttribute("disabled");

        }, recordTime * 1000);

        
        playStatus();
    };

    AudioPlayer.prototype.stoprecord = function(){

        var recording = this.recording;
        clearInterval(recoding);
        playButton.removeAttribute("disabled");
    }

    return AudioPlayer;
})();
