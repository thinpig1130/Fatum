const todos = document.querySelector('.js-todos'),
    todoDate = todos.querySelector('.js-todos__date'),
    todoList =  todos.querySelector('.js-todos__list');

let storageId;

function setDate(inputId){

    if (inputId === null){
        const dateObj = new Date(), 
          year = dateObj.getFullYear(),
          month = dateObj.getMonth()+1,
          date = dateObj.getDate();
    
        inputId = year*10000 + month *100 + date;
    }
    return inputId;
  }

  function loadTodos(){
      
  }

  function init(){
    storageId = setDate();
  }

  init();