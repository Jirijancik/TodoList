import * as _db from './DatabaseJS.js';
import { addTask } from "./TaskCreation";



        /*Grabbing data from DB*/ 
// get is asynchronous, it takes some time to get the data
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







//Function for adding new tasks with imput text
const addNewTask = () => {
    if (addButton.classList.contains("main-header__add-task-btn__active") || input.value !=="ADD NEW TASK") { //TODO: Fix bug TC: 1. Add a valid task 2.Press addButton again -> new ADD NEW TASK task will be added 
    
        let inputValue = getInputValue(input);
        let taskIdDB = _db.addTaskToDBAndReturnID(inputValue);

        addTask(inputValue, taskIdDB);
        insertValueIntoElement("ADD NEW TASK", input);

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






/****************************************************************
Main Body
****************************************************************/

//Eventlistener for ADD BUTTON to add a new task
addButton.addEventListener("click", addNewTask);
 
// function for restoring the "ADD NEW TASK" to INPUT after it looses focus                     //TODO: Find better way for INPUT/ ADD BUTTON logic
input.addEventListener("focusout", function(e) {
    if (input.value=='') {
        e.target.value = 'ADD NEW TASK';   
        addButton.classList.remove("main-header__add-task-btn__active")
        addButton.innerText = 'O'
    } 
});

//function for deleting current text in INPUT after first click    
input.addEventListener("click", function(e) {
    if(input.value==="ADD NEW TASK"){
        e.target.value = ''
        addButton.classList.add("main-header__add-task-btn__active")
        addButton.innerText = '+'
    }
});


// code for looping trough delete btns array and deleting specific task
for (deleteBtn of deleteBtns) {
    deleteBtn.addEventListener("click",function removeTask() {
      _db.deleteTaskFromDB(deleteBtn);
        this.parentNode.remove();
    });
};