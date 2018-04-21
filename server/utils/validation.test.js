const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString',() =>{
    it('should reject non-string values', ()=>{
        var number = 43;
        var object = {myObject: 'gfsfs', string: 56};
        expect(isRealString(number)).toBe(false);
        expect(isRealString(object)).toBeFalsy();
    });

    it('should reject string with only spaces', ()=>{
        var spaceString = "        ";
        expect(isRealString(spaceString)).toBeFalsy();
        
    });

    it('should allow string with non-space characters', ()=>{
        var string = "  myName  ";
        expect(isRealString(string)).toBeTruthy();        
    });

});