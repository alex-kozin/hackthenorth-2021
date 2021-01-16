// === Initialize Variables ===
const log = console.log

let socket = io();

const startingSection = document.querySelector('.starting-section')
let startButton = document.getElementById('startButton')
let events = document.getElementById('events')
let matching = document.querySelector('.matching')

// === Client Sockets ===

socket.on('connect', () => {
    log('Connection Successful!')
});

socket.on('startGame', () => {
    log("client: startGame received")
    hideStartButton()
    socket.emit('userListUpdate', socket.id)
})

socket.on('finishMatching', (p2Id, p2Username) => {
    removeAllChildNodes(matching)

    let title = document.createElement("h3");
    let text = document.createTextNode("You are matched with " + p2Username)
    title.appendChild(text)
    matching.appendChild(title)
    // run play game function
    alert("Ready to play!")
})

socket.on('WaitingOtherPlayer', () => {
    removeAllChildNodes(matching)

    let title = document.createElement("h3");
    let text = document.createTextNode("Waiting for other players")
    title.appendChild(text)
    matching.appendChild(title)
})

// === JS functions ===

startButton.addEventListener('click', () => {
    log(`client ${socket.id}: Finding player...`)
    const username = document.querySelector("#username").value
    socket.emit('findPlayer', username, socket.id)
})

const hideStartButton = () => {
    startButton.style.display = "none"
    startingSection.style.display = "none"
}

const newItem = (content) => {
  const item = document.createElement('li')
  item.innerText = content
  return item
};

const removeAllChildNodes = async (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
