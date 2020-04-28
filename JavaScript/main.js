window.addEventListener("load", initEvents);
var audio, slide , sound;
var playstatus = false;
var checkSong = false;
var crrnt_song, index, checkEvent;
var minutes, seconds, mute;
function initEvents() {
    mute = document.querySelector("#mutesong");
    mute.addEventListener("click",muteSong);
    sound = document.querySelector("#volume");
    sound.addEventListener("change",changeVolume);
    slide = document.querySelector("#slide");
    slide.addEventListener("change", changeSongValue);
    document.querySelector("#play").addEventListener("click", actionSong);
    document.querySelector("#stop").addEventListener("click", stopSong);
    document.querySelector("#next").addEventListener("click", changeNext);
    document.querySelector("#back").addEventListener("click", changePrev);
    document.querySelector("#save").addEventListener("click", saveSongs);
    document.querySelector("#search").addEventListener("keyup", searchSong);
    document.querySelector("#searchPlaylist").addEventListener("keyup",searchPlaylist);
    var ul = document.querySelector("#songList");
    audio = document.querySelector("#audio");

    allSongs.forEach(function (obj) {
        var li = document.createElement("li");
        li.setAttribute("title", obj.song_Id);

        var songName = document.createElement("span");
        songName.innerHTML = obj.song_Name;

        var songImg = document.createElement("img");
        songImg.setAttribute("src", obj.song_thumb);

        var btn = document.createElement("button");
        btn.innerHTML = "Add to Playlist";
        btn.className = "btn btn-dark d-block w-100";

        li.appendChild(songImg);
        li.appendChild(songName);
        li.appendChild(btn);
        ul.appendChild(li);

        songName.addEventListener("click", playSong);
        songImg.addEventListener("click", playSong);
        btn.addEventListener("click", addSong);
    })

    if (localStorage.getItem("songsData")) {
        loadPlaylist();
    }
}

function saveSongs() {
    if (window.localStorage) {
        var json = JSON.stringify(obj.playList);
        localStorage.setItem("songsData", json);
        alert("Playlist saved......");
    }
    else {
        alert("Browser not supported");
    }
}
function loadPlaylist() {
    if (window.localStorage) 
    {
        var data = localStorage.getItem("songsData");
        obj.playList = JSON.parse(data);
        printSongs();
    }
    else
    {

    }
}


function playSongList() {
    document.querySelector("#back").disabled = false;
    document.querySelector("#next").disabled = false;
    var songId = event.srcElement.parentElement.title;
    index = obj.playList.map(function (img) { return img.id; }).indexOf(parseInt(songId));
    checkSong = true;
    checkEvent = 1;
    if (playstatus) {
        var elem = document.querySelector("#playImg");
        elem.remove();
    }
    var curr_img = document.createElement("img");
    curr_img.setAttribute("src", obj.playList[index].imgUrl);
    curr_img.id = "playImg";
    document.querySelector("#curr_img").appendChild(curr_img);
    document.querySelector("#curr_song").innerHTML = obj.playList[index].name;
    audio.src = obj.playList[index].src;
    playstatus = true;

    setTimeout(function () {
        slide.max = audio.duration;
        minutes = parseInt(audio.duration / 60);
        seconds = parseInt(audio.duration % 60);
        document.querySelector("#lDuration").innerHTML = minutes + ":" + seconds;

    }, 1000);

    audio.play();
    setInterval(function () {
        slide.value = audio.currentTime;
        if(audio.currentTime<audio.duration)
        {
            minutes = parseInt(audio.currentTime / 60);
            seconds = parseInt(audio.currentTime % 60);
            document.querySelector("#sDuration").innerHTML = minutes + ":" + seconds;
        }
    }, 1000);

    if (index == 0) {
        document.querySelector("#back").disabled = true;
    }
    if (obj.playList.length - 1 == index) {
        document.querySelector("#next").disabled = true;
    }
    togglePlay(playstatus);
}

function playSong() {
    var songId = event.srcElement.parentElement.title;
    document.querySelector("#back").disabled = false;
    document.querySelector("#next").disabled = false;
    index = allSongs.map(function (img) { return img.song_Id; }).indexOf(parseInt(songId));
    checkSong = true;
    checkEvent = 0;
    if (playstatus) {
        var elem = document.querySelector("#playImg");
        elem.remove();
    }
    var curr_img = document.createElement("img");
    curr_img.setAttribute("src", allSongs[index].song_thumb);
    curr_img.id = "playImg";
    document.querySelector("#curr_img").appendChild(curr_img);
    document.querySelector("#curr_song").innerHTML = allSongs[index].song_Name;
    audio.src = allSongs[index].song_Url;
    playstatus = true;

    setTimeout(function () {
        slide.max = audio.duration;
        // sound.max = audio.volume;
        minutes = parseInt(audio.duration / 60);
        seconds = parseInt(audio.duration % 60);
        document.querySelector("#lDuration").innerHTML = minutes + ":" + seconds;

    }, 1000);

    audio.play();
    setInterval(function () {
        slide.value = audio.currentTime;
        if(audio.currentTime<audio.duration)
        {
            minutes = parseInt(audio.currentTime / 60);
            seconds = parseInt(audio.currentTime % 60);
            document.querySelector("#sDuration").innerHTML = minutes + ":" + seconds;
        }
    }, 1000);

    if (index == 0) {
        document.querySelector("#back").disabled = true;
    }
    if (allSongs.length == songId) {
        document.querySelector("#next").disabled = true;
    }
    togglePlay(playstatus);
}



function togglePlay(playstatus) {
    var playIcon = document.querySelector("#play");
    if (playstatus == true) {
        playIcon.innerHTML = '<i class="fas fa-pause"></i>';
        audio.play();
    }
    else {
        playIcon.innerHTML = '<i class="fas fa-play"></i>';
        audio.pause();
    }
}

function actionSong() {
    if (checkSong == true) {
        playstatus = !playstatus;
        togglePlay(playstatus);
    }

}

function stopSong() {
    if (playstatus == true) {
        audio.currentTime = 0;
        audio.pause();
        play.innerHTML = '<i class="fas fa-play"></i>';
        document.querySelector("#lDuration").innerHTML = "00:00";
    }
    else {
        audio.currentTime = 0;
        audio.pause();
    }
}

function changeNext() {
    if (checkSong == true) {
        index++;
        document.querySelector("#back").disabled = false;
        if (playstatus == true || playstatus == false) {
            elem = document.querySelector("#playImg");
            elem.remove();
        }
        var curr_img = document.createElement("img");
        if (checkEvent == 1) {
            curr_img.setAttribute("src", obj.playList[index].imgUrl);
            curr_img.id = "playImg";
            document.querySelector("#curr_img").appendChild(curr_img);
            document.querySelector("#curr_song").innerHTML = obj.playList[index].name;
            playstatus = true;
            audio.src = obj.playList[index].src;
            if (obj.playList.length - 1 == index) {
                document.querySelector("#next").disabled = true;
            }
        }
        else {
            curr_img.setAttribute("src", allSongs[index].song_thumb);
            curr_img.id = "playImg";
            document.querySelector("#curr_img").appendChild(curr_img);
            document.querySelector("#curr_song").innerHTML = allSongs[index].song_Name;
            playstatus = true;
            audio.src = allSongs[index].song_Url;
            if (allSongs.length - 1 == index) {
                document.querySelector("#next").disabled = true;
            }
        }
        setTimeout(function () {
            minutes = parseInt(audio.duration / 60);
            seconds = parseInt(audio.duration % 60);
            document.querySelector("#lDuration").innerHTML = minutes + ":" + seconds;
        }, 1000);
        playstatus = true;
        togglePlay(playstatus);
    }
}


function changePrev() {
    if (checkSong == true) {
        index--;
        document.querySelector("#next").disabled = false;
        if (playstatus == true || playstatus == false) {
            elem = document.querySelector("#playImg");
            elem.remove();
        }
        var curr_img = document.createElement("img");
        if (checkEvent == 1) {
            curr_img.setAttribute("src", obj.playList[index].imgUrl);
            curr_img.id = "playImg";
            document.querySelector("#curr_img").appendChild(curr_img);
            document.querySelector("#curr_song").innerHTML = obj.playList[index].name;
            playstatus = true;
            audio.src = obj.playList[index].src;
        }
        else {
            curr_img.setAttribute("src", allSongs[index].song_thumb);
            curr_img.id = "playImg";
            document.querySelector("#curr_img").appendChild(curr_img);
            document.querySelector("#curr_song").innerHTML = allSongs[index].song_Name;
            playstatus = true;
            audio.src = allSongs[index].song_Url;
        }
        if (index == 0) {
            document.querySelector("#back").disabled = true;
        }
        setTimeout(function () {
            minutes = parseInt(audio.duration / 60);
            seconds = parseInt(audio.duration % 60);
            document.querySelector("#lDuration").innerHTML = minutes + ":" + seconds;
        }, 1000);
        playstatus = true;
        togglePlay(playstatus);
    }
}

function changeSongValue() {
    audio.currentTime = slide.value;
}
function changeVolume()
{
   audio.volume = sound.value/100;
   if(sound.value == 0)
   {
    mute.className ="fas fa-volume-mute text-light";
   }
   else
   {
    mute.className ="fas fa-volume-up text-light";
   }
}

function muteSong()
{
if(audio.muted)
{
    audio.muted= false;
    sound.value = true;
    mute.className ="fas fa-volume-up text-light";
}
else
{
    audio.muted = true;
    sound.value = 0;
    mute.className ="fas fa-volume-mute text-light";
}
}

function addSong() {
    var songId = event.srcElement.parentElement.title;
    for (var i = 0; i < allSongs.length; i++) {
        if (allSongs[i].song_Id == songId) {
            obj.addSong(allSongs[i].song_Id, allSongs[i].song_Name, allSongs[i].song_Url, allSongs[i].song_thumb);
        }
    }
    printSongs();
}

function printSongs() {
    var ul = document.querySelector("#playList");
    ul.innerHTML = "";
    ul.id="playList";
    obj.playList.forEach(function (song) {
        var li = document.createElement("li");
        li.setAttribute("title", song.id);
        var songName = document.createElement("span");
        songName.innerHTML = song.name;
        var songImg = document.createElement("img");
        songImg.setAttribute("src", song.imgUrl);
        var btn = document.createElement("button");
        btn.innerHTML = "Remove";
        btn.className = "btn btn-dark d-block";
        li.appendChild(songName);
        li.appendChild(songImg);
        li.appendChild(btn);
        ul.appendChild(li);
        songName.addEventListener("click", playSongList);
        songImg.addEventListener("click", playSongList);
        btn.addEventListener("click", deletSong);
    })
}

function deletSong() {
    var songId = event.srcElement.parentElement.title;
    obj.deletSong(songId);
    printSongs();
}

function searchSong() {
    var input, filter, ul, li, span, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    ul = document.getElementById("songList");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        span = li[i].getElementsByTagName("span")[0];
        txtValue = span.textContent || span.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
function searchPlaylist()
{
    var input, filter, ul, li, span, i, txtValue;
    input = document.getElementById("searchPlaylist");
    filter = input.value.toUpperCase();
    ul = document.getElementById("playList");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        span = li[i].getElementsByTagName("span")[0];
        txtValue = span.textContent || span.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }

}