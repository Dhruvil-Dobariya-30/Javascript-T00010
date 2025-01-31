const musicData = JSON.parse(localStorage.getItem("MusicData"));
let div = document.getElementById("div");
let allMusic = document.getElementById("allMusic");
let PlaylistDiv = document.getElementById("playlist");
const form = document.getElementById("addSongForm");
const button = document.getElementById("showFormButton");

let id = 0;
let isPlaying = true;
let playlistData = [];

function allMusics() {
	allMusic = "";

	musicData.map((data) => {
		allMusic += `
            <div class="music-list">
							<div>
                <img src=${data.cover_image} id="cover" />
                <h5>${data.title}</h5>
							</div>
                <div class="control">
                    <button onclick="playMusic(${data.id})"><i class="fa-solid fa-play"></i></button>
                    <button onclick="removeSong(${data.id})"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `;
	});

	document.getElementById("allMusic").innerHTML = allMusic;
}

allMusics();

function playMusic(i) {
	div = "";
	id = i;
	div += `
    <div>
      <img src=${musicData[i].cover_image} class="cover" />
      <h3>${musicData[i].title}</h3>
      <p>${musicData[i].artist}<span> - ${musicData[i].year} - </span> <span>${musicData[i].genre} </span></p>
      <audio controls autoplay id="music">
        <source src="${musicData[id].music_path}" type="audio/ogg">
      </audio>
      <div class="btns"> 
        <button onclick="prev()" id="prev"><i class="fa-solid fa-backward"></i></button>
        <button onclick="togglePlayPause()" id="playPause"><i class="fa-solid fa-pause"></i></button>
        <button onclick="next()" id="change"><i class="fa-solid fa-forward"></i></button>
        <button onclick="suffle()" id="suffle"><i class="fa-solid fa-shuffle"></i></button>
        <button onclick="addPlayList(${id})" id="${musicData[id]}"><i class="fa-solid fa-list"></i></button>
        <button id="showFormButton" onclick="showForm()"><i class="fa-solid fa-file-circle-plus"></i></button>
        </div>
    </div>
  `;
	document.getElementById("div").innerHTML = div;
}

let isSuffle = false;

function suffle() {
	isSuffle = !isSuffle;

	const suffleButton = document.querySelector("#suffle");
	if (isSuffle) {
		suffleButton.style.backgroundColor = "#20b2aa";
		suffleButton.textContent = "Shuffle Mode On";
	} else {
		suffleButton.style.backgroundColor = "#d65a31";
		suffleButton.innerHTML = `<i class="fa-solid fa-shuffle"></i>`;
	}
}

function next() {
	if (isSuffle) {
		let range = musicData.length - 1;
		let num = Math.ceil(Math.random() * (range - 0) + 0);
		playMusic(num);
	} else {
		if (id == 9) {
			id = 0;
		} else {
			id++;
		}
		playMusic(id);
	}



	const suffleButton = document.querySelector("#suffle");
	if (isSuffle) {
		suffleButton.style.backgroundColor = "#20b2aa";
		suffleButton.textContent = "Shuffle Mode On";
	}
}

function prev() {
	if (id == 0) {
		id = 9;
	} else {
		id--;
	}
	playMusic(id);
}

function togglePlayPause() {
	const audio = document.getElementById("music");
	if (isPlaying) {
		audio.pause();
		isPlaying = false;
	} else {
		audio.play();
		isPlaying = true;
	}
	updatePlayPauseButton();
}

function updatePlayPauseButton() {
	const playPauseButton = document.getElementById("playPause");
	playPauseButton.innerHTML = isPlaying ? `<i class="fa-solid fa-pause"></i>` : `<i class="fa-solid fa-play"></i>`;
}

function addPlayList(i) {
	if (!playlistData.includes(i)) {
		playlistData.push(i);
		displayPlaylist();
	} else {
		alert(`Song ${musicData[i].title} is already in the playlist`);
	}
}

function displayPlaylist() {
	PlaylistDiv = "";

	playlistData.map((data) => {
		console.log(musicData[data].title);

		PlaylistDiv += `
    <div class="music-list" >
		  <div>
		    <img src=${musicData[data].cover_image} id="cover" />
			  <h5>${musicData[data].title}</h5>
      </div>
      <div>
			  <button onclick="removeFromPL(${data})"><i class="fa-solid fa-trash"></i></button>
      </div>
		</div>
		`;
	});

	document.getElementById("playlist").innerHTML = PlaylistDiv;
}

function removeFromPL(title) {
	const index = playlistData.indexOf(title);
	playlistData.splice(index, 1);
	displayPlaylist();
}

function addNewSong() {
	const title = document.getElementById("title").value;
	const cover_image = document.getElementById("cover_image").value;

	if (title && cover_image) {
		const newSong = {
			id: musicData.length,
			title,
			cover_image,
			music_path: "",
		};

		musicData.push(newSong);
		localStorage.setItem("MusicData", JSON.stringify(musicData));
		allMusics();
		alert("New song added successfully!");
		hideForm();
	} else {
		alert("Please fill in all fields.");
	}
}

function removeSong(i) {
	musicData.splice(i, 1);
	musicData.forEach((song, index) => (song.id = index));
	localStorage.setItem("MusicData", JSON.stringify(musicData));
	allMusics();
	if (id === i) {
		document.getElementById("div").innerHTML = "";
	}
}



function showForm() {
	document.getElementById("addSongForm").style.display = "flex";
	document.getElementById("showFormButton").style.display = "none";
}

function hideForm() {
	document.getElementById("addSongForm").style.display = "none";
	document.getElementById("showFormButton").style.display = "block";
}
