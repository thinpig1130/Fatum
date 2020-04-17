const userListDiv = document.querySelector('.js-user__list'),
  managerForm = document.querySelector('.js-manager__form'),
  managerFormName = managerForm.querySelector('.js-manager__name'),
  managerFormpwd1 = managerForm.querySelector('.js-manager__pwd1'),
  managerFormpwd2 = managerForm.querySelector('.js-manager__pwd2');

//LS (Local STorage의 약자)
//CN (Class Name의 약자)
const USERS_LS = 'users',
  PASSWORD_LS = 'pw',
  HIDING_CN = 'hiding';

let users = [];

function checkUser(event) {
  // 사용자를 클릭했을때 클릭한 사용자를 표시해 준다.
  // CSS와 연동해야 할 듯.
}

//사용자객체를 loacalStorage에 저장하는 함수.
function saveUsers() {
  localStorage.setItem(USERS_LS, JSON.stringify(users));
}

function showUsers(name) {
  // 저장된 User목록 을 출력하는 함수.
  const li = document.createElement('li');
  const icon = document.createElement('img');
  const span = document.createElement('span');
  const classNum = users.length + 1;

  li.class = classNum;
  span.innerText = name;

  li.appendChild(icon);
  li.appendChild(span);
  userListDiv.appendChild(li);

  li.addEventListener('click', checkUser);

  const userObj = {
    name: name,
    classNum: classNum,
    icon: 'user01.jpeg',
  };

  users.push(userObj);
  saveUsers();
}

//화면 시작과 함께 호출되는 함수. (기존 정보를 불러온다.)
function loadUsers() {
  const userList = localStorage.getItem(USERS_LS);
  if (userList !== null) {
    const parseUserList = JSON.parse(userList);
    parseUserList.forEach(function (users) {
      showUsers(users.name);
    });
  } else {
    managerForm.classList.remove(HIDING_CN);
    userListDiv.classList.add(HIDING_CN);
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const currentNameValue = managerFormName.value;
  const currentPwd1 = managerFormpwd1.value;

  const userObj = {
    name: currentNameValue,
    classNum: users.length + 1,
    icon: 'user01.jpeg',
  };

  users.push(userObj);
  saveUsers();
  localStorage.setItem(PASSWORD_LS, currentPwd1);

  //관리자 페이지로 넘어감.
  location.replace('manager.html');
}

function init() {
  loadUsers();
  managerForm.addEventListener('submit', handleSubmit);
}

init();

//더 구현하면 좋을 것들..
// PW 확인 하는 절차 (두 PW가 같은지...)
