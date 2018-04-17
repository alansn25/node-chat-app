var socket = io();

        socket.on('connect', function () {
            console.log('Connected to server');
            
            // socket.emit('createMessage', {
            //    to: 'bruna@example.com',
            //    text: 'Hey, rock and roll aint noise pollution'
            // });

            // socket.emit('createEmail', {
            //    to: 'bruna@example.com',
            //    text: 'Hey, rock and roll aint noise pollution'
            // });
       
        });

        socket.on('disconnect', function () {
            console.log('Disconnected from server');
        });

        socket.on('newMessage', function (message) {
            console.log('newMessage', message);
        });