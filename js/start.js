const startForm = document.querySelector('.js-start__form'),
  submitBtn = startForm.querySelector('.js-form__button');

function startUser() {
  const name = startForm.querySelector('.js-form__name'),
    pwd = startForm.querySelector('.js-form__pwd1'),
    imgsrc = startForm.querySelector('.js-form__avatar');

  console.log(name);

  let managerObj = new User(1, name.value, imgsrc.value),
    currentObj = new CurrentUser(managerObj);

  users.push(managerObj);
  saveUsers(); //usebase.js
  setCurrentUser(currentObj); //usebase.js
  savePassword(pwd.value);

  location.replace('index.html');
}

function init() {
  submitBtn.addEventListener('click', startUser);
}

init();
