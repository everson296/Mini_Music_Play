const songList = [
    {
        id: '1',
        name: 'what was i made for',
        artist: 'Billie Eilish',
        src: 'music/what_was_i_made_for.mp3',
        cover: 'img/billie_eilish.png'
        
    },
    {
        id: '2',
        name: 'Vampire',
        artist: 'Olivia Rodrigo',
        src: 'music/vampire.mp3',
        cover: 'img/olivia_rodrigo.jpg'
        
    },
    {
        id: '3',
        name: 'Um Minuto Para O Fim Do Mundo',
        artist: 'CPM 22',
        src: 'music/Um_Minuto_Para_O_Fim_Do_Mundo.mp3',
        cover: 'img/cpm_22.jpg'
        
    },
    {
        id: '4',
        name: 'Cachecol',
        artist: 'K a m a i t a c h i',
        src: 'music/Cachecol.mp3',
        cover: 'img/kamaitachi.jpg'
        
    },
    {
        id: '5',
        name: 'Dance The Night',
        artist: 'Dua Lipa',
        src: 'music/Dance_The_Night.mp3',
        cover: 'img/dua_lipa.jpg'
        
    }
]

const artistName = document.querySelector('.artist-name');
const musicName = document.querySelector('.song-name');
const fillBar = document.querySelector('.fill-bar');
const time = document.querySelector('.time');
const cover = document.querySelector('.cover');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const prog = document.querySelector('.progress-bar');

let song = new Audio();
let currentSong = 0;
let playing = false;

document.addEventListener('DOMContentLoaded', () => {
    loadSong(currentSong);
    song.addEventListener('timeupdate', updateProgress);
    song.addEventListener('ended', nextSong);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    playBtn.addEventListener('click', togglePlayPause);
    prog.addEventListener('click', seek);
})

const loadSong = (index) => {
    const {name, artist, src, cover: thumb} = songList[index];
    artistName.innerText = artist;
    musicName.innerText = name;
    song.src = src;
    cover.style.backgroundImage = `url(${thumb})`;
}

const updateProgress = () => {
    if(song.duration){
        const pos = (song.currentTime / song.duration) * 100;
        fillBar.style.width = `${pos}%`;

        const duration = formatTime(song.duration);
        const currentTime = formatTime(song.currentTime);
        time.innerText = `${currentTime} - ${duration}`
    }
}

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

const togglePlayPause = () => {
    if(playing){
        song.pause();
    }else{
        song.play();
    }

    playing = !playing;
    playBtn.classList.toggle('fa-pause', playing);
    playBtn.classList.toggle('fa-play', !playing);
    cover.classList.toggle('active', playing);
}

const nextSong = () => {
    currentSong = (currentSong + 1) % songList.length;
    playMusic();
}

const prevSong = () => {
    currentSong = (currentSong - 1 + songList.length) % songList.length;
    playMusic();
}

const playMusic = () => {
    loadSong(currentSong);
    song.play();
    playing = true;
    playBtn.classList.add('fa-pause');
    playBtn.classList.remove('fa-play');
    cover.classList.add('active')
}

const seek = (e) => {
    const pos = (e.offsetX / prog.clientWidth) * song.duration;
    song.currentTime = pos;
}
