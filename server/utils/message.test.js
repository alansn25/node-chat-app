var expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage',() =>{
    it('should generate correct message object', ()=>{
        var from = 'Alan';
        var text = 'I wanna be sedated'; 

        var message = generateMessage(from,text);
        expect(message).toInclude({from, text});
        // expect(message.from).toBe(from);
        // expect(message.text).toBe(text);
        expect(message.createdAt).toBeA('number');
    });

});

describe('generateLocationMessage',() =>{
    it('should generate correct location message object', ()=>{
        var from = 'Alan';
        var latitude = 178; 
        var longitude = 121; 
        var url = `https://www.google.com/maps?q=${latitude},${longitude}`

        var message = generateLocationMessage(from,latitude,longitude);
        expect(message).toInclude({from, url});        
        expect(message.createdAt).toBeA('number');
    });

});