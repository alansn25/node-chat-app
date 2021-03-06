const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname,'../public' );
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));//express static middleware- must be public


io.on('connection', (socket) => {
    console.log('New user connected');
    
    // socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    // socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('join', (params, callback) =>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room name are required.');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        //socket.leave(params.room);

        //io.emit -> io.to('The Office Fans').emit
        //socket.broadcast.emit ->socket.broadcast.to('The Office Fans').emit
        //socket.emit

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));



        callback();
    });

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
    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);

        if(user && isRealString(message.text)){
            io.to(user.room).emit('newMessage',generateMessage(user.name, message.text));
        }
        
        callback();

        // socket.broadcast.emit('newMessage', {//emits a message to every connection but the one who is sending
        //         from: message.from,
        //         text: message.text,
        //         createdAt: new Date().getTime()
        //     });
    }); 

    

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);

        if(user){
            io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }

        //io.emit('newLocationMessage',generateLocationMessage('User', coords.latitude, coords.longitude));
        //console.log('Client disconnected from server');
    });

    
    socket.on('disconnect', () => {
        console.log('Client disconnected from server');
        var user = users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
    });    
});

server.listen(port, ()=>{
    console.log(`Server is up on the port ${port}`);
});