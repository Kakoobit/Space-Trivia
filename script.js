var factList = [
  "The first human-made object to reach space was the V-2 rocket in 1944.",
  "The Moon is Earth's only natural satellite and the fifth largest moon in the Solar System.",
  "The Hubble Space Telescope has been orbiting Earth since 1990.",
  "Neil Armstrong and Buzz Aldrin were the first humans to walk on the Moon during Apollo 11 in 1969.",
  "Mars has the largest volcano in the Solar System, Olympus Mons.",
  "The Voyager 1 spacecraft is the farthest human-made object from Earth, launched in 1977.",
  "Jupiter has 79 known moons, the most of any planet in our Solar System.",
  "The International Space Station (ISS) has been continuously inhabited since November 2000.",
  "Saturn's rings are made of ice and rock particles ranging in size from dust to mountains.",
  "SpaceX's Falcon Heavy is the most powerful operational rocket as of 2024.",
  "Venus rotates in the opposite direction to most planets in the Solar System.",
  "The Sun accounts for 99.86% of the mass of the entire Solar System.",
  "Pluto was reclassified from a planet to a dwarf planet in 2006.",
  "The James Webb Space Telescope was launched in 2021 to study the early universe.",
  "The Milky Way galaxy is estimated to contain 100–400 billion stars.",
  "The first artificial satellite, Sputnik 1, was launched by the Soviet Union in 1957.",
  "A day on Venus is longer than a year on Venus due to its slow rotation.",
  "The Kuiper Belt is a region of the Solar System beyond Neptune, home to dwarf planets like Pluto.",
  "The Mars Rover Perseverance landed on Mars in 2021 to search for signs of ancient life.",
  "xd",
]

var fact = document.getElementById('fact');
var factBu = document.getElementById('factBu');
var count=0;

if (factBu) {
  factBu.addEventListener('click',displayFact);
}

function displayFact(){
  fact.innerHTML= factList[count];
  count++;
  if(count==factList.length) {
    count=0
  }
}