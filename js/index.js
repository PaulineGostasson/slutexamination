const MAIN_URL = "https://fathomless-shelf-54969.herokuapp.com";
const apiKey = "solaris-vKkkQHqQboi7c6JF";


let solaris = "";
let template = "";

async function getKey() {
  const response = await fetch(`${MAIN_URL}/keys`, { method: "POST" });
  const data = await response.json();
  console.log(data);
  return data.key;
}

async function getPlanetFacts(planets) {
  const myKey = await getKey();
  const response = await fetch(`${MAIN_URL}/bodies`, {
    headers: { "x-zocom": myKey },
  });
  solaris = await response.json();
  console.log(solaris);
  generatePlantInfos();
}

//togglar fram info ruta
const planetSlider = document.querySelector(".planet-info-slide");

function toggleInfo() {
  planetSlider.classList.toggle("show");
}

//return knapp
const returnHome = document.querySelector("button");

returnHome.addEventListener("click", () => {
    toggleInfo();
});

//Rensar info efter klick så sidan inte blir fylld av text
function clearInfoPlanet() {
    infoPlanet.innerHTML = "";
}

function clearMoonObj() {
    moonObj.innerHTML ="";
}

getPlanetFacts();

const infoPlanet = document.querySelector("article");
const planets = document.querySelectorAll("figure");
const planetColor = document.querySelector(".planet-art");

function generatePlantInfos() {
  solaris.bodies.forEach((planet_body_info) => {
    planets[planet_body_info.id].addEventListener("click", async () => {
      clearInfoPlanet();
      toggleInfo();
      template = `
            <article>
                <h1>${planet_body_info.name}</h1>
                <h4>${planet_body_info.latinName}</h4>
                <p class="info-planet">${planet_body_info.desc}</p>
                <h3 class="circum-header">OMKRETS: </h3>
                <p class="circum">${planet_body_info.circumference} km </p>
                <h3 class="max-temp-header">MAX TEMP: </h3>
                <p class="max-temp">${planet_body_info.temp.day}C</p>
                <h3 class="min-temp-header">MIN TEMP: </h3>
                <p class="min-temp">${planet_body_info.temp.night}C</p>
                <h3 class="distance-header">KM FRÅN SOLEN: </h3>
                <p class="distance">${planet_body_info.distance} km </p>
                <h3 class="moon-header">MÅNAR: </h3>
                <p class="moon"></p>
            </article>`;
      infoPlanet.insertAdjacentHTML("beforeend", template);

      const moonObj = document.querySelector(".moon");
      let moons = planet_body_info.moons;
      moons.forEach((moon) => {
        console.log(moon);
      let moonTemplate = `<div class="moon">${moon}, </div>`;
      moonObj.insertAdjacentHTML("beforeend", moonTemplate);
    });
    if (planet_body_info.id === 1) {
    planetColor.style.backgroundColor = "#888888";
    } else if (planet_body_info.id === 2) {
      planetColor.style.backgroundColor = "#E7CDCD";
    } else if (planet_body_info.id === 3) {
      planetColor.style.backgroundColor = "#428ED5";
    } else if (planet_body_info.id === 4) {
      planetColor.style.backgroundColor = "#EF5F5F";
    } else if (planet_body_info.id === 5) {
      planetColor.style.backgroundColor = "#E29468";
    } else if (planet_body_info.id === 6) {
      planetColor.style.backgroundColor = "#C7AA72";
    } else if (planet_body_info.id === 7) {
      planetColor.style.backgroundColor = "#C9D4F1";
    } else if (planet_body_info.id === 8) {
      planetColor.style.backgroundColor = "#7A91A7";
    } else {
      planetColor.style.backgroundColor = "#FFD029";
    }
    clearMoonObj();
    clearPlanetColor();
  });
});
}
