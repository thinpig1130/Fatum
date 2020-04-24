function init(){
    if(!checkConnected()){
        location.replace('index.html');
    }
}

init();