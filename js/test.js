
function testSetUsers(){
    let users = []; 
    let user1 = new User(0, '권다애', '3.jpg'),
        user2 = new User(1, '홍기찬', '2.jpg'),
        user3 = new User(2, '홍기주', '1.jpg');
        user4 = new User(3, '권순정', '4.jpg');
        user5 = new User(4, '이혜경', '5.jpg');
        user6 = new User(5, '임선옥', '6.jpg');

    users = [user1, user2, user3, user4, user5, user6];

    localStorage.setItem(LS_USERS, JSON.stringify(users))
}

function init(){
   //testSetUsers();
}

init();
