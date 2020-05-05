const clockContainer = document.querySelector('.js-clock'),
  todayContainer = document.querySelector('.js-today');

function getDate(dateObj) {
  if (dateObj === undefined) dateObj = new Date();

  const year = dateObj.getFullYear(),
    month = dateObj.getMonth() + 1,
    date = dateObj.getDate(),
    day = dateObj.getDay();

  let dateId = ((year * 100 + month) * 100 + date) * 10 + day;
  return dateId;
}

function getDateTostring(dateId) {
  const year = parseInt(dateId / 100000),
    month = parseInt(dateId / 1000) % 100,
    date = parseInt(dateId / 10) % 100,
    day = parseInt(dateId % 10),
    dayString = ['일', '월', '화', '수', '목', '금', '토'];

  let dateString =
    year + '년 ' + month + '월 ' + date + '일 (' + dayString[day] + '요일)';

  return dateString;
}

function getTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  clockContainer.innerText = `${hours < 10 ? `0${hours}` : hours} : ${
    minutes < 10 ? `0${minutes}` : minutes
  } : ${seconds < 10 ? `0${seconds}` : seconds}`;

  //0시 0분 0초 (날짜가 바뀔경우)
  if (hours === 0 && minutes === 0 && seconds === 0) {
    todayContainer.innerText = getDateTostring(getDate());
  }
}

function init() {
  //1초마다 초시계가 돌아가도록 setting
  setInterval(getTime, 1000);
  //오늘 날짜를 dateId 형태로 반환.
  const dateId = getDate();
  //날짜를 출력형태로 전환 후 출력
  todayContainer.innerText = getDateTostring(dateId);
}

init();
