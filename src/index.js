let addToy = false;

let url = 'http://localhost:3000/toys'

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


  fetch(url)
  .then(response => response.json())
  .then(data => {
    // data.forEach(toy => createCard(toy))
    data.forEach(element => renderToy(element))
  })



  const toyForm = document.getElementsByTagName('form')[0];
  
  toyForm.addEventListener("submit", function(e) {
    e.preventDefault();
    let toyName = toyForm.name.value;
    let toyImage = toyForm.image.value;

    let dataForm = {
      name: toyName,
      image: toyImage,
      likes: 0
    }
    
    renderToy(dataForm)
    postFetch(dataForm)

  })


  document.addEventListener("click", (e) => {
    let toyCollection = document.getElementById('toy-collection')

    e.preventDefault();
  
    if (e.target.matches(".like-btn")){
      let like = e.target.parentNode.querySelector('p').querySelector('span')
      let intLike = like.innerText = parseInt(like.innerText, 10) + 1;

      let likeNumber = {
        likes: (intLike)
      }
      let targetId = (e.target.parentNode.id)

      patchFetch((likeNumber), targetId)

    }
  })

  
});


function renderToy(toyObj) {
  // name, images, likes(num)
  let toyCollection = document.getElementById('toy-collection')
  let div = document.createElement('div')

  div.className = 'card'
  div.id = `${toyObj.id}`
  div.innerHTML = `
  <h2>Toy Name: ${toyObj.name}</h2>
  <p>Likes: <span>${toyObj.likes}</span></p>
  <img alt="" class='toy-avatar' src="${toyObj.image}" />
  <button class='like-btn'>Like</button>
  `
  toyCollection.appendChild(div)

}



function postFetch(data){
  fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "accept": "application/json"
    },
    body: JSON.stringify(data)
  })
} 

function patchFetch(data, id){
  fetch(`${url}/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      "accept": "application/json"
    },
    body: JSON.stringify(data)
  })
} 


