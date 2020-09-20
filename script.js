// You can edit ALL of the code here

let dropDown = document.getElementById("listEpisodes");
const container = document.getElementById("container");
const option = document.createElement("option");
let searchInput = document.getElementById("searchInput");
let searchResult = document.getElementById("searchResult");
showDropDown = document.getElementById("show_dropdown");



// sorts the show dropDown in alphabetical order
function setup() {
  let allShows = getAllShows().sort((a, b) => {
    if(a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    else if(b.name.toLowerCase() > a.name.toLowerCase()) {
      return -1;
    }
    else
    {
      return 0;
    }
  });
  
  //creates show DropDown Options
  createShowList = allShows.forEach((show) => {
    showDropDown.innerHTML += `
    <option  value= "${show.id}">
    ${show.name}
    </option>
   `;
  //  console.log(`${show.name} - ${show.id}`);
  });
  episodeSet(allShows[0].id);
  // allEpisodes = getAllEpisodes();
  // makePageForEpisodes(allEpisodes);
}

function episodeSet(selectedShow) {
   console.log(selectedShow);

  fetch(`https://api.tvmaze.com/shows/${selectedShow}/episodes`)
    .then((response) => response.json())
    .then((data) => {
      makePageForEpisodes(data);
    })
    .catch((error) => console.log(error));
}

showDropDown.addEventListener("change", (event) =>  episodeSet(event.target.value));

// Level 100: function that displays episodes on webpage for GOT show//
function makePageForEpisodes(episodeList) { 
  searchResult.innerHTML = "";
  container.innerHTML = "";
  dropDown.innerHTML = "";
  option.value = "";
  option.innerHTML = "Show All Episodes";
  dropDown.appendChild(option);
 
  // creates Episode Codes and the Names (Headings) for the DropDown Options //
  episodeList.forEach((episode) => {
    let option = document.createElement("option");
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
    }
    else {
       episode.style.display = "none";
     }
  });
  searchResult.innerHTML = `${episodeCount} of ${episodesAll.length} episodes available`;
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

window.onload = setup;


// Initial code for fetch and use of eventListener
// showDropDown.addEventListener("change", (show) => {
//   searchResult.style.display = "none";
//   selectedShow = show.target.value;
//   console.log(selectedShow);

//   fetch(`https://api.tvmaze.com/shows/${selectedShow}/episodes`)
//     .then((response) => response.json())
//     .then((episodes) => {
//       console.log(123);
//      })
// });
// 
    