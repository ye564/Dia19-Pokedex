const poke_container = document.getElementById('poke-container');
const pokemon_count = 649;
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4', 
	normal: '#F5F5F5'
}

const main_types = Object.keys(colors)
console.log(main_types)
const fetchPokemons = async () => {
    for(let i = 1; i <= pokemon_count; i++) {
        await getPokemon(i)
    }
}

const getPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url)
    const data = await res.json()
    createPokemonCard(data)
	// console.log(data);
}

const createPokemonCard = (data) => {
    const cardPokemon= document.createElement('div');
	cardPokemon.classList.add('data')   ;
	const name = data.name
	const id = data.id
    const image= data.sprites.other.dream_world.front_default;
	const type = data.types[0].type.name
	const [hp, attack, defense]=[data.stats[0].base_stat, data.stats[1].base_stat, data.stats[2].base_stat]
    const color= colors[type]

	const pokemonInnerData= `
	<div class='img-container'>
	    <img src="${image}" />
	</div>

     <div class='info'>
	    <span class='id'>#${id.toString().padStart(3,'0')}	</span>
	    <h2 class='name'>${name} </h2>
	    <p class='type'> type: <span> ${type}</span></p>
	 </div>

     <div class='stat'>
	    <h3>Basic Stats</h3>
	    <p>HP: ${hp}</p>
	    <p>ATTACK: ${attack}</p>
	    <p>DEFENSE: ${defense}</p>
	 </div>

	
	`
	cardPokemon.style.background=color
	cardPokemon.innerHTML = pokemonInnerData;
	poke_container.appendChild(cardPokemon)
}

fetchPokemons()