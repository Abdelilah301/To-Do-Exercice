const App = document.querySelector('#app');

App.innerHTML = `
                <h2>Todo List</h2>
                
                <button class="darkTheme" id="themeButton"><i class="far fa-moon"></i></button>
                <input id="todoInput" placehoder="todo">
                <button id="todoButton">ADD</button>
                <hr/>

                <div class="list">
                <h4>Todo<hr/></h4>
                <img id="emptyTodo" class="image" src="edit-list.png" alt="To-Do is Empty !" width="30" height="35">
                <ul id="todoList"></ul>
                </div>
                
                <div class="list">
                <h4>Done<hr/></h4> 
                <img id="emptyDone" class="image" src="edit-list.png" alt="Done is Empty !" width="30" height="35"> 
                <ul id="doneList"></ul>
                </div>
`;

const todoInput = document.querySelector('#todoInput');
const todoButton = document.querySelector('#todoButton');
const todoList = document.querySelector('#todoList');
const doneList = document.querySelector('#doneList');
const darkMode = document.querySelector('#darkMode');
const darkLabel = document.querySelector('#labelId');
const themeButton = document.querySelector('#themeButton');
const emptyTodo = document.querySelector('#emptyTodo');
const emptyDone = document.querySelector('#emptyDone');



/// if the list is empty add/remove the css class 'hide'
const emptyListImg = ()=>{
    if(todoList.children.length){
        emptyTodo.classList.replace('image', 'hide');
        
    } else {
        emptyTodo.classList.replace('hide', 'image');
    }

    if(doneList.children.length){
        emptyDone.classList.replace('image', 'hide');
    } else {
        emptyDone.classList.replace('hide', 'image')
    }

}


themeButton.addEventListener('click', () => {
    darkTheme();
});

todoInput.addEventListener('keyup', (event) => {
    // if the user Press Enter
    if (event.keyCode === 13) {
        event.preventDefault();
        addInput();
        console.log(event);
    }
});

todoButton.addEventListener('click', () => {
    addInput();
});

// change the theme of the Page
const darkTheme = () => {
    // Toggle Theme Modes
    // check dark-mode is applied in classList
    const element = document.body;
    const darkMode = element.classList.toggle("dark-mode");

    // we update the button innerHtml based on the return of The Toggle.
    themeButton.innerHTML = darkMode ? `<i class="fas fa-sun"></i>` : `<i class="far fa-moon"></i>`;

};

// doCheck  we use it to verify if the input is checked or not if checked move it to Done List.
const doCheck = (element) => {
    const itemTomove = element.parentElement;
    // console.log('itemTomove :',itemTomove);
    if (element.checked) {
        //  console.log("checked...");
        todoList.removeChild(itemTomove);
        doneList.appendChild(itemTomove);
    } else {
        // console.log("unchecked...");
        doneList.removeChild(itemTomove);
        todoList.appendChild(itemTomove);
    }
    // check which of the list is empty 
    emptyListImg();
};

// addInput() To add input with its value.
const addInput = () => {
    const li = document.createElement('li');
    const inputValue = todoInput.value;
    // check if the input is less 3 than 3 or empty
    if (inputValue == '' || inputValue.length < 3) {
        alert('todo empty or less than 3 characters');
        todoInput.value = '';
    } else {
        // generate an increment Id for checkbox to keep tracking it.
        const checkboxId = `checkbox-${todoList.children.length}`;
        // insert an input in todoList 
        li.innerHTML = `<input id="${checkboxId}" type="checkbox" name="myCheckbox" onchange="doCheck(this)"/><label for ="${checkboxId}">${inputValue}</label>`;

        todoList.appendChild(li);
        todoInput.value = '';
    };
// if the TodoList is empty.
    emptyListImg();
};