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


  //Add a new toy
  const addToyForm = document.querySelector('form.add-toy-form')
  addToyForm.addEventListener('submit', event =>{
    event.preventDefault()

    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
        "Accept": "application/json"
      },
      body:JSON.stringify({
        "name": addToyForm.querySelector('input[name = "name"]').value,
        "image": addToyForm.querySelector('input[name = "image"]').value,
        "likes": 0,
      })
    })
    .then(result => result.json())
    .then(item => {
      document.getElementById('toy-collection')
      .append(createCard(item))
    })
  })

});


function createCard(item){
  const itemCard = document.createElement('div')
  itemCard.classList.add('card')
  itemCard.innerHTML = `<h2>${item.name}</h2>
  <img src="${item.image}" class="toy-avatar" />
  <p>${item.likes} Likes</p>
  <button class="like-btn" id="${item.id}">Like ❤️</button>`


  //Increase a Toy's Likes
  const likeBtn = itemCard.querySelector('.like-btn')
  likeBtn.addEventListener('click', updateCard)

  return itemCard
}


function updateCard(item){
  const imgUrl = item.target.parentNode.querySelector('img').src
  const imgName = item.target.parentNode.querySelector('h2').textContent
  const imgId = item.target.parentNode.querySelector('button.like-btn').id
  const noOfLikes = parseInt(item.target.parentNode.querySelector('p').textContent[0]) + 1

  console.log(imgName)
  fetch(`${imgUrl}/${imgId}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": imgName,
      "image": imgUrl,
      "likes": noOfLikes
    })
  })
  .then(result => result.json())
  .then(data => {
    item.target.parentNode.querySelector('p').textContent = `${noOfLikes} ${item.target.parentNode.querySelector('p').textContent.splice(1)}`
  })
}