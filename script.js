// You can edit ALL of the code here

// selectors and global variables
let dropDown = document.getElementById("listEpisodes");
const root = document.getElementById("root");
const container = document.getElementById("container");
const option = document.createElement("option");
let searchInput = document.getElementById("searchInput");
let searchResult = document.getElementById("searchResult");
showDropDown = document.getElementById("show_dropdown");

// function call to load web page
function setup() {
  // sorts the show dropDown in alphabetical order
  let allShows = getAllShows().sort((a, b) => {
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    } else if (b.name.toLowerCase() > a.name.toLowerCase()) {
      return -1;
    } else {
      return 0;
    }
  });

  // creates show DropDown Options
  showCount = 0;
  createShowList = allShows.forEach((show) => {
    showDropDown.innerHTML += `
    <option  value= "${show.id}">
    ${show.name}
    </option>
   `;
    showCount++;
  });

  //  episodeSet(allShows[0].id); // function call to load episodes //
 
  makePageForShow(allShows); // function call to load all shows //

  searchResult.innerHTML = `${showCount} of ${showCount} shows available`;
}

// function that creates div for shows and displays details in the root DOM
function makePageForShow(allShows) {
    container.style.display = "none";
    container.innerHTML = "none";
    root.style.border = "3px solid green";
    allShows.forEach((show) => {
    let showEl = document.createElement("div");
    showEl.class = "show-elm";
    root.appendChild(showEl);
  
    show.image
      ? (showEl.innerHTML += `
     
        <h3>${show.name}</h3>
      <div class="show-info">
        <img src= "${show.image.medium}" alt= ""> 
        ${show.summary ? show.summary : ""}
        <div id="more-details">
          <div> Rated: ${show.rating.average} </div>
          <div> Genre: ${show.genres} </div>
          <div> Status: ${show.status} </div>
          <div> Runtime: ${show.runtime} </div>
        </div>
      </div>
    
    `)
      : (showEl.innerHTML += `
    <h3>${show.name}</h3>
    ${show.summary ? show.summary : ""}`);
    console.log(showEl);
  });
}

// function that fetches API and displays episodes
function episodeSet(selectedShow) {
  console.log(selectedShow);

  // API Fetch for show episodes //
  fetch(`https://api.tvmaze.com/shows/${selectedShow}/episodes`)
    .then((response) => response.json())
    .then((data) => {
      makePageForEpisodes(data);
      // console.log(data[0]);
    })
    .catch((error) => console.log(error));
}

// eventListener for the show Dropdown
showDropDown.addEventListener("change", (event) =>{
  if(event.target.value !== "text"){episodeSet(event.target.value)}
  else{root.style.display = ""; container.style.display="none"; }
}

);

// Level 100: function that displays episodes on webpage for GOT show in the Container DOM//
function makePageForEpisodes(episodeList) {
  root.style.display = "none";
  root.style.border = "3px solid green";
  container.style.display ="";
  searchResult.innerHTML = "";
  container.innerHTML = "";
  dropDown.innerHTML = "";
  option.value = "";
  option.innerHTML = "Show All Episodes";
  dropDown.appendChild(option);

  // creates Episode Codes and the Names (Headings) for the DropDown Options //
  episodeList.forEach((episode) => {
    console.log(episodeList);
    let option = document.createElement("option");

    // creates DropDown Options for the Episodes
    option.value = `${episode.name} - S${zeroPadded(episode.season)}
    E${zeroPadded(episode.number)}`;

    option.innerHTML = `S${zeroPadded(episode.season)}
    E${zeroPadded(episode.number)} - ${episode.name}`;
    dropDown.appendChild(option);
    let imageTag = "";
    if (episode.image) {
      imageTag = `<img src= "${episode.image.medium}" alt "">`;
    }

    // creates a div for every episode and adds the info or details for the Search Input Option //
    container.innerHTML += `<div>
    <h3>${episode.name} - S${zeroPadded(episode.season)}
    E${zeroPadded(episode.number)} </h3>
    ${imageTag}
    ${episode.summary ? episode.summary : ""}
    </div>`;
  });
  searchResult.innerHTML = `${episodeList.length} of ${episodeList.length} episodes available`;
}

// function adds "0" to the Episode number to give it a double digit //
function zeroPadded(episodeCode) {
  return episodeCode.toString().padStart(2, 0);
}

// Level 200: Search Input with eventListener for Input Search and count of Episodes //
searchInput.addEventListener("input", (event) => {
  searchInput = event.target.value;
  let episodesAll = document.querySelectorAll("#container div");

  let episodeCount = 0;
  console.log(searchInput);
  episodesAll.forEach((episode) => {
    if (episode.innerHTML.toLowerCase().includes(searchInput.toLowerCase())) {
      episode.style.display = "block";
      episodeCount++;
    } else {
      episode.style.display = "none";
    }
  });
  // searchResult.innerHTML = `${episodeCount} of ${episodesAll.length} episodes available`;
  searchResult.innerHTML = `${episodeCount} of ${episodesAll.length} shows available`;
});

// Level 300: EventListener for the DropDown selector
dropDown.addEventListener("change", (event) => {
  let episodesAll = document.querySelectorAll("#container div");
  let searchInput = event.target.value;
  let episodeCount = 0;
  console.log(searchInput);
  episodesAll.forEach((episode) => {
    let episodeName = episode.querySelector("h3");
    console.log(episodeName.innerHTML.toLowerCase(), searchInput.toLowerCase());
    if (
      episodeName.innerHTML.toLowerCase().includes(searchInput.toLowerCase())
    ) {
      episode.style.display = "";
      episodeCount++;
    } else {
      episode.style.display = "none";
    }
  });
  searchResult.innerHTML = `${episodeCount} of ${episodesAll.length} episodes selected`;
});

// loads and displays webpage
window.onload = setup;
