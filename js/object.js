/*
 * LS (Local Storage)
 * CN (Class Name)
 * 전역변수 users
 * 
 */

const LS_USERS = 'uesrs',
    LS_PASSWORD = 'pwd',
    LS_CURRENTUSER = 'currentusers',
    CN_CHECKED = 'checked',
    CN_HIDING = 'hiding';

function User(id, name, avater) {
    this.id = id;
    this.name = name;
    this.avatar = avater;
  }

function CurrentUser(user) {
    this.id = user.id;
    this.name = user.name;
    this.date = Date.now();
}