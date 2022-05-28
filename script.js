const inputText = document.getElementById('texto-tarefa');
const buttonAdd = document.getElementById('criar-tarefa');
const toDoList = document.getElementById('lista-tarefas');

// Requisito 5 e 6
function addToList() {
  const inputItem = inputText.value;
  const newItem = document.createElement('li');
  newItem.innerText = inputItem;
  toDoList.appendChild(newItem);
  inputText.value = '';
}

buttonAdd.addEventListener('click', addToList);
