const inputText = document.getElementById('texto-tarefa');
const buttonAdd = document.getElementById('criar-tarefa');
const buttonClear = document.getElementById('apaga-tudo');
const buttonSaveList = document.getElementById('salvar-tarefas');
const buttonCompleted = document.getElementById('remover-finalizados');
const buttonDelete = document.getElementById('remover-selecionado');
const buttonMoveUp = document.getElementById('mover-cima');
const buttonMoveDown = document.getElementById('mover-baixo');
const toDoList = document.getElementById('lista-tarefas');
const toDoListItems = document.getElementById('lista-tarefas').children;

function notification(status, message) {
  SnackBar({
    status,
    message: `<span class="${status}">${message}</span>`,
    position: 'tc',
    width: '300px',
    timeout: 3000 });
}

// Requisito 7
function changeBackground(event) {
  const itemSelected = event.target;
  if (itemSelected.classList.contains('itemSelected')) {
    itemSelected.classList.toggle('itemSelected'); // toggle
  } else {
    for (let index = 0; index < toDoListItems.length; index += 1) { // Requisito 8
      toDoListItems[index].classList.remove('itemSelected');
    }
    itemSelected.classList.toggle('itemSelected'); // add to lint
  }
}

// Requisito 9
function taskCompleted(event) {
  const itemDbcliked = event.target;
  itemDbcliked.classList.toggle('completed');
  const iconCheck = document.getElementById(itemDbcliked.id).firstElementChild;
  iconCheck.classList.toggle('done');
}

// Requisito 5 e 6
function dontSelect(e) { // Não permite selecionar o texto da tarefa
  e.preventDefault();
}

function focusOut() {
  inputText.classList.remove('placeholdercolor');
  inputText.placeholder = 'Digite aqui a tarefa';
}

inputText.addEventListener('blur', focusOut);

function focusIn() {
  notification('danger', '<i class="fas fa-exclamation-circle"></i> Digite o nome da tarefa');
  inputText.focus();
  inputText.classList.add('placeholdercolor');
  inputText.placeholder = 'Esta campo não pode ficar em branco';
}

function addToList() {
  if (!inputText.value.trim()) {
    focusIn();
  } else {
    const inputItem = inputText.value;
    const newItem = document.createElement('li');
    newItem.innerHTML = `${inputItem} <span class="badge done"><i class="fas fa-check"></i></span>`; // newItem.innerHTML = `${inputItem}`;
    newItem.setAttribute('id', Date.now());
    newItem.classList.add('list-group-item', 'cursorPointer');
    newItem.addEventListener('click', changeBackground);
    newItem.addEventListener('dblclick', taskCompleted); // Requisito 9
    newItem.addEventListener('mousedown', dontSelect); // Não permite selecionar o texto da tarefa
    toDoList.appendChild(newItem);
    inputText.value = '';
    notification('success', '<i class="fas fa-plus-circle"></i> Tarefa adicionada');
  }
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
  notification('danger', '<i class="fas fa-trash"></i> Excluiu a lista');
}

buttonClear.addEventListener('click', clearList);

// Requisito 11
function deleteCompleted() {
  const tasksCompleted = document.getElementsByClassName('completed');
  while (tasksCompleted.length > 0) {
    tasksCompleted[0].parentNode.removeChild(tasksCompleted[0]);
  }
  notification('primary', '<i class="fas fa-tasks"></i> Limpou as completas');
}

buttonCompleted.addEventListener('click', deleteCompleted);

// Requisito 12
function saveList() {
  const itemsToSave = toDoList.innerHTML;
  localStorage.setItem('savedList', itemsToSave);
  notification('success', '<i class="fas fa-save"></i> Salvou a lista');
}

function recoverList() {
  toDoList.innerHTML = localStorage.getItem('savedList');
  for (let index = 0; index < toDoListItems.length; index += 1) {
    toDoListItems[index].addEventListener('click', changeBackground);
    toDoListItems[index].addEventListener('dblclick', taskCompleted);
    toDoListItems[index].classList.remove('itemSelected');
  }
  return toDoList;
}

buttonSaveList.addEventListener('click', saveList);

// Requisito 13
function moveUp() {
  const getItemSelected = document.querySelector('.itemSelected');
  if (getItemSelected && getItemSelected.previousElementSibling) {
    const getParent = getItemSelected.parentNode;
    getParent.insertBefore(getItemSelected, getItemSelected.previousElementSibling);
  } else {
    notification('danger', '<i class="fas fa-exclamation-circle"></i> Está no topo da lista');
  }
}

buttonMoveUp.addEventListener('click', moveUp);

function moveDown() {
  const getItemSelected = document.querySelector('.itemSelected');
  if (getItemSelected && getItemSelected.nextElementSibling) {
    const getParent = getItemSelected.parentNode;
    getParent.insertBefore(getItemSelected, getItemSelected.nextElementSibling.nextElementSibling);
  } else {
    notification('danger', '<i class="fas fa-exclamation-circle"></i> Está no final da lista');
  }
}

buttonMoveDown.addEventListener('click', moveDown);

// Requisito 14
function deleteSelected() {
  const deleteTask = document.getElementsByClassName('itemSelected');
  deleteTask[0].parentNode.removeChild(deleteTask[0]);
  notification('warning', '<i class="fas fa-trash-alt"></i> Excluiu a tarefa');
}

buttonDelete.addEventListener('click', deleteSelected);

window.onload = recoverList();
