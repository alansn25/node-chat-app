const expect = require('expect');

const {Users} = require('./users');



describe('Users',() =>{
    var users;

    beforeEach(() =>{
        users = new Users();
        users.users =[{
            id: '1',
            name: 'Alan',
            room: 'Node Course'
        },{
            id: '2',
            name: 'Bruna',
            room: 'React Course'  
        },{
            id: '3',
            name: 'Julie',
            room: 'Node Course'  
        }]
    });

    it('should add new user', ()=>{
        var users = new Users();
        var user = {
            id: '123',
            name: 'Alan',
            room: 'The Office Fans'
        };
        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', ()=>{
        var userId = users.users[1].id;
        var previousLength = users.users.length
        var removedUser = users.removeUser(userId);   
        expect(removedUser.id).toBe(userId);        
        expect(users.users).toNotContain(removedUser);
        expect(users.users.length).toBe(previousLength-1);
    });

    it('should not remove a user', ()=>{
        var userId = '99';
        var previousLength = users.users.length
        var removedUser = users.removeUser(userId);   
        expect(removedUser).toNotExist();        
        expect(users.users.length).toBe(previousLength);
    });

    it('should find user', ()=>{
        var foundUser = users.getUser(users.users[1].id);

        expect(users.users[1]).toEqual(foundUser);
    });

    it('should not find user', ()=>{
        var foundUser = users.getUser('99');

        expect(foundUser).toNotExist();
    });

    
    it('should return names for node course', ()=>{
        var userList = users.getUserList('Node Course');

        expect(userList).toEqual(['Alan', 'Julie']);
        
    });

    it('should return names for react course', ()=>{
        var userList = users.getUserList('React Course');

        expect(userList).toEqual(['Bruna']);
        
    });
});