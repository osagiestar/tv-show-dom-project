// You can edit ALL of the code here

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const container = document.getElementById("container");
  const rootElem = document.getElementById("root");
  
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

window.onload = setup;
                              

