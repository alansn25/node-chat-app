var expect = require('expect');

var {generateMessage} = require('./message');

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