// You can edit ALL of the code here

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes); 
  console.log(allEpisodes)
};

function makePageForEpisodes(episodeList) {
  const container = document.getElementById("container");
  
  let allEpisodes;
  // creates a div for every episode and adds the info or details //  
  episodeList.forEach((episode) => {
    let searchResult = document.getElementById("searchResult");
    container.innerHTML += `<div>
    <h2>${episode.name} - S${zeroPadded(episode.season)} 
    E${zeroPadded(episode.number)} </h2>
    <img src= "${episode.image.medium}" alt "">
    ${episode.summary}
    </div>`;
  })
  searchResult.innerHTML = `${episodeList.length} of ${allEpisodes.length} episodes selected`;
};

// function adds "0" to number to give it a double digit // 
function zeroPadded(episodeCode) {
  return episodeCode.toString().padStart(2, 0);
};

// let episodesAdd;
  
document.addEventListener("keyup", () => {
  let episodesAll = document.querySelectorAll("#container div");
  let searchInput = document.getElementById("searchInput").value;

  // console.log(searchInput);
  // episodesAll.forEach((episode) => {
  
  //   if (episode.innerHTML.toLowerCase().includes(searchInput.toLowerCase()))
  //   // episode.name.toUpperCase().includes(searchInput.toUpperCase())) 
  //   // || episode.summary.toUpperCase().includes(searchInput.toUpperCase())) 
  //   {
  //     episode.style.display = "";
  //     console.log(episode.style.display = "");
  //   } else {
  //     episode.style.display = "none";
  //   }; 

  // })

  filteredList = allEpisodes.filter((episode) => {
    if (episode.name.toUpperCase().includes(searchInput.toUpperCase())
    || episode.summary.toUpperCase().includes(searchInput.toUpperCase()))
    // if (episode.innerHTML.toLowerCase().includes(searchInput.toLowerCase()))
    {
      episode.style.display = "";
    } else 
    {
      episode.style.display = "none";
    } 
  makePageForEpisodes(filteredList);
   
});
});
// console.log(episodesAdd);

  window.onload = setup;
