const statusbar = document.querySelector('.js-statusbar'),
  statusSpan = statusbar.querySelector('span'),
  logoutButton = statusbar.querySelector('input');

let currentUser;

//상태바 로드.
function loadCurrentUser() {
  currentUser = localStorage.getItem(CURRENTUSER_LS);
  if (currentUser !== null) {
    currentUser = JSON.parse(currentUser);
    statusSpan.innerHTML = `Hello, ${currentUser.name}님 <i class="far fa-user"></i>`;
    logoutButton.classList.remove(HIDING_CN);
  } else {
    statusSpan.innerText = 'Please select a user. ';
    logoutButton.classList.add(HIDING_CN);
  }
}

//logout을 할 경우.
function removeCurrentUser() {
  localStorage.removeItem(CURRENTUSER_LS);
  loadCurrentUser();
}

function init() {
  logoutButton.addEventListener('click', removeCurrentUser);
  loadCurrentUser();
}

init();
