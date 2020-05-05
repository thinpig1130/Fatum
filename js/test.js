function testSetUsers() {
  let users = [];
  let user1 = new User(0, '권다애', '3.jpg'),
    user2 = new User(1, '홍기찬', '2.jpg'),
    user3 = new User(2, '홍기주', '1.jpg');
  user4 = new User(3, '권순정', '4.jpg');
  user5 = new User(4, '이혜경', '5.jpg');
  user6 = new User(5, '임선옥', '6.jpg');

  users = [user1, user2, user3, user4, user5, user6];

  localStorage.setItem(LS_USERS, JSON.stringify(users));
}

function testTodos() {
  let saveTestTodos = new TodoList(202005041);
  saveTestTodos.todos.push(new Todo('할일5/4'));
  saveTestTodos.todos.push(new Todo('할일5/4ㅇㄹㅇㅇ'));
  saveTestTodos.todos.push(new Todo('할일5/4 ghghgh'));

  let userTodo = [];
  userTodo.push(saveTestTodos);

  saveTestTodos = new TodoList(202005074);
  saveTestTodos.todos.push(new Todo('할일5/7'));
  saveTestTodos.todos.push(new Todo('할일5/7ㅇㄹㅇㅇ'));
  saveTestTodos.todos.push(new Todo('다애할일 1 '));

  userTodo.push(saveTestTodos);

  localStorage.setItem(0, JSON.stringify(userTodo));
}

function init() {
  //testSetUsers();
  //testTodos();
}

init();
