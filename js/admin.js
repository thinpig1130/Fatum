const authenForm = document.querySelector('.admin__authentication'),
  adminPwd = authenForm.querySelector('input');
(adminBox = document.querySelector('.admin')),
  (userListDiv = document.querySelector('.js-user__list'));

function authenicationAdmin() {
  event.preventDefault();
  const localPwd = localStorage.getItem(PASSWORD_LS);
  if (adminPwd.value === localPwd) {
    authenForm.classList.add(HIDING_CN);
    adminBox.classList.remove(HIDING_CN);
  } else {
    const adminMsg = document.querySelector('.admin__msg');
    adminMsg.innerHTML = '비밀번호를 잘못 입력하셨습니다.';
    adminPwd.value = '';
  }
}

function basicSetting() {
  adminBox.classList.add(HIDING_CN);
}

function init() {
  basicSetting();
  authenForm.addEventListener('submit', authenicationAdmin);
}

init();
