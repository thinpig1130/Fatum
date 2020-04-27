//form 값을 입력했는지 여부를 검사하는 함수 추가요망.
function registerUser(e){
    event.preventDefault();
    const checkedAvatar = document.querySelector(`.${CN_CHECKED}`),
        nameNode = this.querySelector('.start__name'),
        pwdNode = this.querySelector('.start__password'),
        srcArr = (checkedAvatar.src).split('/'); 

    let users = [];
    const user = new User(0, nameNode.value, srcArr[srcArr.length-1]);
    users.push(user);
    setUsers(users);
    setPwd(pwdNode.value);

    location.replace('index.html');
}

function checkedAvatar(){
    const beforeChecked = document.querySelector(`.${CN_CHECKED}`);
    
    if(beforeChecked !== null) beforeChecked.classList.remove(CN_CHECKED);
    this.classList.add(CN_CHECKED);
}

function avatarLoad(cnt){
    const avatarDiv = document.querySelector('.start__avatar-set'),
        image = new Image();

    image.src= `images/${cnt}.jpg`;
    
    image.onload = function(){
        image.classList.add('start__avatar');
        image.classList.add('g-avatar');
        avatarDiv.appendChild(image);
        image.addEventListener('click', checkedAvatar);
        avatarLoad(cnt+1);
    }

    image.onerror = function(){}
}

function init(){
    if( getUsers() !== null) location.replace('index.html');

    const form = document.querySelector('.start__form');
    avatarLoad(0);
    form.addEventListener('submit', registerUser);
}

init();