// You can edit ALL of the code here

let allEpisodes;
function setup() {
  allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes); 
};

let dropDown = document.getElementById("listEpisodes");
// Level 100: function that displays episodes on webpage after load action //
function makePageForEpisodes(episodeList) {
  const container = document.getElementById("container");
  const option = document.createElement("option");
  option.value = "";
  option.innerHTML = "Show All Episodes";
  dropDown.appendChild(option);

  // creates Episode Codes and the Names (Headings) for the DropDown Search Options //
  episodeList.forEach((episode) => {
    let option = document.createElement("option");
    option.value = episode.name;
    option.innerHTML = `S${zeroPadded(episode.season)} 
    E${zeroPadded(episode.number)} - ${episode.name}`;
    dropDown.appendChild(option);
   
    // creates a div for every episode and adds the info or details for the Search Input Option //
    container.innerHTML += `<div>
    <h3>${episode.name} - S${zeroPadded(episode.season)} 
    E${zeroPadded(episode.number)} </h3>
    <img src= "${episode.image.medium}" alt "">
    ${episode.summary}
    </div>`;
  })
  searchResult.innerHTML = `${episodeList.length} of ${allEpisodes.length} episodes selected`;
};

// function adds "0" to the Episode number to give it a double digit // 
function zeroPadded(episodeCode) {
  return episodeCode.toString().padStart(2, 0);
};

// Level 200: Search Input with eventListener for Input Search and count of Episodes //  
document.addEventListener("keydown", () => {
  let episodesAll = document.querySelectorAll("#container div");
  let searchInput = document.getElementById("searchInput").value;
  let searchResult = document.getElementById("searchResult");
  let episodeCount = 0;
  console.log(searchInput);
  episodesAll.forEach((episode) => {
   
    if (episode.innerHTML.toLowerCase().includes(searchInput.toLowerCase())) {
      episode.style.display = "";
      episodeCount++;
    } else 
    {
      episode.style.display = "none";
     
    }; 
    searchResult.innerHTML = `${episodeCount} of ${episodesAll.length} episodes selected`;
  })
})
  
  // Level 300: EventListener for the DropDown selector
dropDown.addEventListener("change", episode => {
  console.log(episode.target.value);
  let episodesAll = document.querySelectorAll("#container div");
  let searchInput = episode.target.value;
  let searchResult = document.getElementById("searchResult");
  let episodeCount = 0;
  console.log(searchInput);
  episodesAll.forEach((episode) => {
    let episodeName = episode.querySelector("h3");
    console.log(episodeName.innerHTML.toLowerCase().includes(searchInput.toLowerCase()));
    if (episodeName.innerHTML.toLowerCase().includes(searchInput.toLowerCase())) {
      episode.style.display = "";
      episodeCount++;
    } else {
      episode.style.display = "none";

    };
    searchResult.innerHTML = `${episodeCount} of ${episodesAll.length} episodes selected`;
  })
});

    window.onload = setup;

  