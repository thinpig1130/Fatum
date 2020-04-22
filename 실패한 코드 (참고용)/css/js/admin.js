const authenForm = document.querySelector('.admin__authentication'),
  adminPwd = authenForm.querySelector('input'),
  adminBox = document.querySelector('.admin'),
  userListDiv = adminBox.querySelector('.js-user__list'),
  userPlusForm = adminBox.querySelector('.js-admin__user-plus'),
  iconUserPlus = adminBox.querySelector('.admin__icon-user-plus'),
  iconUserMinus = adminBox.querySelector('.admin__icon-user-minus'),
  todos = document.querySelector('.js-todos'),
  todoDate = todos.querySelector('.js-todos__date'),
  todoList = todos.querySelector('.js-todos__div'),
  todosForm = todos.querySelector('.js-todos__form');

let userId,
  currentDateId,
  arrIndex,
  currentGroup,
  currentTodos = [];

function convertDateToId(dateObj) {
  const year = dateObj.getFullYear(),
    month = dateObj.getMonth() + 1,
    date = dateObj.getDate(),
    dateId = year * 10000 + month * 100 + date;
  return dateId;
}

function convertIdToDate(inputId) {
  const year = parseInt(inputId / 10000),
    month = parseInt(inputId / 100) % 100,
    date = parseInt(inputId % 100),
    today = year + '-' + month + '-' + date,
    dateObj = new Date(today);
  return dateObj;
}

function setToDoDate(inputId, moveCnt) {
  if (inputId === undefined) {
    const dateObj = new Date();
    inputId = convertDateToId(dateObj);
  } else {
    let dateObj = convertIdToDate(inputId);
    dateObj.setDate(dateObj.getDate() + moveCnt);
    inputId = convertDateToId(dateObj);
  }
  return inputId;
}

function beforeDate(inputId) {
  inputId = setToDoDate(inputId, -1);
  return inputId;
}

function afterDate(inputId) {
  inputId = setToDoDate(inputId, 1);
  return inputId;
}

function printDate(inputId) {
  const year = parseInt(inputId / 10000),
    month = parseInt(inputId / 100) % 100,
    date = parseInt(inputId % 100),
    today = year + '년 ' + month + '월 ' + date + '일';
  todoDate.innerHTML = today;
}

function saveGroup() {
  if (currentGroup === undefined) {
    currentGroup = new ToDoGroup(currentDateId);
  }
  currentGroup.todos = currentTodos;

  let arrUserTodo = [];

  const stringList = localStorage.getItem(`${userId}`);
  if (stringList !== null) {
    arrUserTodo = JSON.parse(stringList);
  }

  currentGroup.todos = currentTodos;
  arrUserTodo[arrIndex] = currentGroup;

  localStorage.setItem(userId, JSON.stringify(arrUserTodo));
}

function loadCurrentToDos() {
  const stringList = localStorage.getItem(`${userId}`);
  arrIndex = -1;
  if (stringList !== null) {
    let arrUserTodo = JSON.stringify(stringList);
    for (i = arrUserTodo.length - 1; i >= 0; i--) {
      if (arrUserTodo[i].dateId === currentDateId) {
        arrIndex = i;
        currentGroup = arrUserTodo[i];
        currentTodos = JSON.stringify(arrUserTodo[i].todos);
      }
    }
    if (arrIndex === -1) {
      arrIndex = arrUserTodo.length;
      saveGroup();
    }
  } else {
    arrIndex = 0;
    saveGroup();
  }
}

function loadToDos(event) {
  const div = event.target;
  let li = div.parentNode;
  if (li.id === '') li = li.parentNode;
  userId = parseInt(li.id);
  currentDateId = setToDoDate();
  printDate(currentDateId);
  loadCurrentToDos();
  todos.classList.remove(HIDING_CN);
}

function userRegistration(event) {
  event.preventDefault();
  const nameBox = userPlusForm.querySelector('.js-user-plus__name'),
    avatarBox = userPlusForm.querySelector('.js-user-plus__avatar'),
    user = new User(users.length + 1, nameBox.value, avatarBox.value);
  saveUsers(user);
  nameBox.value = '';
  avatarBox.value = '';
  userPlusForm.classList.add(HIDING_CN);
  loadUsers();
}

function visibleForm() {
  userPlusForm.classList.remove(HIDING_CN);
  userPlusForm.addEventListener('submit', userRegistration);
}

function deleteUser(event) {
  const currentBtn = event.target,
    currentLi = currentBtn.parentNode;

  userListDiv.removeChild(currentLi);

  let idNum = parseInt(currentLi.id);

  let arr = [];
  for (i = 0; i < users.length; i++) {
    if (i !== idNum - 1) {
      if (i > idNum - 1) {
        users[i].id = parseInt(users[i].id) - 1;
        let li = document.getElementById(`${i + 1}`);
        li.id = `${i}`;
      }
      arr.push(users[i]);
    }
  }

  localStorage.setItem(USERS_LS, JSON.stringify(arr));

  for (i = 2; i < users.length; i++) {
    const li = document.getElementById(`${i}`),
      btn = li.querySelector('input');
    li.removeChild(btn);
  }

  iconUserMinus.classList.remove(HIDING_CN);
  loadUsers();
}

function visibleMinusButton() {
  for (i = 2; i < users.length + 1; i++) {
    const li = document.getElementById(`${i}`);
    const deleteBtn = document.createElement('input');
    deleteBtn.type = 'button';
    deleteBtn.value = 'delete';
    deleteBtn.addEventListener('click', deleteUser);
    li.appendChild(deleteBtn);
  }
  iconUserMinus.classList.add(HIDING_CN);
}

function authenicationAdmin(event) {
  event.preventDefault();
  const localPwd = localStorage.getItem(PASSWORD_LS);
  if (adminPwd.value === localPwd) {
    authenForm.classList.add(HIDING_CN);
    adminBox.classList.remove(HIDING_CN);
    iconUserPlus.addEventListener('click', visibleForm);
    iconUserMinus.addEventListener('click', visibleMinusButton);
  } else {
    const adminMsg = document.querySelector('.admin__msg');
    adminMsg.innerHTML = '비밀번호를 잘못 입력하셨습니다.';
    adminPwd.value = '';
  }
}

function basicSetting() {
  adminBox.classList.add(HIDING_CN);
  userPlusForm.classList.add(HIDING_CN);
}

function loadUsers() {
  userListDiv.innerHTML = '';
  const userList = localStorage.getItem(USERS_LS);
  if (userList !== null) {
    users = JSON.parse(userList);
    users.forEach(function (user) {
      const li = showUser(user);
      const div = li.querySelector('div');
      userListDiv.insertBefore(li, userListDiv.firstChild);
      div.addEventListener('click', loadToDos);
    });
  } else {
    alert('잘못된 접근입니다.');
    location.replace('start.html');
  }
}

function addToDo(event) {
  event.preventDefault();
  const inputContent = todosForm.querySelector('.js-todos__todo');
  let todo = new ToDo(currentTodos.length, inputContent.value);
  inputContent.value = '';
  currentTodos.push(todo);
  console.log(currentTodos);
  saveGroup();
}

function init() {
  loadUsers();
  basicSetting();
  authenForm.addEventListener('submit', authenicationAdmin);
  todos.classList.add(HIDING_CN);
  todosForm.addEventListener('submit', addToDo);
}

init();
