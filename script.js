const inputText = document.getElementById('texto-tarefa');
const buttonAdd = document.getElementById('criar-tarefa');
const toDoList = document.getElementById('lista-tarefas');

// Requisito 7
function changeBackground(event) {
  const itemSelected = event.target;
  itemSelected.classList.add('itemSelected');
}

// Requisito 5 e 6
function addToList() {
  const inputItem = inputText.value;
  const newItem = document.createElement('li');
  newItem.innerText = inputItem;
  newItem.addEventListener('click', changeBackground);
  toDoList.appendChild(newItem);
  inputText.value = '';
}

buttonAdd.addEventListener('click', addToList);
