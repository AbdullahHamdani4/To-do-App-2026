let form = document.querySelector(".add-task")
let addTaskBtn = document.getElementById("addtask-btn");
let addTaskInput = document.getElementById("addtask-input");
let errorMsg = document.querySelectorAll(".error-msg");
let ul = document.querySelector("ul");
let modal = document.querySelector(".full");
let cancelBtn = document.querySelector(".cancel-btn")
let editTaskInput = document.querySelector(".modal").children[2].firstElementChild;
let confirmBtn = document.querySelector(".confirm-btn");
let deleteAllBtn = document.querySelector(".delete-all")

//When the user clicks on add task button this event triggers
form.addEventListener("submit", (event) => {
    event.preventDefault()
    errorMsg[1].style.display = "none"
    //Checks condition for empty
    if (addTaskInput.value.trim() == "") {
        errorMsg[1].style.display = "block"
        return
    }
    //If condition is false the code below executes
    ul.innerHTML += `
    <li> <span>${addTaskInput.value}</span>
                        <div class="li-btns">
                            <button class="edit-btn" onclick="editTaskFunc(this)"><i class="fa-solid fa-pencil"></i> Edit</button>
                            <button class="delete-btn" onclick="deleteTaskFunc(this)"><i class="fa-regular fa-trash-can"></i> Delete</button>
                        </div>
                    </li>
    `
    addTaskInput.value = ""
});
// This event triggers when user clicks on delete button on task
function deleteTaskFunc(btn) {
    btn.parentElement.parentElement.remove();
}
let task; //It stores the li on which the user has click to edit
//This event triggers and shows up the pop up for edit text 
function editTaskFunc(btn) {
    errorMsg[0].style.display = "none"
    task = btn.parentElement.parentElement.firstElementChild
    editTaskInput.value = task.innerText
    toggleModal()
}
//This event triggers when user clicks on confirm btn in the popup
function changeTask(params) {
    //Check for empty input
    if (editTaskInput.value.trim() == "") {
        errorMsg[0].style.display = "block"
        return
    }
    //If false then code below executes 
    task.innerText = editTaskInput.value; //task gets edited
    toggleModal() // Popup becomes display none
    //A popup showing task edited on right top occurs
    Swal.fire({
        width: 450,
        position: "top-end",
        icon: "success",
        title: "Your Task has been edited",
        showConfirmButton: false,
        timer: 1500
    });
}
// This is a toggle func which is used to show and hide the pop up of the edit task
function toggleModal() {
    modal.classList.toggle("animate__fadeIn")
    modal.classList.toggle("hide")
}
//The code below is delete all btn function which asks the user for confirmation if yes then   all the tasks get cleared
function deleteAll() {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Deleted!",
                text: "Your tasks have been deleted.",
                icon: "success"
            });
            ul.innerHTML = ""
        }
    });

}
//These are event listeners which works on clicks of different elements/buttons
cancelBtn.addEventListener("click", toggleModal)
confirmBtn.addEventListener("click", changeTask)
deleteAllBtn.addEventListener("click", deleteAll)