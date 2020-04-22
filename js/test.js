function testSetUsers(){
    let users = []; 
    let user1 = new User(0, '권다애', 'images/03.jpg'),
        user2 = new User(1, '홍기찬', 'images/02.jpg'),
        user3 = new User(2, '홍기주', 'images/01.jpg');
        user4 = new User(3, '권순정', 'images/04.jpg');
        user5 = new User(4, '이혜경', 'images/05.jpg');
        user6 = new User(5, '임선옥', 'images/06.jpg');

    users = [user1, user2, user3, user4, user5, user6];

    localStorage.setItem(LS_USERS, JSON.stringify(users))
}

function init(){
    testSetUsers();
}

init();