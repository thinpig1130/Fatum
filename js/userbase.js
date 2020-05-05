function setUsers(users) {
  localStorage.setItem(LS_USERS, JSON.stringify(users));
}

function setPwd(pwd) {
  localStorage.setItem(LS_PASSWORD, pwd);
}

function checkedAvatar() {
  const beforeChecked = document.querySelector(`.${CN_CHECKED}`);

  if (beforeChecked !== null) beforeChecked.classList.remove(CN_CHECKED);
  this.classList.add(CN_CHECKED);
}
