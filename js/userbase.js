function getUsers(){
    const users = JSON.parse(localStorage.getItem(LS_USERS));
    return users;
}

function setUsers(users){
    localStorage.setItem(LS_USERS, JSON.stringify(users));
}

function setPwd(pwd){
    localStorage.setItem(LS_PASSWORD, pwd);
}