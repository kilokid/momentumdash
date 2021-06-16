const toDoForm = document.querySelector('.js-toDoForm'),
    toDoInput = toDoForm.querySelector('input'),
    toDoList = document.querySelector('.js-toDoList');

const TODOS_LS = 'toDos';
let toDos = [];


function loadToDos() {
    const loaded_todos = localStorage.getItem(TODOS_LS);
    if (loaded_todos !== null) {
        const parseToDos = JSON.parse(loaded_todos);
        parseToDos.forEach(function(toDo){
            showToDos(toDo.name);
        });
    }
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function showToDos(text) {
    const li = document.createElement('li');
    const delBtn = document.createElement('button');
    const span = document.createElement('span');
    const newId = toDos.length + 1;
    delBtn.innerHTML = '❌';
    delBtn.addEventListener('click', deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObject = {
        name: text,
        id: newId
    }
    toDos.push(toDoObject);
    saveToDos();
}


function submitHandler(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    showToDos(currentValue);
    toDoInput.value = '';
}

function init() {
    loadToDos();
    toDoForm.addEventListener('submit', submitHandler);
}

init();