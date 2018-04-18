const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname,'../public' );
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));//express static middleware- must be public


io.on('connection', (socket) => {
    console.log('New user connected');
    
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));


    // socket.emit('newEmail',{
    //     from: 'alan@example.com',
    //     text: 'Hey, Whats going on.',
    //     createdArt: 123
    // });

    // socket.emit('newMessage',{//emits a event to a single connection
    //     from: 'Alan',
    //     text: 'Hey, Whats going on.',
    //     createdArt: 123
    // });

               
    // socket.on('createEmail', (newEmail) => {
    //     console.log('createEmail', newEmail);
    // }); 
    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
       
       
        io.emit('newMessage',generateMessage(message.from, message.text));

        // socket.broadcast.emit('newMessage', {//emits a message to every connection but the one who is sending
        //         from: message.from,
        //         text: message.text,
        //         createdAt: new Date().getTime()
        //     });
    }); 
    
    socket.on('disconnect', () => {
        console.log('Client disconnected from server');
    });    
});

server.listen(port, ()=>{
    console.log(`Server is up on the port ${port}`);
});