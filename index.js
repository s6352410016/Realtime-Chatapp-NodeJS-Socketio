const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const path = require('path')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

app.use(express.static(path.join(__dirname , 'public')))

app.get('/' , (req , res) => {
    res.sendFile('index.html')
})

// io.on('connect' , socket => {
//     console.log('User connected')
//     socket.on('chat message' , msg => {
//         io.emit('chat message' , msg)
//     })

//     socket.on('disconnect' , () => {
//         console.log('User disconnected')
//     })
// })

io.on('connect' , socket => {
    socket.on('newuser' , name => {
        let newUser = name
        console.log(`${newUser} Connected`)

        socket.on('disconnect' , () => {
            console.log('User desconnected')
            io.emit('disconect',`disconnected ${newUser}`)
        })
    })

    socket.on('chat message' , msg => {
        io.emit('chat message' , msg)
    })
})

server.listen(3000 , () => {
    console.log(`Server Start`)
})