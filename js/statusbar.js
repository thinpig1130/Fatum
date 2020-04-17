const statusbar = document.querySelector(".js-statusbar"),
     statusSpan = statusbar.querySelector("span"),
     logoutButton = statusbar.querySelector("");

const CURRENTUSER_LS = "currentusers";


function loadCurrentUser(){
    const currentUser = localStorage.getItem(CURRENTUSER_LS);
    if(currentUser!== null){
        
    }else{
        
    }
}

function init(){
}

init();