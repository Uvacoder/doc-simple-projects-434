const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music

//populate playlist
const songs = [
    {
        name: 'jacinto-1',
        songName: 'Electric Chill Machine',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-2',
        songName: '7 Nation Army (remix)',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-3',
        songName: 'New Title',
        artist: 'Jacinto Design',
    }
];

// Check if playing
let isPlaying = false;



//Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

//Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}



// Play or Pause Event listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));


//update DOM

function loadSong(song){
    title.textContent = song.songName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Current Song

let songIndex = 0;


// Next Song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    // console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
}

// Next Song
function prevSong() {  
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length -1;
    }
    // console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
}

// On load - Select first songs
loadSong(songs[songIndex]);


// update progress bar

function updateProgressBar(e){
    if (isPlaying){
    // console.log(e);
    const {duration, currentTime} = e.srcElement;
    // console.log(duration,currentTime);
    //update progress bar width
    const progresPercent = (currentTime / duration) * 100;
    // console.log(progresPercent);
    progress.style.width = `${progresPercent}%`;
    //calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    console.log('minutes', durationMinutes);       
    //remainder
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
    }
    console.log('seconds', durationSeconds);
    //Delay switching duration element to avoid NaN
    if (durationSeconds) {
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    //calculate display for current
    const currentMinutes = Math.floor(currentTime / 60);
    // console.log('minutes', currentMinutes);       
    //remainder
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
    }
    // console.log('seconds', currentSeconds);
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// Set Progress Bar

function setProgressBar(e) {
    console.log(e);
    const width = this.clientWidth;
    console.log('width', width);
    const clickX = e.offsetX;
    console.log('clickX', clickX);
    //destructe
    const { duration } = music;
    console.log(clickX / width);
    console.log(clickX / width * duration);
    music.currentTime = (clickX / width) * duration;
}



// Event Listener

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
