function getTodoDate() {
  let dateId = getParameterByName('date');
  if (dateId === '') dateId = getDate();
  return parseInt(dateId);
}

function setTodos(userTodos, userId) {
  if (userId === undefined) userId = getCurrentUser().id;
  localStorage.setItem(userId, JSON.stringify(userTodos));
}
