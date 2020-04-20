const authenForm = document.querySelector('.admin__authentication'),
  adminPwd = authenForm.querySelector('input'),
  adminBox = document.querySelector('.admin'),
  userListDiv = adminBox.querySelector('.js-user__list'),
  userPlusForm= adminBox.querySelector('.js-admin__user-plus'),
  iconUserPlus= adminBox.querySelector('.admin__icon-user-plus'),
  iconUserMinus= adminBox.querySelector('.admin__icon-user-minus');

function userRegistration(event){
  event.preventDefault();
  const nameBox = userPlusForm.querySelector('.js-user-plus__name'),
    avatarBox = userPlusForm.querySelector('.js-user-plus__avatar'),
    user = new User(users.length+1, nameBox.value, avatarBox.value);
    saveUsers(user);
    nameBox.value="";
    avatarBox.value="";
    userPlusForm.classList.add(HIDING_CN);
    loadUsers();
}

function visibleForm(){
  userPlusForm.classList.remove(HIDING_CN);
  userPlusForm.addEventListener('submit', userRegistration);
}

function deleteUser(event){
  const currentBtn = event.target,
      currentLi = currentBtn.parentNode;
  
  userListDiv.removeChild(currentLi);

  let idNum = parseInt(currentLi.id);

  let arr=[];
  for(i= 0 ; i < (users.length) ; i++){
    if(i !== (idNum-1)){
      if(i > (idNum-1)){      
        users[i].id = parseInt(users[i].id)-1;
        let li = document.getElementById(`${i+1}`);
        li.id = `${i}`;
      }
      arr.push((users[i]));
    }
  }

  localStorage.setItem(USERS_LS, JSON.stringify(arr));

  for(i=2; i < users.length; i++){
    const li = document.getElementById(`${i}`),
      btn = li.querySelector('input');
    li.removeChild(btn);
  }

  iconUserMinus.classList.remove(HIDING_CN);
  loadUsers();
  
}

function visibleMinusButton(){
  for(i=2; i < users.length+1; i++){
    const li = document.getElementById(`${i}`);
    const deleteBtn = document.createElement('input');
    deleteBtn.type = "button";
    deleteBtn.value = "delete";
    deleteBtn.addEventListener('click', deleteUser);
    li.appendChild(deleteBtn);
  }
  iconUserMinus.classList.add(HIDING_CN);
}

function authenicationAdmin(event) {
  event.preventDefault();
  const localPwd = localStorage.getItem(PASSWORD_LS);
  if (adminPwd.value === localPwd) {
    authenForm.classList.add(HIDING_CN);
    adminBox.classList.remove(HIDING_CN);
    iconUserPlus.addEventListener('click', visibleForm);
    iconUserMinus.addEventListener('click', visibleMinusButton)
  } else {
    const adminMsg = document.querySelector('.admin__msg');
    adminMsg.innerHTML = '비밀번호를 잘못 입력하셨습니다.';
    adminPwd.value = '';
  }
}

function basicSetting() {
  adminBox.classList.add(HIDING_CN);
  userPlusForm.classList.add(HIDING_CN);
}

function loadUsers() {
  userListDiv.innerHTML="";
  const userList = localStorage.getItem(USERS_LS);
  if (userList !== null) {
    users = JSON.parse(userList);
    users.forEach(function (user){
      const li = showUser(user);
      userListDiv.insertBefore(li, userListDiv.firstChild);
    });
  } else {
    alert('잘못된 접근입니다.');
    location.replace('start.html');
  }
}

function init() {
  loadUsers();
  basicSetting();
  authenForm.addEventListener('submit', authenicationAdmin);
}

init();
