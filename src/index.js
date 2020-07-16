let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  const toyCollection = document.getElementById('toy-collection')
  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(data => makeToyCards(data));

  function makeToyCards(toyArr) {
    toyArr.forEach(toy => {
    toyCard = document.createElement("div")
    toyCard.className = "card"
    toyCard.innerHTML = `
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button class="like-btn">Like <3</button>`
    toyCollection.append(toyCard)
    });
  }


});
