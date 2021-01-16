const path = require('path')
const express = require('express')
const app = require('express')();
const server = require('http').createServer(app);
const options = { /* ... */ };
const io = require('socket.io')(server, options);

const log = console.log

let availableUserSocketIds = {}

io.on('connection', socket => { 
    log(`User connected on ${socket.id}`)
    availableUserSocketIds[socket.id] = socket.id
    log("socketIds", availableUserSocketIds)
    socket.emit('initUserList', availableUserSocketIds)
    socket.broadcast.emit('userListUpdate', socket.id)

    // 1 - you're displayed when you connect
    // 2 - you're displayed when you hit Start
    // 3 - you get the list of all people connected when you connect + new people when they connect

    socket.on('startGame', () => {
        log("server: startGame emit")
        socket.emit('startGame')
    })

    socket.on('userListUpdate', socketId => {
        socket.emit('userListUpdate', socketId)
    })

    socket.on('clientDisconnect', socketId => {
      log(`${socket.id} remove from availableUserSocketIds.`)
      delete availableUserSocketIds[socketId]
    })
})

app.use(express.static('public'))
app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
});

server.listen(3000, () => {
    log('go to http://localhost:3000')
});
