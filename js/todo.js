//사용자에 해당하는 Todos를 모두 반환하는 함수.
function getTodos() {
  const currentUserId = getCurrentUser().id;
  const userTodos = JSON.parse(localStorage.getItem(currentUserId));
  return userTodos;
}

//요청된 날짜 todos 목록을 반환하는 함수
function getDateTodos() {
  let dateId = getParameterByName('date');
  if (dateId === '') dateId = getDate();

  const userTodos = getTodos();
  let dateTodos = null;

  //해당 사용자의 todolist가 있을때만
  if (userTodos !== null) {
    for (i = 0; i < userTodos.length; i++) {
      //console.log(userTodos[i].dateId);
      if (userTodos[i].dateId === parseInt(dateId)) {
        dateTodos = userTodos[i].todos;
        //console.log(dateTodos);
        break;
      }
    }
  }

  return dateTodos;
}

function createTodoLi(todo) {
  const li = document.createElement('li'),
    span = document.createElement('span'),
    input = document.createElement('input');

  li.classList.add('todos__todo');
  li.classList.add('todo');
  li.classList.add('g-todo');

  input.type = 'checkbox';

  if (todo.done) {
    li.classList.add('checked');
    input.checked = true;
  }

  span.innerText = todo.content;

  li.appendChild(span);
  li.appendChild(input);

  return li;
}

function loadTodos(todos) {
  const todosUl = document.querySelector('.todos__list');

  if (todos === null) {
    todosUl.innerHTML = '<span> 등록된 할일이 없습니다. </span>';
  } else {
    for (x in todos) {
      const li = createTodoLi(todos[x]);
      todosUl.appendChild(li);
    }
  }
}

function setDate(dateId, num) {
  //dateId를 날짜 객체로 변환
  const year = parseInt(dateId / 100000),
    month = parseInt(dateId / 1000) % 100,
    date = parseInt(dateId / 10) % 100,
    today = year + '-' + month + '-' + date;
  let dateObj = new Date(today);

  //객체에 날짜 변경 어제 또는 오늘;
  dateObj.setDate(dateObj.getDate() + num);
  console.log(dateObj);
  dateId = getDate(dateObj);

  //주소값으로 date 파라미터 전달
  location.href = `todo.html?date=${dateId}`;
}

function loadTodoDate(dateId) {
  const todoDate = document.querySelector('.header__todoDate'),
    dateSpan = todoDate.querySelector('span'),
    beforeIcon = todoDate.querySelector('.j-before'),
    afterIcon = todoDate.querySelector('.j-after');

  //get방식으로 전달된 파라미터를 가져옴
  dateId = getParameterByName('date');

  if (dateId === '') dateId = getDate();

  dateSpan.innerText = getDateTostring(dateId);

  beforeIcon.addEventListener('click', function () {
    setDate(dateId, -1);
  });
  afterIcon.addEventListener('click', function () {
    setDate(dateId, 1);
  });
}

function init() {
  if (!checkConnected()) {
    location.replace('index.html');
  }
  let todos = getDateTodos();

  loadTodoDate();
  loadTodos(todos);
}

init();
