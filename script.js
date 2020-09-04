// You can edit ALL of the code here

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const container = document.getElementById("container");
  
  // creates a div for every episode and adds the info or details //  
  episodeList.forEach((episode) => {
    container.innerHTML += `<div>
    <h2>${episode.name} - S${zeroPadded(episode.season)} 
    E${zeroPadded(episode.number)} </h2>
    <img src= "${episode.image.medium}" alt "">
    ${episode.summary}
</div>`;
  
// function adds "0" to number to give it a double digit // 
  function zeroPadded(episodeCode) {
  return episodeCode.toString().padStart(2, 0); 
  }
  })
};

// let episodesAdd;
  
document.addEventListener("keyup", () => {
  let episodesAll = document.querySelectorAll("#container div");
  let searchInput = document.getElementById("searchInput").value;

  let searchResult = document.getElementById("searchResult");
  
  console.log(searchInput);
  episodesAll.forEach((episode) => {
  
    if (episode.innerHTML.toLowerCase().includes(searchInput.toLowerCase()))
    // episode.name.toUpperCase().includes(searchInput.toUpperCase())) 
    // || episode.summary.toUpperCase().includes(searchInput.toUpperCase())) 
    {
      episode.style.display = "";
      console.log(episode.style.display = "");
    } else {
      episode.style.display = "none";
    }; 
    searchResult.innerHTML = `${episodesAll.length} of ${episodesAll.length} episodes selected`;
  })
  
 
});
// console.log(episodesAdd);

  window.onload = setup;
