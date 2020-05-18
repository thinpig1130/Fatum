function getParamUserId() {
  let userId = getParameterByName('user');
  if (userId === '') userId = 0;
  return parseInt(userId);
}

function setTodoUser(userId, num) {
  const users = getUsers();

  //다음 사용자의 userId를 찾아줌.
  if (userId === 0 && num === -1) userId = users.length;
  if (userId === users.length - 1 && num === 1) userId = -1;
  while (users[userId + num].name === undefined) {
    userId = userId + num;
    if (userId + num === users.length && num === 1) {
      userId = -1;
    }
  }
  userId = userId + num;

  //현재 주소값으로 date 파라미터 전달
  let locationArr = location.href.split('?');
  locationArr = locationArr[0].split('/');
  let locationStr = `${locationArr[locationArr.length - 1]}?user=${userId}`;
  if (getParameterByName('date') !== '')
    locationStr = `${locationStr}&date=${getParameterByName('date')}`;
  location.href = locationStr;
}

function loadUser() {
  const todoUser = document.querySelector('.header__todo-user'),
    span = todoUser.querySelector('span'),
    beforeIcon = todoUser.querySelector('.j-before'),
    afterIcon = todoUser.querySelector('.j-after'),
    userId = getParamUserId(),
    users = getUsers();

  span.innerText = users[userId].name;

  beforeIcon.addEventListener('click', function () {
    setTodoUser(userId, -1);
  });

  afterIcon.addEventListener('click', function () {
    setTodoUser(userId, 1);
  });

  return userId;
}

//delete icon을 눌렀을 때 발생하는 이벤트
function aaa(){};

//mTodoLi 생성하는 함수
function createTodoLi(todo) {
  const li = document.createElement('li'),
    span = document.createElement('span'),
    i = document.createElement('i');

  li.classList.add('mtodos__todo');
  li.classList.add('mtodo');
  li.classList.add('g-todo');
  i.classList.add('far');
  i.classList.add('fa-times-circle');

  if (todo.done) {
    li.classList.add('checked');
  }

  span.innerText = todo.content;
  i.addEventListener('click', aaa);

  li.appendChild(span);
  li.appendChild(i);

  return li;
}

//mtodolist에 목록을 추가하는 함수
function loadTodos(todos) {
  const todosUl = document.querySelector('.mtodos__list');

  if (todos === null) {
    todosUl.innerHTML = '<span> 등록된 할일이 없습니다. </span>';
  } else {
    for (x in todos) {
      const li = createTodoLi(todos[x]);
      li.id = x;
      todosUl.appendChild(li);
    }
  }
}

// dateid, userid 인자를 받아 목록을 반환하는 함수
function getTodos(dateId, userId) {
  const userTodos = JSON.parse(localStorage.getItem(userId));
  let dateTodos = null;
  if (userTodos !== null) {
    for (i = 0; i < userTodos.length; i++) {
      //console.log(userTodos[i].dateId);
      if (userTodos[i].dateId === dateId) {
        dateTodos = userTodos[i].todos;
        //console.log(dateTodos);
        break;
      }
    }
  }

  return dateTodos;
}

function insertTodo(userId, dateId, todos){
  const todoInsertText = document.querySelector('.in-todo__form input');
  if(todoInsertText.value===""){
    alert("할일을 입력하세요.");
  }else{
    let userTodos = JSON.parse(localStorage.getItem(userId));
    let indexNum = -1;

    if(todos===null)todos = [];
    todos.push(new Todo(todoInsertText.value));
    
    if(userTodos===null) userTodos= [new TodoList(dateId)];
 
    for (i = 0; i < userTodos.length; i++) {
      if (userTodos[i].dateId === dateId) {
        userTodos[i].todos = todos;
        indexNum = i;
        break;
      }
    }

    if (indexNum === -1){
      let addTodoList = new TodoList(dateId);
      addTodoList.todos = todos;
      console.log(addTodoList);
      userTodos.push(addTodoList);
    }

    console.log(userTodos);
    setTodos(userTodos, userId);

    location.reload();
  }
    //localStorage.setItem(, JSON.stringify(userTodos));
}

function init() {
  if(!checkManageConnected()){
    //manager 권한이 아닌 경우! 해당 페이지 접근 불가 
    location.replace('index.html');
  }
  const todoDate = loadTodoDate();
  const todoUser = loadUser();
  const todoForm = document.querySelector('.in-todo__form'),
      todoInsertBtn = todoForm.querySelector('i');
  
  const todos = getTodos(todoDate, todoUser);
  loadTodos(todos);
  todoForm.addEventListener('submit', function(){
    event.preventDefault();
    insertTodo(todoUser, todoDate, todos);
  } );
  todoInsertBtn.addEventListener('click', function (){
       insertTodo(todoUser, todoDate, todos);
  } );
}

init();
