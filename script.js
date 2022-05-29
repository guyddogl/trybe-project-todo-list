const inputText = document.getElementById('texto-tarefa');
const buttonAdd = document.getElementById('criar-tarefa');
const buttonClear = document.getElementById('apaga-tudo');
const buttonSaveList = document.getElementById('salvar-tarefas');
const buttonCompleted = document.getElementById('remover-finalizados');
const buttonDelete = document.getElementById('remover-selecionado');
const toDoList = document.getElementById('lista-tarefas');
const toDoListItems = document.getElementById('lista-tarefas').children;

// Requisito 7
function changeBackground(event) {
  const itemSelected = event.target;
  if (itemSelected.classList.contains('itemSelected')) {
    itemSelected.classList.toggle('itemSelected');
  } else {
    for (let index = 0; index < toDoListItems.length; index += 1) { // Requisito 8
      toDoListItems[index].classList.remove('itemSelected');
    }
    itemSelected.classList.toggle('itemSelected');
  }
}

// Requisito 9
function taskCompleted(event) {
  const itemDbcliked = event.target;
  itemDbcliked.classList.toggle('completed');
  // const iconCheck = document.getElementById(itemDbcliked.id).firstElementChild;
  // console.log(iconCheck);
  // iconCheck.style.display = 'inline-block';
}

// Requisito 5 e 6
function dontSelect(e) { // Não permite selecionar o texto da tarefa
  e.preventDefault();
}

function addToList() {
  const inputItem = inputText.value;
  const newItem = document.createElement('li');
  newItem.innerHTML = `${inputItem}`; // newItem.innerHTML = `${inputItem} <span class="badge check"><i class="fas fa-check"></i></span>`;
  newItem.setAttribute('id', Date.now());
  newItem.classList.add('list-group-item', 'cursorPointer');
  newItem.addEventListener('click', changeBackground);
  newItem.addEventListener('dblclick', taskCompleted); // Requisito 9
  newItem.addEventListener('mousedown', dontSelect); // Não permite selecionar o texto da tarefa
  toDoList.appendChild(newItem);
  inputText.value = '';
}

buttonAdd.addEventListener('click', addToList);

function inputEnter(event) { // Permite adicionar tarefa a lista ao apertar Enter
  if (event.key === 'Enter') {
    addToList();
  }
}

inputText.addEventListener('keyup', inputEnter);

// Requisito 10
function clearList() {
  toDoList.innerHTML = '';
  localStorage.setItem('savedList', toDoList.innerHTML);
}

buttonClear.addEventListener('click', clearList);

// Requisito 11
function deleteCompleted() {
  const tasksCompleted = document.getElementsByClassName('completed');
  while (tasksCompleted.length > 0) {
    tasksCompleted[0].parentNode.removeChild(tasksCompleted[0]);
  }
}

buttonCompleted.addEventListener('click', deleteCompleted);

// Requisito 12
function saveList() {
  const itemsToSave = toDoList.innerHTML;
  localStorage.setItem('savedList', itemsToSave);
}

function recoverList() {
  toDoList.innerHTML = localStorage.getItem('savedList');
  for (let index = 0; index < toDoListItems.length; index += 1) {
    toDoListItems[index].addEventListener('click', changeBackground);
    toDoListItems[index].addEventListener('dblclick', taskCompleted);
  }
  return toDoList;
}

buttonSaveList.addEventListener('click', saveList);

// Requisito 14
function deleteSelected() {
  const deleteTask = document.getElementsByClassName('itemSelected');
  deleteTask[0].parentNode.removeChild(deleteTask[0]);
}

buttonDelete.addEventListener('click', deleteSelected);

window.onload = recoverList();
