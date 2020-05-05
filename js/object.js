/*
 * LS (Local Storage)
 * CN (Class Name)
 * 전역변수 users
 *
 */

const LS_USERS = 'users',
  LS_PASSWORD = 'pwd',
  LS_CURRENTUSER = 'currentuser',
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

function TodoList(dateId) {
  this.dateId = dateId;
  this.todos = [];
}

function Todo(content) {
  this.content = content;
  this.done = false;
}

//노드 순번 검사
function getIndex(ele) {
  let i = 0;
  while ((ele = ele.previousSibling) != null) {
    i++;
  }
  return i;
}

//주소창에 입력된 파라미터 값을 찾아오는 함수.(다른 소스 인용)
function getParameterByName(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
    results = regex.exec(location.search);
  return results === null
    ? ''
    : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// 노드에 해당 클래스가 존재하는지 검사하는 함수
function hasClass(node, className) {
  let result = false;
  const classArr = node.classList;
  for (x in classArr) {
    if (classArr[x] === className) {
      result = true;
      break;
    }
  }
  return result;
}
