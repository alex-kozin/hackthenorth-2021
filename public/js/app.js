// === Initialize Variables ===
const log = console.log

let socket = io();

const startingSection = document.querySelector('.starting-section')
let startButton = document.getElementById('startButton')
let events = document.getElementById('events')

// === Client Sockets ===

socket.on('connect', () => {
    log('Connection Successful!')
});

socket.on('startGame', () => {
    log("client: startGame received")
    hideStartButton()
    socket.emit('userListUpdate', socket.id)
})

socket.on('initUserList', userList => {
    for (const [k, v] of Object.entries(userList)) {
        events.appendChild(newItem(v))
    }
})

socket.on('userListUpdate', userId => {
    events.appendChild(newItem(userId))
})

socket.on('disconnect', () => {
    log(`${socket.id} disconnected.`)
    socket.emit('clientDisconnect', socket.id)
})

// === JS functions ===

startButton.addEventListener('click', () => {
    log(`client ${socket.id}: Game started`)
    socket.emit('startGame')
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

