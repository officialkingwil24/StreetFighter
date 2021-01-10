let allStreetfighter = document.getElementById('allStreetfighter');
let singleView = document.getElementById('singleView');
function addStreetfighter(e){
    let streetfighter = {
    name: document.getElementById('name').value,
    nickname: document.getElementById('nickname').value,
    power: document.getElementById('power').value,
    health: document.getElementById('health').value,
    mobility: document.getElementById('mobility').value,
    techniques: document.getElementById('techniques').value,
    range: document.getElementById('range').value,
    occupation: document.getElementById('occupation').value,
    style: document.getElementById('style').value,
    skill: document.getElementById('skill').value,
    image: document.getElementById('image').value
    }
    fetch('http://localhost:3000/streetfighter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(streetfighter)
    })
    .then(res => res.json())
    .then(getStreetfighter)
    .catch(error => console.log(error))
}

function getStreetfighter(){
    allStreetfighter.innerHTML = '';

    fetch('http://localhost:3000/streetfighter', {method: 'GET'})
    .then(res => res.json())
    .then(res => {
        res.forEach(streetfighter => {
            let card = document.createElement('div');
            let buttons = document.createElement('div');
            let delButton = document.createElement('button');
            let viewButton = document.createElement('button');

            card.setAttribute('id', streetfighter.id);
            card.setAttribute('class', 'card');
            card.setAttribute('style', `background-image: url(${streetfighter.image || ''})`)
            buttons.setAttribute('class', 'streetfighterButtonsContainer');
            delButton.setAttribute('class', 'delStreetfighter');
            viewButton.setAttribute('class', 'delStreetfighter');

            delButton.onclick = (event) => deleteStreetfighterById(event);
            viewButton.onclick = (event) => viewStreetfighterById(event);

            delButton.innerText = `Delete ${streetfighter.name}`;
            viewButton.innerText = `View ${streetfighter.name}`;

            buttons.appendChild(viewButton);
            buttons.appendChild(delButton);

            card.appendChild(buttons);

            allStreetfighter.appendChild(card)

            console.log(streetfighter)
        });
    })
    .catch(error => console.log(error))
}

function deleteStreetfighterById(event){
    fetch(`http://localhost:3000/streetfighter/${event.target.parentNode.parentNode.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(getStreetfighter)
    .catch(error => console.log(error))
}

function viewStreetfighterById(event){
    singleView.innerHTML = '<button id="closeButton" onclick=hidePopup(event)>X</button>';
    singleView.setAttribute('style', 'display: flex')
    fetch(`http://localhost:3000/streetfighter/${event.target.parentNode.parentNode.id}`, {method: 'GET'})
    .then(res => res.json())
    .then(streetfighter => {
        let name = document.createElement('div');
        let nickname = document.createElement('div');
        let power = document.createElement('div');
        let health = document.createElement('div');
        let mobility = document.createElement('div');
        let techniques = document.createElement('div');
        let range = document.createElement('div');
        let occupation = document.createElement('div');
        let style = document.createElement('div');
        let skill = document.createElement('div');
        let image = document.createElement('img');

        name.innerText = `${streetfighter[0].name}`
        nickname.innerText = `${streetfighter[0].nickname}`
        power.innerText = `${streetfighter[0].power}`
        health.innerText = `${streetfighter[0].health}`
        mobility.innerText = `${streetfighter[0].mobility}`
        techniques.innerText = `${streetfighter[0].techniques}`
        range.innerText = `${streetfighter[0].range}`
        occupation.innerText = `${streetfighter[0].occupation}`
        style.innerText = `${streetfighter[0].style}`
        skill.innerText = `${streetfighter[0].skill}`
        image.src = `${streetfighter[0].image}`

        singleView.appendChild(name);
        singleView.appendChild(nickname);
        singleView.appendChild(power);
        singleView.appendChild(health);
        singleView.appendChild(mobility);
        singleView.appendChild(techniques);
        singleView.appendChild(range);
        singleView.appendChild(occupation);
        singleView.appendChild(style);
        singleView.appendChild(skill);
        singleView.appendChild(image);
    })
    .catch(error => console.log(error))
}

function editStreetfighter(){
    let id = document.getElementById('id').value;
    let streetfighter = {
        name: document.getElementById('name').value,
        nickname: document.getElementById('nickname').value,
        power: document.getElementById('power').value,
        health: document.getElementById('health').value,
        mobility: document.getElementById('mobility').value,
        techniques: document.getElementById('techniques').value,
        range: document.getElementById('range').value,
        occupation: document.getElementById('occupation').value,
        style: document.getElementById('style').value,
        skill: document.getElementById('skill').value,
        image: document.getElementById('image').value
    }   

    fetch(`http://localhost:3000/Streetfighter/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(streetfighter)
    })
    .then(res => res.json())
    .then(getStreetfighter)
    .catch(error => console.log(error))
}

function hidePopup(event){
    singleView.setAttribute('style', 'display: none')
}