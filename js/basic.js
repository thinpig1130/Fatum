function getCurrentUser(){
   const currentUser = JSON.parse(localStorage.getItem(LS_CURRENTUSER));
   return currentUser;
}

function setCurrentUser(currentUser){
    localStorage.setItem(LS_CURRENTUSER, JSON.stringify(currentUser));
}

function checkConnected(){
    const currentUser = getCurrentUser();
    
    if(currentUser === null){
        return false;
    }else{
        return true;
    }
}

function checkManageConnected(){
    const currentUser = getCurrentUser();
    
    if(currentUser === null){
        return false;
    }else if(currentUser.id === 0){
        return true;
    }else{
        return false;
    }
}

function outCurrentUser(){
    localStorage.removeItem(LS_CURRENTUSER);
    location.replace('index.html');
}

function checkConnectedTime(currentUser){
    const now = Date.now(),
     elapsedMinutes = parseInt((now-currentUser.date)/(1000*60));    

    return elapsedMinutes; //분 단위로 반환
}

function loadCurrentUser(){
    const currentUser = getCurrentUser(),
        min = checkConnectedTime(currentUser);

        //console.log(min);

    if(min >= 10){
        outCurrentUser();
    }else{
        currentUser.date = Date.now();
        setCurrentUser(currentUser);
    }
}

function init(){
    if(checkConnected()){
        loadCurrentUser();
    }
}

init();


// 로그인 시점 확인하여
// 10분이 지났으면 로그아웃 하는 함수.

// 페이지가 로드 될때 마다, 
// 또는 페이지 내용이 변경될때 마다
// 로그인 시점을 연장해 준다. 

