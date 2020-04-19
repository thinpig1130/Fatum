let users = [];

function saveUsers() {
  localStorage.setItem(USERS_LS, JSON.stringify(users));
}

function setCurrentUser(obj) {
  localStorage.setItem(CURRENTUSER_LS, JSON.stringify(obj));
}

function savePassword(pwd) {
  localStorage.setItem(PASSWORD_LS, pwd);
}
