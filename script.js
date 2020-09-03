// You can edit ALL of the code here

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const container = document.getElementById("container");
  // const rootElem = document.getElementById("root"); 
  
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
  // console.log(episodeAll);
  // const allEpisodes = getAllEpisodes();
 
   let searchInput = document.getElementById("searchInput").value;
   
  let searchResult = document.getElementById("searchResult");
  // searchResult = [];
  console.log(searchInput);
  episodesAll.forEach((episode) => {
    console.log(episode.innerHTML);
    if (episode.innerHTML.toLowerCase().includes(searchInput.toLowerCase()))
    // episode.name.toUpperCase().includes(searchInput.toUpperCase())) 
    // || episode.summary.toUpperCase().includes(searchInput.toUpperCase())) 
    {
      episode.style.display = "";
    } else {
      episode.style.display = "none"};
})
});
// console.log(episodesAdd);

  window.onload = setup;


// let episodeVar = getAllEpisodes()
    // // filterResult = episodeList.filter(episode) 
    // searchFilter = episodeVar.filter() {
    //    console.log(episodeVar);
    // };
   
    // if (episode.name || episode.summary) {
    //   searchResult.style.display = ""
    // } else {
    //   searchResult.style.display = "none";
    // 

// {
//   searchResult.innerHTML =
//   `<div>
//     <h2>${episode.name} - S${zeroPadded(episode.season)} 
//     E${zeroPadded(episode.number)} </h2>
//     <img src= "${episode.image.medium}" alt "">
//     ${episode.summary}
//     </div>`
// }
// {
//   episode.style.display = "none";
// }