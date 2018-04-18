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
            var li = jQuery('<li></li>');
            li.text(`${message.from}: ${message.text}`);

            jQuery('#messages').append(li);

        });

        // socket.emit('createMessage', {
        //     from: 'Kurt',
        //     text: 'Im fine'
        // }, function(data){
        //     console.log('Got it', data);
        // });

        jQuery('#message-form').on('submit', function (e) {
            e.preventDefault();
            socket.emit('createMessage', {
                from: 'User',
                text: jQuery('[name="message"]').val()
            }, function(data){
                //console.log('Got it', data);
            });
        });