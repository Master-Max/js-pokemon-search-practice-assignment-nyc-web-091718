document.addEventListener('DOMContentLoaded', () => {
  //YOUR CODE HERE
  const pokemonContainer = document.getElementById("pokemon-container");
  const pokemonSearchForm = document.getElementById("pokemon-search-form");
  const noPokemonMsg = document.querySelector("#pokemon-container center");
  let allPokemon = [];

  fetch('http://localhost:3000/pokemon')
    .then((response) => response.json())
	  .then((myJson)=>{
      allPokemon = myJson;
      renderPokemon()
      addListenerToPokemonImages()
    });
    function renderPokemon(){
      allPokemon.forEach((poke)=>{
        const newPokemon = `
        <div class="pokemon-container">
          <div style="width:230px;margin:10px;background:#fecd2f;color:#2d72fc" class="pokemon-frame">
            <h1 class="center-text">${poke.name}</h1>
            <div style="width:239px;margin:auto">
              <div style="width:96px;margin:auto">
                <img data-id="${poke.id}" data-action="flip" data-alt-image="${poke["sprites"].back}" class="toggle-sprite" src="${poke["sprites"].front}">
              </div>
            </div>
          </div>
        </div>`
        pokemonContainer.innerHTML += newPokemon;
      });
    }
    function addListenerToPokemonImages(){
      const imgs = Array.from(document.querySelectorAll(".pokemon-container img"));
      imgs.forEach(function(img){
        img.addEventListener('click', function(eve){
          let tmpImg = eve.target;
          let tmp = tmpImg.src;
          tmpImg.src = tmpImg.dataset.altImage;
          tmpImg.dataset.altImage = tmp;
        });
      });
    }

    function searchPokemon(){
      let input = document.getElementById('pokemon-search-input').value;
      Array.from(document.querySelectorAll(".pokemon-container")).forEach((entry)=>{
        if (!entry.innerText.includes(input) && entry.hidden === false){
          entry.hidden = true;
        } else if (entry.innerText.includes(input) && entry.hidden === true){
          entry.hidden = false;
        }
      });
    }
    pokemonSearchForm.addEventListener('keyup', searchPokemon);
})
