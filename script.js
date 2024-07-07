// Endpoint for all pokemon data
const pokeEndpoint = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

//All necessary elements in HTML doc
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const imageContainer = document.getElementById("image-holder");

const poke_name = document.getElementById("pokemon-name");
const poke_id = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
types.innerHTML = ``;
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const spAttack = document.getElementById("special-attack");
const spDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

/*Method to return promise of a fetch call to a given endpoint
@param endpoint: a valid url to getch data from
*/
const getData = async (endpoint) => {
  try {
    const res = await fetch(endpoint);
    return await res.json();
  } catch (err) {
    alert(`There was an error loading the pokemon_1 ${endpoint}`);
  }
};

/* Called when user presses search button. Displays the pokemon stats based on user input
 */
const searchPoke = async () => {
  let validPoke = false; // flag for whether user provides a valid pokemon id or name
  const userInput = searchInput.value;
  let pokeUrl; // url for a specific pokemon

  let data = await getData(pokeEndpoint);
  types.innerHTML = ``;

  // if fetch call for obtaining all pokemon is successful, iterate over all pokemon until one that matches user input is found
  if (data) {
    let allPoke = data.results;

    allPoke.forEach(({ id, name, url }, index) => {
      if (userInput == id || userInput.toLowerCase() == name) {
        pokeUrl = url;
        validPoke = true;
      }
    });

    if (pokeUrl) {
      data = await getData(pokeUrl);
    }

    if (validPoke && data) {
      poke_name.innerHTML = data.name.toUpperCase();
      poke_id.innerHTML = data.id;
      weight.innerHTML = `Weight: ${data.weight}`;
      height.innerHTML = `Height: ${data.height}`;
      let allStats = data.stats;

      allStats.forEach(({ base_stat, stat }, index) => {
        switch (stat.name) {
          case "hp":
            hp.innerHTML = base_stat;
            break;
          case "attack":
            attack.innerHTML = base_stat;
            break;
          case "defense":
            defense.innerHTML = base_stat;
            break;
          case "special-attack":
            spAttack.innerHTML = base_stat;
            break;
          case "special-defense":
            spDefense.innerHTML = base_stat;
            break;
          case "speed":
            speed.innerHTML = base_stat;
            break;
        }
      });
      const imgSrc = data.sprites.front_default;
      const allTypes = data.types;
      allTypes.forEach(({ type }, index) => {
        types.innerHTML += `<p>${type.name.toUpperCase()} </p>`;
      });
      console.log(types.childElementCount);
      imageContainer.innerHTML = `<img src = ${imgSrc} id ="sprite">`;
    } else {
      alert("Pokémon not found");
    }
  } else {
    alert("There was an error loading the pokemon");
  }
};

searchButton.addEventListener("click", searchPoke);
