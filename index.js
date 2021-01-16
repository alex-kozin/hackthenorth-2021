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
    
    socket.on('findPlayer', (username, socketId) => {
        log(`server: findPlayer ${socketId}`)

        availableUserSocketIds[socketId] = username

        if (Object.keys(availableUserSocketIds).length == 1){
            socket.emit('WaitingOtherPlayer')
            return
        }

        log("[BEFORE MATCHING] socketIds", availableUserSocketIds)
        let isNotFound = true
        let otherPlayerId;
        while(isNotFound){
            for (otherPlayerId in availableUserSocketIds) {
                // check if the property/key is defined in the object itself, not in parent
                if (otherPlayerId != socketId) {  
                    socket.join(otherPlayerId)
                    log(`${username} is matched with ${availableUserSocketIds[otherPlayerId]}`);
                    isNotFound = false
                    break
                }
            }
        }

        socket.to(otherPlayerId).emit('finishMatching', socketId, availableUserSocketIds[socketId])
        socket.emit('finishMatching', otherPlayerId, availableUserSocketIds[otherPlayerId])
        delete availableUserSocketIds[socketId]
        delete availableUserSocketIds[otherPlayerId]
        log("[AFTER MATCHING] socketIds", availableUserSocketIds)

        // socket.broadcast.emit('userListUpdate', socket.id)
        // socket.emit('startGame')
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
