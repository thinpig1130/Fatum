function getTodoDate() {
  let dateId = getParameterByName('date');
  if (dateId === '') dateId = getDate();
  return parseInt(dateId);
}

function setTodos(userTodos, userId) {
  if (userId === undefined) userId = getCurrentUser().id;
  localStorage.setItem(userId, JSON.stringify(userTodos));
}

function setTodoDate(dateId, num) {
  //dateId를 날짜 객체로 변환
  const year = parseInt(dateId / 100000),
    month = parseInt(dateId / 1000) % 100,
    date = parseInt(dateId / 10) % 100,
    today = year + '-' + month + '-' + date;
  let dateObj = new Date(today);

  //객체에 날짜 변경 어제 또는 오늘;
  dateObj.setDate(dateObj.getDate() + num);
  dateId = getDate(dateObj);

  //현재 주소값으로 date 파라미터 전달
  let locationArr = location.href.split('?');
  locationArr = locationArr[0].split('/');
  let locationStr = `${locationArr[locationArr.length - 1]}?date=${dateId}`;
  if (getParameterByName('user') !== '')
    locationStr = `${locationStr}&user=${getParameterByName('user')}`;
  location.href = locationStr;
}

function loadTodoDate() {
  const todoDate = document.querySelector('.header__todo-date'),
    dateSpan = todoDate.querySelector('span'),
    beforeIcon = todoDate.querySelector('.j-before'),
    afterIcon = todoDate.querySelector('.j-after');

  let dateId = getTodoDate();

  dateSpan.innerText = getDateTostring(dateId);

  beforeIcon.addEventListener('click', function () {
    setTodoDate(dateId, -1);
  });

  afterIcon.addEventListener('click', function () {
    setTodoDate(dateId, 1);
  });
}
