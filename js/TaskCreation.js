import * as _db from './DatabaseJS.js';

// Function for tasks creation
export function addTask(inputValue, taskIdDB, mainBody) {

    // Variables and constants 
    const newTaskId = taskIdDB;
    const newTaskClass = "task";
    const newTextSpanClass = "task__text-span";
    const newDeleteBtnClass = "task__delete-task far fa-trash-alt";
    const newContent = document.createTextNode(inputValue);

    // Creation of default Task
    const { newTask, newTextSpan, newDeleteBtn } = createDefaultTask(newTaskId,newTaskClass,newTextSpanClass,newDeleteBtnClass);

    // Adding EventListener for the DELETE BTN 
    const addDeleteTaskFeature = (newDeleteBtn) => {
        newDeleteBtn.addEventListener("click", function removeTask() {
            _db.deleteTaskFromDB(newDeleteBtn);
            this.parentNode.remove();
        });
    }


    addDeleteTaskFeature(newDeleteBtn);
    appendTaskElements(mainBody,newTask,newTextSpan,newContent,newDeleteBtn);

    // Appending elements from Default Task together
    function appendTaskElements(mainBody,newTask,newTextSpan,newContent,newDeleteBtn){
        newTextSpan.appendChild(newContent);
        newTask.appendChild(newTextSpan);
        newTask.insertBefore(newDeleteBtn, newTextSpan)
        mainBody.insertBefore(newTask, mainBody.lastTask);
    }

    // Adding Classes to Task Element
    function createNewTask(newTaskElement, newTaskClass, newTaskId){
        newTaskElement.setAttribute("class", newTaskClass);
        newTaskElement.setAttribute("data-id", newTaskId);

        return newTaskElement;
    };

    // Adding Classes to Span Element
    function createNewTextSpan(newTextSpanElement, newTextSpanClass){
        newTextSpanElement.setAttribute("class", newTextSpanClass);

        return newTextSpanElement;
    } 

    // Adding Classes to Delete Button Element
    function createNewDeleteBtn(newDeleteBtnElement, newDeleteBtnClass){
        newDeleteBtnElement.setAttribute("class", newDeleteBtnClass);

        return newDeleteBtnElement
    } 

    // Creation of all Task Elements
    function createTaskElements() {
        const newTaskElement = document.createElement("div");
        const newTextSpanElement = document.createElement("span");
        const newDeleteBtnElement = document.createElement("div");

        return { newTaskElement, newTextSpanElement, newDeleteBtnElement };
    }


    // Function for creating default task
    function createDefaultTask(newTaskId, newTaskClass, newTextSpanClass, newDeleteBtnClass) {

        const { newTaskElement, newTextSpanElement, newDeleteBtnElement } = createTaskElements();
        
        const newTask = createNewTask(newTaskElement,newTaskClass,newTaskId);
        const newTextSpan = createNewTextSpan(newTextSpanElement, newTextSpanClass);
        const newDeleteBtn = createNewDeleteBtn(newDeleteBtnElement, newDeleteBtnClass);

        return { newTask, newTextSpan, newDeleteBtn };
    }
}

