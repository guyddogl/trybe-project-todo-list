const inputText = document.getElementById('texto-tarefa');
const buttonAdd = document.getElementById('criar-tarefa');
const toDoList = document.getElementById('lista-tarefas');
const toDoListItems = document.getElementById('lista-tarefas').children;

// Requisito 7
function changeBackground(event) {
  for (let index = 0; index < toDoListItems.length; index +=1) { // Requisito 8
    toDoListItems[index].classList.remove('itemSelected');
  }
  const itemSelected = event.target;
  itemSelected.classList.add('itemSelected');
}

// Requisito 9
function taskCompleted(event) {
  const itemDbcliked = event.target;
  itemDbcliked.classList.toggle('completed');
}

// Requisito 5 e 6
function addToList() {
  const inputItem = inputText.value;
  const newItem = document.createElement('li');
  newItem.innerText = inputItem;
  newItem.addEventListener('click', changeBackground);
  newItem.addEventListener('dblclick', taskCompleted); // Requisito 9
  toDoList.appendChild(newItem);
  inputText.value = '';
}

buttonAdd.addEventListener('click', addToList);
