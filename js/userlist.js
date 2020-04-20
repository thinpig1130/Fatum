const userListDiv = document.querySelector('.js-user__list'),
  loginBtn = document.querySelector('.js-login-button');

function disableButton() {
  loginBtn.disabled = true;
}

function ActivateButton() {
  loginBtn.disabled = false;
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
function showUsers(user) {
  console.log(user + "showUser");
  let li = showUser(user);
  userListDiv.insertBefore(li, userListDiv.firstChild);

  li.addEventListener('click', selectUser);
}

function loadUsers() {
  const userList = localStorage.getItem(USERS_LS);
  if (userList !== null) {
    users = JSON.parse(userList);
    console.log(users);
    users.forEach(function (user) {
      showUsers(user);
      //users.push(user);
    });
  } else {
    location.replace('start.html');
  }
  if (currentUser !== null) {
    userListDiv.classList.add(HIDING_CN);
    loginBtn.classList.add(HIDING_CN);
  }
}

function saveCurrentUser() {
  const checkedLi = userListDiv.querySelector(`.${CHECKED_CN}`),
    indexNum = parseInt(checkedLi.id) - 1,
    user = users[indexNum],
    currentObj = new CurrentUser(user);

  setCurrentUser(currentObj); //usebase.js
  loadCurrentUser(); //statusbar.js
  userListDiv.classList.add(HIDING_CN);
  loginBtn.classList.add(HIDING_CN);
}

function init() {
  /**
   * 
   * 
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
   * 
   * 
   */

  loadUsers();
  disableButton();
  loginBtn.addEventListener('click', saveCurrentUser);
}

init();
