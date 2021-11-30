console.log('%c HI', 'color: firebrick')
let breeds = [];

document.addEventListener('DOMContentLoaded', function () {
    fetchImages();
    fetchBreeds();
});

function fetchImages() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    fetch(imgUrl)
    .then(resp => resp.json())    
    .then(results => {
        results.message.forEach(image => addImage(image))
    });
}

function addImage(url) {
    let container = document.querySelector('#dog-image-container');
    let newImage = document.createElement('img');
    newImage.src = url;
    container.appendChild(newImage);
}

function fetchBreeds() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    fetch(breedUrl)
      .then(resp => resp.json())
      .then(results => {
        breeds = Object.keys(results.message);
        listBreeds(breeds);
        addBreedDropdownListener();
      });
  }

  function listBreeds(breeds) {
    let ul = document.querySelector('#dog-breeds');
    while (ul.firstChild) {
        ul.removeChild(ul.lastChild);
      }
    breeds.forEach(breed => addBreed(breed));
  }

  function addBreed(breed) {
    let ul = document.getElementById("dog-breeds");
    let li = document.createElement("li");
    li.innerText = breed;
    ul.appendChild(li);
    li.addEventListener("click", changeColor);
  }

  function changeColor(event) {
    event.target.style.color = "green";
  }

  function filterBreedsBy(letter) {
    listBreeds(breeds.filter(breed => breed.startsWith(letter)));
  }

  function addBreedDropdownListener() {
    let breedDropdown = document.querySelector('#breed-dropdown');
    breedDropdown.addEventListener('change', function (event) {
      filterBreedsBy(event.target.value);
    });
  }