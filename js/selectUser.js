function getUsers(){
    const users = JSON.parse(localStorage.getItem(LS_USERS));
    return users;
}
function setUser(users){
    localStorage.setItem(LS_USERS, JSON.stringify(users));
}

function createUserNode(user){
    const li = document.createElement('li'),
        divAf = document.createElement('div'),
        img = document.createElement('img'),
        spanAf = document.createElement('span'),
        divBef = document.createElement('div'),
        spanBef1 = document.createElement('span'),
        spanBef2 = document.createElement('span');

    li.classList.add('users__user');
    li.classList.add('user');

    divAf.classList.add('user__column');
    img.classList.add('user__avatar');
    img.classList.add('g-avatar');
    spanAf.classList.add('user__name');

    divBef.classList.add('user__column');
    spanBef1.classList.add('user__things');
    spanBef2.classList.add('user__cnt');

    //console.log(user);
    li.id = `${user.id}`;
    img.src = user.avatar;
    if(user.id === 0){
        spanAf.innerHTML = user.name + ' &nbsp;<i class="fas fa-crown"></i>';
    }else{
        spanAf.innerText = user.name;
    }
    spanBef1.innerText = 'Things to do today';
    spanBef2.innerText = '5'; //임시 숫자.

    divAf.appendChild(img);
    divAf.appendChild(spanAf);

    divBef.appendChild(spanBef1);
    divBef.appendChild(spanBef2);

    li.appendChild(divAf);
    li.appendChild(divBef);

    return li;
}

function selectCurrentUser(e){
    const users = getUsers();
        currentUser = new CurrentUser(users[parseInt(this.id)]);

    //console.log(currentUser);
    setCurrentUser(currentUser);

    //localStorage.setItem(LS_CURRENTUSER, JSON.stringify(currentUser));
    location.replace('todo.html');
}

function printUsers(users){
    const userList = document.querySelector('.users__list');
    for(i=0; i < users.length; i++){
        const li = createUserNode(users[users.length-(i+1)]);
        userList.appendChild(li);
        li.addEventListener('click', selectCurrentUser);
    }
}

function loadUser(){
    const users = getUsers();
    if(users === null){
        location.replace('start.html');
    }else{
        printUsers(users);
    }
}

function init(){
    if(checkConnected()){
        loadCurrentUser();
        location.replace('todo.html');
    }
    loadUser();
}

init();