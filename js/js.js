import * as _db from './DatabaseJS.js';
import { addTask } from "./TaskCreation";



/****************************************************************
Getting data from Firebase API
****************************************************************/
const dbCollection = db.collection('task').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        _db.renderTasksFromDB(doc);
    })
})



/****************************************************************
Constants and Variables
****************************************************************/

// Query selector for addBtn
const addButton = document.querySelector(".main-header--add-task-btn");

// Query selector for mainBody
const mainBody = document.querySelector(".main-frame");

// Query selector for input
const input = document.querySelector(".input");

// Query selector for all Delete btns of each task
let deleteBtns = document.querySelectorAll(".task__delete-task");





/****************************************************************
Main Functions
****************************************************************/

// Function for adding new tasks with imput text
const addNewTask = () => {
    if (addButton.classList.contains("main-header__add-task-btn__active") || input.value !=="ADD NEW TASK") { //TODO: Fix bug TC: 1. Add a valid task 2.Press addButton again -> new ADD NEW TASK task will be added 
    
        let inputValue = getInputValue(input);
        let taskIdDB = _db.addTaskToDBAndReturnID(inputValue);

        addTask(inputValue, taskIdDB);
        insertValueIntoElement("ADD NEW TASK", input);
        myRefresh();

        //Function for getting an value from input
        function getInputValue(input) {
            return input.value.toUpperCase();
        }

        //function for giving an element desired value
        function insertValueIntoElement(value, element){
            element.value = value;
        }
    }
}


// Function for refreshing the delete btns array 
const myRefresh = (deleteBtns) => {
    deleteBtns = document.querySelectorAll(".task__delete-task");
}







/****************************************************************
Main Body
****************************************************************/

//Eventlistener for ADD BUTTON to add a new task
addButton.addEventListener("click", addNewTask);

//Eventlistener for INPUT to add a new task on Enter Keypress
input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addNewTask();
    }
});
 
// Function for restoring the "ADD NEW TASK" to INPUT after it looses focus                     //TODO: Find better way for INPUT/ ADD BUTTON logic
input.addEventListener("focusout", function(e) {
    if (input.value=='') {
        e.target.value = 'ADD NEW TASK';   
        addButton.classList.remove("main-header__add-task-btn__active")
        addButton.innerText = 'O'
    } 
});

// Function for deleting current text in INPUT after first click    
input.addEventListener("click", function(e) {
    if(input.value==="ADD NEW TASK"){
        e.target.value = ''
        addButton.classList.add("main-header__add-task-btn__active")
        addButton.innerText = '+'
    }
});


// Code for looping trough all DELETE BUTTONS array and deleting specific task
for (deleteBtn of deleteBtns) {
    deleteBtn.addEventListener("click",function removeTask() {
      _db.deleteTaskFromDB(deleteBtn);
        this.parentNode.remove();
    });
};