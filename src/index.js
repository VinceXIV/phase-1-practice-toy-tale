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


  //Add toy info to the card

  fetch('http://localhost:3000/toys')
  .then(result => result.json())
  .then(data => {
    for(item of data){
      document.getElementById('toy-collection')
      .append(createCard(item))
    }
  })
});


function createCard(item){
  const itemCard = document.createElement('div')
  itemCard.classList.add('card')
  itemCard.innerHTML = `<h2>${item.name}</h2>
  <img src="${item.image}" class="toy-avatar" />
  <p>${item.likes} Likes</p>
  <button class="like-btn" id="${item.id}">Like ❤️</button>`

  return itemCard
}