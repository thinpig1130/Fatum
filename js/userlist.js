const userListDiv = document.querySelector('.js-user__list'),
  loginBtn = document.querySelector('.js-login-button');

let users = [];

function saveUsers() {
  localStorage.setItem(USERS_LS, JSON.stringify(users));
}

function disableButton() {
  //loginBtn.disabled = true;
}

function ActivateButton() {
  //loginBtn.disabled = false;
}

//사용자 중 이미 체크된 리스트가 있는지 검사하고,
//체크를 모두 해제한다.
function releaseCheck() {
  const checkedLi = userListDiv.querySelector(`.${CHECKED_CN}`);
  if (checkedLi !== null) {
    let div = checkedLi.querySelector('div');
    div = checkedLi.removeChild(div);
    checkedLi.classList.remove(CHECKED_CN);
    return div;
  }
  return 0;
}

//사용자를 선택한다.
function selectUser(event) {
  let div = releaseCheck();
  if (div === 0) {
    div = document.createElement('div');
    div.innerHTML = '<i class="far fa-check-circle"></i>';
  }
  this.classList.add(CHECKED_CN);
  this.appendChild(div);
  ActivateButton();
}

// 저장된 User목록 을 출력하는 함수.
function showUsers(users) {
  const li = document.createElement('li');
  const avatar = document.createElement('img');
  const span = document.createElement('span');

  li.id = users.id;
  span.innerHTML =
    users.name + (users.id == '1' ? ' <i class="fas fa-crown"></i>' : '');
  avatar.src = users.avatar;

  li.appendChild(avatar);
  li.appendChild(span);
  userListDiv.insertBefore(li, userListDiv.firstChild);

  li.addEventListener('click', selectUser);
}

function loadUsers() {
  const userList = localStorage.getItem(USERS_LS);
  if (userList !== null) {
    const parseUserList = JSON.parse(userList);
    parseUserList.forEach(function (users) {
      showUsers(users);
    });
  } else {
    managerForm.classList.remove(HIDING_CN);
    userListDiv.classList.add(HIDING_CN);
  }
}

function saveCurrentUser() {
  const checkedLi = userListDiv.querySelector(`.${CHECKED_CN}`),
    indexNum = parseInt(checkedLi.id) - 1,
    user = users[indexNum],
    date = new Date(),
    currentObj = {
      time: date,
      id: user.id,
      name: user.name,
    };

  localStorage.setItem(CURRENTUSER_LS, JSON.stringify(currentObj));
  location.replace('manage_users.html');
  // loadCurrentUser(); //statusbar.js
}

function init() {
  const userObj = {
    name: '권다애',
    id: users.length + 1,
    avatar: 'images/user03.jpg',
  };
  users.push(userObj);
  const userObj2 = {
    name: '홍기찬',
    id: users.length + 1,
    avatar: 'images/user02.jpg',
  };
  users.push(userObj2);
  const userObj3 = {
    name: '홍기주',
    id: users.length + 1,
    avatar: 'images/user01.jpeg',
  };

  users.push(userObj3);
  saveUsers();

  loadUsers();
  disableButton();
  //loginBtn.addEventListener('click', saveCurrentUser);
}

init();
