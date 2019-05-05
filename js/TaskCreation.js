import * as _db from './DatabaseJS.js';

//function for tasks creation
export function addTask(inputValue, taskIdDB) {

    // Create the body of new task

    const newTaskId = taskIdDB;
    const newTaskClass = "task";
    const newTextSpanClass = "task__text-span";
    const newDeleteBtnClass = "task__delete-task far fa-trash-alt";
    const newContent = document.createTextNode(inputValue);

    const { newTask, newTextSpan, newDeleteBtn } = createDefaultTask(newTaskId,newTaskClass,newTextSpanClass,newDeleteBtnClass);

    // Create text node for newTask and its class
    


    
    const addDeleteTaskFeature = (newDeleteBtn) => {
        newDeleteBtn.addEventListener("click", function removeTask() {
            _db.deleteTaskFromDB(newDeleteBtn);
            this.parentNode.remove();
        });
    }

    
    addDeleteTaskFeature(newDeleteBtn);
    appendTaskElements(mainBody,newTask,newTextSpan,newContent,newDeleteBtn);
    myRefresh();

    function appendTaskElements(mainBody,newTask,newTextSpan,newContent,newDeleteBtn){
        newTextSpan.appendChild(newContent);
        newTask.appendChild(newTextSpan);
        newTask.insertBefore(newDeleteBtn, newTextSpan)
        mainBody.insertBefore(newTask, mainBody.lastTask);
    }

    function createNewTask(newTaskElement, newTaskClass, newTaskId){
        newTaskElement.setAttribute("class", newTaskClass);
        newTaskElement.setAttribute("data-id", newTaskId);
        return newTaskElement;
    };

    function createNewTextSpan(newTextSpanElement, newTextSpanClass){

        newTextSpanElement.setAttribute("class", newTextSpanClass);

        return newTextSpanElement;
    } 

    function createNewDeleteBtn(newDeleteBtnElement, newDeleteBtnClass){

        newDeleteBtnElement.setAttribute("class", newDeleteBtnClass);
        return newDeleteBtnElement
    } 


    function createTaskElements() {
        const newTaskElement = document.createElement("div");
        const newTextSpanElement = document.createElement("span");
        const newDeleteBtnElement = document.createElement("div");

        return { newTaskElement, newTextSpanElement, newDeleteBtnElement };
    }

    //function for creating default task
    function createDefaultTask(newTaskId, newTaskClass, newTextSpanClass, newDeleteBtnClass) {

        const { newTaskElement, newTextSpanElement, newDeleteBtnElement } = createTaskElements();
        
        const newTask = createNewTask(newTaskElement,newTaskClass,newTaskId);
        const newTextSpan = createNewTextSpan(newTextSpanElement, newTextSpanClass);
        const newDeleteBtn = createNewDeleteBtn(newDeleteBtnElement, newDeleteBtnClass);

        return { newTask, newTextSpan, newDeleteBtn };
    }

    // function for refreshing the delete btns array 
    const myRefresh = () => {
        deleteBtns = document.querySelectorAll(".task__delete-task");
    }

}

