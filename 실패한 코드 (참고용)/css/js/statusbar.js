const statusbar = document.querySelector('.js-statusbar'),
  statusSpan = statusbar.querySelector('span'),
  logoutButton = statusbar.querySelector('.logout-button'),
  adminButton = statusbar.querySelector('.admin-button');

let currentUser;

//상태바 로드.
function loadCurrentUser() {
  currentUser = localStorage.getItem(CURRENTUSER_LS);
  if (currentUser !== null) {
    currentUser = JSON.parse(currentUser);
    statusSpan.innerHTML = `Hello, ${currentUser.name}님 <i class="far fa-user"></i>`;
    logoutButton.classList.remove(HIDING_CN);
    if (currentUser.id == 1) adminButton.classList.remove(HIDING_CN);
  } else {
    statusSpan.innerText = 'Please select a user. ';
    logoutButton.classList.add(HIDING_CN);
    adminButton.classList.add(HIDING_CN);
  }
}

//logout을 할 경우.
function removeCurrentUser() {
  localStorage.removeItem(CURRENTUSER_LS);
  loadCurrentUser();
  location.replace('index.html');
}

function goAdminPage() {
  location.replace('admin.html');
}

function init() {
  logoutButton.addEventListener('click', removeCurrentUser);
  adminButton.addEventListener('click', goAdminPage);
  loadCurrentUser();
}

init();
