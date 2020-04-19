/**
 * LS (Local Storage)
 * CN (Class Name)
 */

const CURRENTUSER_LS = 'currentusers',
  USERS_LS = 'users',
  HIDING_CN = 'hiding',
  CHECKED_CN = 'checked',
  PASSWORD_LS = 'pwd';

//사용자 객체
function User(id, name, avater) {
  this.id = id;
  this.name = name;
  this.avatar = avater;
}

//현재 사용자 객체
function CurrentUser(user) {
  this.id = user.id;
  this.name = user.name;
  this.date = new Date();
}
