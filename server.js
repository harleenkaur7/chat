const express = require('express');
const app = express();

const http = require('http').createServer(app);
const PORT = process.env.PORT || 3000;


app.use(express.static(__dirname + '/public'))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket 
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...');

    // to listen on server
    socket.on('message', (msg) => {

        // console.log(msg);
        // we have to send the message to all the browsers connected to this socket.
        // it will send the msg to all the browsers except the one sending it
        // 'message' is name of the event and msg is the actual message
        socket.broadcast.emit('message', msg)
    })

})


http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});