const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname,'../public' );
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));//express static middleware- must be public


io.on('connection', (socket) => {
    console.log('New user connected');

    // socket.emit('newEmail',{
    //     from: 'alan@example.com',
    //     text: 'Hey, Whats going on.',
    //     createdArt: 123
    // });

    socket.emit('newMessage',{
        from: 'Alan',
        text: 'Hey, Whats going on.',
        createdArt: 123
    });

               
    // socket.on('createEmail', (newEmail) => {
    //     console.log('createEmail', newEmail);
    // }); 
    socket.on('createMessage', (newMessage) => {
        console.log('createMessage', newMessage);
    }); 
    
    socket.on('disconnect', () => {
        console.log('Client disconnected from server');
    });    
});

server.listen(port, ()=>{
    console.log(`Server is up on the port ${port}`);
});