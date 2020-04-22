const todos = document.querySelector('.js-todos'),
  todoDate = todos.querySelector('.js-todos__date'),
  todoList = todos.querySelector('.js-todos__div'),
  todosForm = todos.querySelector('.js-todos__form');

let userId, currentDateId, arrIndex, currentGroup,
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
  //2020.04.20 (날짜 예) , 이동하려는 일수 (-1은 하루 전)
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


function addToDo(event) {
  event.preventDefault();

  const textBox = todosForm.querySelector('.js-todos__todo'),
    content = textBox.value;
  let index = 0;
  let arrStr = localStorage.getItem(`${userId}`);

  if (arrStr !== null) {
    groupArr = JSON.stringify(arrStr);
    for (i = groupArr.length - 1; i >= 0; i++) {
      
      if (currentDateId == parseInt(groupArr[i].dateId)) {
      /*  arrIndex = i;
        currentTodos = JSON.stringify(groupArr[i].todos);
        //index = currentTodos.length;
      }
    }
    */
  } else {
    let todoGroup = new ToDoGroup(currentDateId);
    todoGroup.setToDo(content);
    currentToDoGroup.push(todoGroup);
  }

  //const todo = new ToDo(index, content, false);
  //currentTodos.push(todo);

  //textBox.value = '';
  //console.log(currentTodos);
}

function saveGroup(){
  if (currentGroup === undefined){
    currentGroup = new ToDoGroup(currentDateId);
  }
  currentGroup.todos = currentTodos;
  const stringList = localStorage.getItem(`${userId}`);
  let arrUserTodo = JSON.stringify(stringList);

  currentGroup.todos = currentTodos;
  arrUserTodo[arrIndex] = currentGroup;

  localStorage.setItem(userId, arrUserTodo);
}

function loadCurrentToDos(){
  const stringList = localStorage.getItem(`${userId}`);
  arrIndex = -1;
  if(stringList !== null){
    let arrUserTodo = JSON.stringify(stringList);
    for(i=arrUserTodo.length-1; i>=0 ; i--){
      if(arrUserTodo[i].dateId === currentDateId){
        arrIndex = i;
        currentGroup = arrUserTodo[i];
        currentTodos = JSON.stringify(arrUserTodo[i].todos);
      }
    }
    if(arrIndex === -1){
      arrIndex = arrUserTodo.length;
      saveGroup();
    }
  }else{
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

function init() {
  todos.classList.add(HIDING_CN);
  todosForm.addEventListener('submit', addToDo);
}

init();
