import { addTask } from "TaskCreation.js";


// Function for adding tasks to FirebaseDB
export function addTaskToDBAndReturnID(taskName) {
    const rndID = addIdToTaskDB( Math.random(), 10, 15);
    db.collection('task').doc(`${rndID}`).set({
       Name: taskName,
    });
    return rndID;
}

//Function to render all tasks from FirebaseDB
export function renderTasksFromDB(doc) {
    addTask(doc.data().Name, doc.id);
}

// Function for adding tasks to FirebaseDB
export function deleteTaskFromDB(deleteBtn) {
    let id = deleteBtn.parentElement.getAttribute('data-id');
    db.collection('task').doc(id).delete();
}


function addIdToTaskDB(random, x, y) {
    return Math.round(random * (x**y));
 }


