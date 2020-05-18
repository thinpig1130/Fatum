//사용자에 해당하는 Todos를 모두 반환하는 함수.
function getUserTodos() {
  const currentUserId = getCurrentUser().id;
  const userTodos = JSON.parse(localStorage.getItem(currentUserId));
  return userTodos;
}

//요청된 날짜 todos 목록을 반환하는 함수
function getDateTodos() {
  let dateId = getTodoDate();
  const userTodos = getUserTodos();
  let dateTodos = null;

  //해당 사용자의 todolist가 있을때만
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

//할일을 Done 여부를 변경하는 함수
function updateTodos(listId, isDone) {
  const todoDateId = getTodoDate();
  let userTodos = getUserTodos(),
    dateTodos = getDateTodos();

  dateTodos[listId].done = isDone;
  for (x in userTodos) {
    if (userTodos[x].dateId === todoDateId) userTodos[x].todos = dateTodos;
  }
  setTodos(userTodos);
}

//checkbox 클릭했을 때 event 함수
function manageTodoDone() {
  const li = this.parentNode;
  if (hasClass(li, CN_CHECKED)) {
    li.classList.remove(CN_CHECKED);
    updateTodos(li.id, false);
  } else {
    li.classList.add(CN_CHECKED);
    updateTodos(li.id, true);
  }
  //console.log(li);
}

//TodoLi 생성하는 함수
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
  input.addEventListener('click', manageTodoDone);

  li.appendChild(span);
  li.appendChild(input);

  return li;
}

//todolist에 목록을 추가하는 함수
function loadTodos(todos) {
  const todosUl = document.querySelector('.todos__list');

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

function init() {
  if (!checkConnected()) {
    location.replace('index.html');
  }
  if (getCurrentUser().id !== 0) {
    document.querySelector('.header__todo-manager').classList.add(CN_HIDING);
  }
  loadTodoDate();
  loadTodos(getDateTodos());
}

init();
