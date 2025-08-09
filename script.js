console.log("Welcome to Spotify")
//Intialize Variables
let songIndex = 0;
let audioElement = new Audio('Songs/song-1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myprogressbar = document.getElementById('myprogressbar');
let songitems = Array.from(document.getElementsByClassName('songitem'));
let songs = [
    {songName: "Let me Love you", filePath:"Songs/song-1.mp3", coverPath: "cover_albums/album-1.png"},
    {songName: "Mallasodu", filePath:"Songs/song-2.mp3", coverPath: "cover_albums/album-2.jpeg"},
    {songName: "The Night we met", filePath:"Songs/song-3.mp3", coverPath: "cover_albums/album-3.jpg"},
    {songName: "Watermelon and Sugar", filePath:"Songs/song-4.mp3", coverPath: "cover_albums/album-4.jpg"},
    {songName: "Monica", filePath:"Songs/song-5.mp3", coverPath: "cover_albums/album-5.jpg"},
    {songName: "Sahibha", filePath:"Songs/song-6.mp3", coverPath: "cover_albums/album-6.jpg"},
    {songName: "Mallasodu", filePath:"Songs/song-7.mp3", coverPath: "cover_albums/album-1.png"},
    {songName: "Mallasodu", filePath:"Songs/song-8.mp3", coverPath: "cover_albums/album-1.png"},
]

// UNCOMMENT THIS BLOCK!
songitems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songname")[0].innerText = songs[i].songName;
});

//handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
    }
})

// Next and Previous functionality
const nextSong = () => {
    if(songIndex >= songs.length - 1){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    makeAllplays();
    document.getElementById(songIndex.toString()).classList.remove('fa-circle-play');
    document.getElementById(songIndex.toString()).classList.add('fa-circle-pause');
}

const previousSong = () => {
    if(songIndex <= 0){
        songIndex = songs.length - 1;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    makeAllplays();
    document.getElementById(songIndex.toString()).classList.remove('fa-circle-play');
    document.getElementById(songIndex.toString()).classList.add('fa-circle-pause');
}

// Add event listeners for next and previous buttons
document.querySelector('.fa-backward-fast').addEventListener('click', previousSong);
document.querySelector('.fa-forward-fast').addEventListener('click', nextSong);

//Listen to events
audioElement.addEventListener('timeupdate', ()=>{
    //update seekbar
    let progress = parseInt((audioElement.currentTime/audioElement.duration)* 100)
    myprogressbar.value = progress;
})

myprogressbar.addEventListener('change', ()=>{
    audioElement.currentTime = myprogressbar.value * audioElement.duration/100;
})

const makeAllplays = ()=>{
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}
Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllplays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = songs[songIndex].filePath;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    });
});