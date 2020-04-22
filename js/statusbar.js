const clockContainer = document.querySelector(".js-clock");

function getDate(){
    const dateObj = new Date(),
        year = dateObj.getFullYear(),
        month = dateObj.getMonth() + 1,
        date = dateObj.getDate(),
        day = dateObj.getDay();

    dateId = ((((year * 100) + month) * 100 + date)* 10 + day);
    
    return dateId;
}

function printToday(dateId){


    return dateString;
}

function getTime(){
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    clockContainer.innerText = `${hours < 10 ? `0${hours}` : hours} : ${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`;    
}




function init(){
    setInterval(getTime, 1000);
    getDate();
    printToday();
};

init();