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
    toyCard.id = `${toy.id}`
    toyCard.innerHTML = `
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p><span id="likeNum">${toy.likes}</span> Likes </p>
      <button class="like-btn">Like <3</button>`
    toyCollection.append(toyCard)
    });
  }
  const toyForm = document.querySelector(".add-toy-form")

  toyForm.addEventListener("submit", function(e){
    let formData = {
      'name': `${e.target.name.value}`,
      'image': `${e.target.image.value}`,
      'likes': 0
    };
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData)
    };
    
    fetch("http://localhost:3000/toys", configObj)
    .then(resp => resp.json())
    .then(console.log)

  });

  document.addEventListener('click', function(e){
    if(e.target.className == "like-btn"){
      let targetObj = e.target.closest('div'); //gets parent card div of button clicked
      let likeNum = targetObj.querySelector('#likeNum') //gets span where number of likes is displayed
      // configObject abstracted from/for .fetch()
      let configObj = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({"likes": (parseInt(likeNum.innerHTML) + 1)}) //pulling number from likeVal above^^
      };
      fetch(`http://localhost:3000/toys/${targetObj.id}`, configObj)
        .then(resp => resp.json())
        .then(obj => likeNum.innerHTML = obj.likes) // changing likeVal to new, incremented number returned from database (obj.likes).
      
    }
  });

});
