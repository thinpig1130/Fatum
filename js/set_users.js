function registerUser(event){
    //event.preventDefault();

    const userName = document.querySelector('.musers__name'),
          userAvatar =  document.querySelector(`.${CN_CHECKED}`),
          avatarSrc = (userAvatar.src).split('/');
    
    let users = getUsers();
    const user = new User(users.length , userName.value, avatarSrc[avatarSrc.length-1]);

    users.push(user);
    setUsers(users);
}

function checkUseAvatar(cnt){
    let users = getUsers(),
        bool = false;

    for (x in users){
        if (users[x].avatar === `${cnt}.jpg`){
            bool = true;
            break;
        }
    }
    return bool
}

function removeUser(event){
      
    const li = this.parentNode,
    ul = li.parentNode;
    let users = getUsers();
    
    let checkRemove = confirm("'"+ users[li.id].name +
         "'님을 정말로 삭제 하시겠습니까?\n (경고 : 해당 사용자의 등록된 할일 목록들이 함께 삭제 됩니다.)");
    if(checkRemove){
        let transUsers=[];
        ul.removeChild(li);

        for(i in users){
            console.log(users[i]);
            if(i < li.id){
                transUsers.push(users[i]);            
            }else if(i>li.id){
                users[i].id = i-1;
                transUsers.push(users[i]);
            }
        }
        setUsers(transUsers);
    }
    location.reload(true); 
}

function activationMinus(){
    const lis = document.querySelectorAll('.musers__muser'),
        btnCheck = lis[0].querySelector('.fa-times-circle');

    //console.log(btnCheck);
    if(btnCheck === null){
        for(i=0; i< lis.length; i++){
            //console.log(i);
            if(lis[i].id !== '0'){
            const delBtn = document.createElement('i');
            delBtn.classList.add('far');
            delBtn.classList.add('fa-times-circle');
            delBtn.addEventListener('click', removeUser);
            lis[i].appendChild(delBtn);
            }
        }    
    }else{
        for(i=0; i < lis.length; i++){
            if(lis[i].id !== '0'){
                const btn = lis[i].querySelector('.fa-times-circle');
                lis[i].removeChild(btn);
            }
        }
    }
}

function avatarLoad(cnt){
    
    const avatarDiv = document.querySelector('.g-avatar-set'),
        image = new Image();

    image.src= `images/${cnt}.jpg`;
    
    image.onload = function(){
        if(!checkUseAvatar(cnt)){
            image.classList.add('muser__avatar');
            image.classList.add('g-avatar');
            avatarDiv.appendChild(image);
            image.addEventListener('click', checkedAvatar);
        }
        avatarLoad(cnt+1);
    }
}

function createUserLi(user){
    const li = document.createElement('li'),
        img = document.createElement('img'),
        span = document.createElement('span');
    
    li.classList.add('musers__muser');
    li.classList.add('muser');
    img.classList.add('muser__avatar');
    img.classList.add('g-avatar');

    li.id = `${user.id}`;
    img.src = `images/${user.avatar}`;

    li.appendChild(img);
    li.appendChild(span);
    
    if(user.id === 0){
        span.innerHTML = user.name + ' &nbsp;<i class="fas fa-crown"></i>';
    }else{
        span.innerText = user.name;
    }

    return li;
}

function usersLoad(){
    const users = getUsers();
    if(users === null){
        location.replace('start.html')
    }else{
        const userUl = document.querySelector('.musers__minus');
        for(i=0; i < users.length; i++){
            const li = createUserLi(users[users.length-(i+1)]);
            userUl.appendChild(li);
        }
    }

}

function init(){
    const form = document.querySelector('.musers__form'),
        minusBtn = document.querySelector('.fa-user-minus');
    
    form.addEventListener('submit', registerUser);
    minusBtn.addEventListener('click', activationMinus);
    avatarLoad(0);
    usersLoad();
}

init();