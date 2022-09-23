document.addEventListener("DOMContentLoaded", function renderEverything(){
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


function renderPokemon(pokeData){
    let allPokemonContainer = document.getElementById('poke-container');
    let pokeContainer = document.createElement("div") //div will be used to hold the data/details for indiviual pokemon.{}
    pokeContainer.classList.add('card', 'm-1','p-2', 'col-xs-12', 'col-sm-6', 'col-md-4', 'col-lg-3','shadow');

    let pokeName = document.createElement('h4')
    pokeName.classList.add('text-center') 
    pokeName.innerText = pokeData.name.toUpperCase()

    let pokeNumber = document.createElement('p')
    pokeNumber.innerText = `#${pokeData.id}`

    let pokeImage = document.createElement('img')
    pokeImage.setAttribute('src',pokeData.sprites.front_default)
  
    let pokeTypes = document.createElement('div')
    createTypes(pokeData.types, pokeTypes) // helper function to go through the types array and create li tags for each one

    let pokeDescription = document.createElement('div')
    pokeDescription.classList.add('accordion')
    createDescription(pokeDescription)

    pokeContainer.append(pokeName, pokeImage, pokeTypes,pokeDescription);   //appending all details to the pokeContainer div
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

function createDescription(container){
    let mainBox = document.createElement('div')
    mainBox.classList.add('accordion-item')

    let header = document.createElement('h2')
    header.classList.add('accordion-header')

    let btn = document.createElement('button')
    btn.classList.add('accordion-collapse','collapse')
    //no matarme y usar https://stackoverflow.com/questions/62233420/creating-an-accordion-through-javascript
    container.append(mainBox)
    mainBox.append(header)
    header.append(btn)
}