let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection");
  const toyUrl = "http://localhost:3000/toys";

  const fetchAllToys = () => {
    fetch(toyUrl)
    .then(function(response) {return response.json()})
    .then(function(toys) {toys.forEach(toy => createToy(toy))})
  }

  const createToy = (toy) => {
    let div = document.createElement('div');
    div.className = "card"
    div.innerHTML = `
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>
    `
    toyCollection.appendChild(div);
  }

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetchAllToys();

});
