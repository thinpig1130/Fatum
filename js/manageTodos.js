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
}

function init() {
  loadTodoDate();
  loadUser();
}

init();
