let form = document.querySelector(".add-task")
let addTaskBtn = document.getElementById("addtask-btn");
let addTaskInput = document.getElementById("addtask-input");
let errorMsg = document.querySelectorAll(".error-msg");
// console.log(errorMsg[1].previousElementSibling);
let ul = document.querySelector("ul");
let modal = document.querySelector(".full");
let cancelBtn = document.querySelector(".cancel-btn")
let editTaskInput = document.querySelector(".modal").children[2].firstElementChild;
let confirmBtn = document.querySelector(".confirm-btn");
let deleteAllBtn = document.querySelector(".delete-all")
console.log(confirmBtn);
form.addEventListener("submit", (event) => {
    event.preventDefault()
    errorMsg[1].style.display = "none"
    if (addTaskInput.value.trim() == "") {
            errorMsg[1].style.display = "block"

          console.log("hello");
        return
    }
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
function deleteTaskFunc(btn) {
    btn.parentElement.parentElement.remove();
}
let task;
function editTaskFunc(btn) {
    errorMsg[0].style.display = "none"
    task = btn.parentElement.parentElement.firstElementChild
    editTaskInput.value = task.innerText
    toggleModal()
}
function changeTask(params) {
    if (editTaskInput.value.trim()=="") {
                errorMsg[0].style.display = "block"
       return
    }
    task.innerText = editTaskInput.value;
    toggleModal()
    Swal.fire({
        width: 450, 
        position: "top-end",
        icon: "success",
        title: "Your Task has been edited",
        showConfirmButton: false,
        timer: 1500
    });
}
function toggleModal() {
    modal.classList.toggle("animate__fadeIn")
    modal.classList.toggle("hide")
}
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
cancelBtn.addEventListener("click", toggleModal)
confirmBtn.addEventListener("click", changeTask)
deleteAllBtn.addEventListener("click", deleteAll)