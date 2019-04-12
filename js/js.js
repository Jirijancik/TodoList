


        /*Grabbing data from DB*/ 
// get is asynchronous, it takes some time to get the data
db.collection('task').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderTasksFromDB(doc);
    })
})



        /*Constants and Variables*/

// Query selector for addBtn
const addButton = document.querySelector(".add-task-btn");
//const deleteBtnContent = "O";
// Query selector for mainBody
let mainBody = document.querySelector(".main-body");

// Query selector for all Delete btns of each task
let deleteBtns = document.querySelectorAll(".delete-task");





        /*Functions*/

// function for refreshing the delete btns array 
const MyRefresh = () => {

    deleteBtns = document.querySelectorAll(".delete-task");
}


//function for Deleting tasks
const RemoveTask = () => {
    
    this.parentNode.remove();
};

//Function for adding new tasks with imput text
const addNewTask = () => {
    // Get value from text input.

    let inputValue = document.querySelector("input").value.toUpperCase() || alert("<INSERT SOME TASK PLEASE>");
  
    let taskIdDB = db.collection('task').doc().name;
    addTaskToDB(inputValue);
    
    addElement(inputValue, taskIdDB);
}


// Function for adding tasks to FirebaseDB
function addTaskToDB(inputValue) {
    db.collection('task').add({
       Name: inputValue
    });
}

// Function for adding tasks to FirebaseDB
function deleteTaskFromDB(deleteBtn) {
    let id = deleteBtn.parentElement.getAttribute('data-id');
    db.collection('task').doc(id).delete();
}


//function for tasks creation
function addElement(inputValue, taskIdDB) {

    // Create the body of new task
    let newTask = document.createElement("div");

    // Create newDeletebtn with its class and text content
    let newDeleteBtn = document.createElement("div");
    let newDeleteBtnClass = "delete-task far fa-trash-alt";
   // let newDeleteBtnContent = document.createTextNode(deleteBtnContent);

    // Create text node for newTask and its class
    let newContent = document.createTextNode(inputValue);
    let newTaskClass = "task";
    let newTaskId = taskIdDB;
    let lastTask = document.querySelector(".task:last-of-type");

    // Add the newly created element and its contents into the DOM 
    mainBody.insertBefore(newTask, mainBody.lastTask);
    newTask.setAttribute("class", newTaskClass);
    newTask.setAttribute("data-id", newTaskId);
    newTask.appendChild(newContent);

    // Add the newly created deleteBtn to the newTask
    newTask.insertBefore(newDeleteBtn, newContent)
    newDeleteBtn.setAttribute("class", newDeleteBtnClass);
   // newDeleteBtn.appendChild(newDeleteBtnContent);
    newDeleteBtn.addEventListener("click", function removeTask() {
        deleteTaskFromDB(newDeleteBtn);
        this.parentNode.remove();
    });

    // Function to refresh deleteBtns array
    MyRefresh();
}




        /*Main Code Bodyyyyyy*/







//Function to render all tasks from FirebaseDB
function renderTasksFromDB(doc) {
    addElement(doc.data().Name, doc.id);
}


//Eventlistener to add a new task
addButton.addEventListener("click", addNewTask);



// code for looping trough delete btns array and deleting specific task
for (deleteBtn of deleteBtns) {
    deleteBtn.addEventListener("click",function removeTask() {
      deleteTaskFromDB(deleteBtn);
        this.parentNode.remove();
    });
};