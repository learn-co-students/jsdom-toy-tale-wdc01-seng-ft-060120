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


  // fetch toys from url

  const toyCollection = document.getElementById('toy-collection')

  const url = 'http://localhost:3000/toys'

  fetch(url)
    .then(resp => resp.json())
    .then(toys => renderToys(toys))

  const renderToys = (toys) =>{
    toys.forEach( (toy) => {
      renderToy(toy)
    })
  }

  const renderToy = (toy) => {
    const card = document.createElement('div')
      card.class = 'card'

      const cardBody = `
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes} Likes </p>
        <button class="like-btn">Like <3</button>
      `
      card.innerHTML = cardBody
      toyCollection.prepend(card)
  }

  const submitButton = document.querySelector('.submit')
  const form = document.querySelector('.add-toy-form')
  
  form.addEventListener('submit', (e) => {
    
    e.preventDefault()
    
    // create a post request to 
    fetch(url, {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": `${form.name.value}`,
        "image": `${form.image.value}`,
        "likes": 0
      })
    })
    .then(resp => resp.json())
    .then(toy => renderToy(toy))
  })
});
