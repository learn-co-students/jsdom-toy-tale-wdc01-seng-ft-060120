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
  fetchToys();
  const container = document.getElementById('toy-collection')
  container.addEventListener('click',increaseLikes);
});
function increaseLikes(eventObj)
{
  const tgt = eventObj.target
  if(tgt.className === 'like-btn')
  {
    const parent = tgt.parentElement
    const span = parent.querySelector('p > span');    
    span.innerText = (parseInt(span.innerText) + 1);    
    updateLikes(parent.dataset.id,span.innerText);

  }  
}
//update the specific toys amount of likes in the server
function updateLikes(id,likes)
{   
  const configObj =
  {    
    method: "PATCH", 
    headers: 
    {
      "Content-Type": "application/json",
      "Accept":       "application/json"
    },
    body: JSON.stringify({
      "likes": likes
    })
  };
  fetch(`http://localhost:3000/toys/${id}`,configObj)
  .then(response => response.json())
  .then(newResponse => console.log(newResponse))
  .catch(error => console.log(error));
}
function fetchToys()
{
  const toysUrl = "http://localhost:3000/toys";
  fetch(toysUrl)
  .then(toyPromise => toyPromise.json())
  .then(newPromise => addToysToDOM(newPromise))
  .catch(error => console.log(error.message))
}
function addToysToDOM(toysPromise)
{
  console.log(toysPromise)
  for(const toy of toysPromise)
  {
    const div = document.createElement('div');
    div.dataset.id = toy.id;
    div.className = 'card';
    const h2     = document.createElement('h2');
    const img    = document.createElement('img');
    const p      = document.createElement('p');
    const button = document.createElement('button');    

    h2.innerText = toy.name;
    img.src = toy.image;
    img.className = 'toy-avatar'
    p.innerHTML = `<span>${toy.likes}</span> likes` ;
    button.innerHTML = "&hearts; like";
    button.className = 'like-btn';

    //append all tags
    document.getElementById('toy-collection').append(div)
    for(const tag of [h2,img,p,button])
    {
      div.append(tag);
    }
  }
}