let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection");
  const toyUrl = "http://localhost:3000/toys";
  const newToyForm = document.querySelector(".add-toy-form")
  

  const fetchAllToys = () => {
    fetch(toyUrl)
    .then(function(response) {return response.json()})
    .then(function(toys) {toys.forEach(toy => createToy(toy))})
  }

  const postToy = (toy) =>{
    fetch(toyUrl, {
      method : 'POST',
      headers: {'content-type' : 'application/json', 'accept' : 'application/json'},
      body : JSON.stringify(toy)
    })
    .then(function(response) {return response.json()})
    .then(function(newToy) {createToy(newToy)})
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

  newToyForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    let name = e.target.querySelector('input').value;
    let imageUrl = e.target.querySelectorAll('input')[1].value;
    console.log(name, imageUrl);

    if  (name.length > 0 && imageUrl.length > 0 ){
      let newToy = {'name' : name, 'image' : imageUrl, 'likes' : 0};
      postToy(newToy);
      e.target.querySelector('input').value = null;
      e.target.querySelectorAll('input')[1].value = null;
    }
  })

  fetchAllToys();

});
