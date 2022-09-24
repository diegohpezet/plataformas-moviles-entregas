document.addEventListener("DOMContentLoaded", async function renderEverything(){
    fetchKantoPokemon();
})

function fetchKantoPokemon(){
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(response => response.json())
    .then(function(allpokemon){
        allpokemon.results.forEach(function(pokemon){
            fetchPokemonData(pokemon);
        })
    })
  }

function fetchPokemonData(pokemon){
    let url = pokemon.url // <--- this is saving the pokemon url to a variable to use in the fetch. 
                                //Example: https://pokeapi.co/api/v2/pokemon/1/"
    fetch(url)
    .then(response => response.json())
    .then(function(pokeData){
        renderPokemon(pokeData)
    })
}

async function renderPokemon(pokeData){
    let allPokemonContainer = document.getElementById('poke-container');
    let pokeContainer = document.createElement("div") //div will be used to hold the data/details for indiviual pokemon.{}
    pokeContainer.classList.add('card', 'm-1','p-2', 'col-xs-12', 'col-sm-6', 'col-md-3', 'col-lg-2','shadow');

    let pokeDescription = document.createElement('div')
    pokeDescription.classList.add('accordion')
    pokeDescription.id = pokeData.name+"_description"
    createDescription(pokeData, pokeDescription)

    let pokeNumber = document.createElement('p')
    pokeNumber.innerText = `#${pokeData.id}`

    let pokeImage = document.createElement('img')
    pokeImage.setAttribute('src',pokeData.sprites.front_default)
  
    let pokeTypes = document.createElement('div')
    createTypes(pokeData.types, pokeTypes) // helper function to go through the types array and create li tags for each one

    pokeContainer.append(pokeDescription, pokeImage, pokeTypes);   //appending all details to the pokeContainer div
    allPokemonContainer.appendChild(pokeContainer);       //appending that pokeContainer div to the main div which will                                                             hold all the pokemon cards
}

function createTypes(types, container){   
    let typeLi = document.createElement('div');
    typeLi.classList.add('img-responsive','d-flex','justify-content-center','m-1')

    types.forEach(function(type){
        let typeName = type['type']['name'];
        
        let typeImg = document.createElement('img')
        typeImg.setAttribute('src','img/'+typeName+'.ico')
        typeImg.setAttribute('style','width: 2rem; margin:2px')

        typeLi.append(typeImg)
        container.append(typeLi)
    })
}

function createDescription(data, container){
    container.innerHTML = `<div class="accordion-item">
    <h2 class="accordion-header" id="heading">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${data.name}" aria-expanded="false" aria-controls="collapseOne">
        ${data.name.toUpperCase()}
      </button>
    </h2>
    <div id="${data.name}" class="accordion-collapse collapse collapse" aria-labelledby="heading" data-bs-parent="#${data.name}">
      <div class="accordion-body">
        <div class="row">
          <div class="col">
            #${data.id}
          </div>
        <div>
        <div class="row">
          <div class="col">
            <i class="fa fa-ruler-vertical"></i> ${data.height/10}mts
          </div>
          <div class="col">
            <i class="fa fa-weight"></i> ${data.weight/10}kg
          </div>
        </div>
        <div class="row">
          <div class="col">
            Base Exp: ${data.base_experience}
          </div>
        </div>
      </div>
    </div>
  </div>`
}