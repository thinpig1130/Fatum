let users = [];

//사용자 목록을 local에 저장.
function saveUsers(user) {
  if (user !== null) users.push(user);
  localStorage.setItem(USERS_LS, JSON.stringify(users));
}

//현재 사용자를 local 저장.
function setCurrentUser(obj) {
  localStorage.setItem(CURRENTUSER_LS, JSON.stringify(obj));
}

//password local 저장하는 함수
function savePassword(pwd) {
  localStorage.setItem(PASSWORD_LS, pwd);
}

//사용자 목록을 만들어 주는 함수.
function showUser(user) {
  const li = document.createElement('li');
  const div = document.createElement('div');
  const avatar = document.createElement('img');
  const span = document.createElement('span');

  li.id = user.id;
  span.innerHTML =
    user.name + (user.id == '1' ? ' <i class="fas fa-crown"></i>' : '');
  avatar.src = user.avatar;

  div.appendChild(avatar);
  div.appendChild(span);
  li.appendChild(div);

  return li;
  //userListDiv.insertBefore(li, userListDiv.firstChild);

  //li.addEventListener('click', selectUser);
}

/*
function loadUser(user){
  showUser(user);
  users.push(user);
}
*/
