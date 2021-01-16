const path = require('path')
const express = require('express')
const app = require('express')()
const server = require('http').createServer(app)
const options = { /* ... */ }
const io = require('socket.io')(server, options)

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

    socket.on('clientDisconnect', () => {
      log(`${socket.id} remove from availableUserSocketIds.`)
      availableUserSocketIds = deleteKey(availableUserSocketIds, socket.id)
      //Found 2 problems: 1) strings are immutable, 2) client doesn't always signal disconnect, solution: registering users with own IDs
      // off for quick lunch
      
      console.log(availableUserSocketIds)
    })
})

app.use(express.static('public'))
app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
})

server.listen(3000, () => {
    log('go to http://localhost:3000')
})


const deleteKey = (dict, keyToDelete) => Object.keys(dict).reduce((object, key) => {
    if (key !== keyToDelete) {
      object[key] = dict[key]
    }
    return object
  }, {})
