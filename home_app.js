// Assemble all in one file when done

//  Selectors

const toDoInput = document.querySelector(".toDoInput");
const toDoButton = document.querySelector(".toDoButton");
const toDoList = document.querySelector(".toDoList");
const filterOption = document.querySelector(".filterToDo");

//  Event Listener

document.addEventListener("DOMContentLoaded", getToDos);
toDoButton.addEventListener("click", addToDo);
toDoList.addEventListener("click", deleteCheck);
// filterOption.addEventListener("click", filterToDoFunction); ("click" event would not work properly... solution below using "change event")
filterOption.addEventListener("change", filterToDoFunction);


// Function

function addToDo(event) {
    // Prevents form from submiting (not disapearing on refresh)
    event.preventDefault();

    // Create toDo div
    const toDoDiv = document.createElement('div');
    toDoDiv.classList.add("toDo");

    // Create <li>
    const newToDo = document.createElement('li');
    newToDo.innerText = toDoInput.value;
    newToDo.classList.add('toDoItem');
    toDoDiv.appendChild(newToDo);

    // Save Local toDos
    saveLocalToDos(toDoInput.value);

    // Checked Button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>'; // Notice we used innerHTML not innerText here (innerText would not create this in HTML)
    completeButton.classList.add("completeButton");
    toDoDiv.appendChild(completeButton);

    // Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>'; // Notice we used innerHTML not innerText here (innerText would not create this in HTML)
    deleteButton.classList.add("deleteButton");
    toDoDiv.appendChild(deleteButton);

    // Append to List
    toDoList.appendChild(toDoDiv);

    // Clear Input Value
    toDoInput.value = "";
}

function deleteCheck(event) {
    const item = event.target;

    // Delete ToDo
    if(item.classList[0] === 'deleteButton') {
        const toDo = item.parentElement;
        // Animation
        toDo.classList.add("fall");
        removeLocalToDos(toDo);
        toDo.addEventListener('transitionend', function() {
            toDo.remove();
        });
        // Notice 'transitionend' above, we used becasue we used transition in css, if used animation in css we could use 'animationend' above instead.
        // This was used to remove items by clicking deleteButton toDo.remove(); (could not use with animation).
    }

    // Delete checkButton
    if(item.classList[0] === "completeButton") {
        const toDo = item.parentElement;
        toDo.classList.toggle("completed");
    }
}

function filterToDoFunction(event) {
    const toDos = toDoList.childNodes;
    // console.log(toDos); - test code -
    toDos.forEach(function(toDo) {
        if(toDo.classList !== undefined) {
            switch (event.target.value) {
                case "all":
                    toDo.style = "display: flex;";
                    break;
                case "completed":
                    if (toDo.classList.contains("completed")) {
                        toDo.style = "display: flex;";
                    } 
                    else {
                        toDo.style = "display: none;";
                    }
                    break;
                case "uncompleted":
                    if (!toDo.classList.contains("completed")) {
                        toDo.style = "display: flex;";
                        // console.log("check"); - test code -
                    } 
                    else {
                        toDo.style = "display: none;";
                        // console.log("nope"); - test code -
                    }
                    break;
                // default:
                //     break;
            }
        }
        return;
    });
}

function saveLocalToDos(toDo) {
    // Check for current toDo
    let toDos;
    if(localStorage.getItem("toDos") === null) {
        toDos = [];
    } else {
        toDos = JSON.parse(localStorage.getItem("toDos"));
    }
    toDos.push(toDo);
    localStorage.setItem("toDos", JSON.stringify(toDos));
}

function getToDos() {
    // console.log("Hello"); (for testing function)
    let toDos;
    if(localStorage.getItem("toDos") === null) {
        toDos = [];
    } else {
        toDos = JSON.parse(localStorage.getItem("toDos"));
    }
    toDos.forEach(function(toDo) {
         // Create toDo div
        const toDoDiv = document.createElement('div');
        toDoDiv.classList.add("toDo");

        // Create <li>
        const newToDo = document.createElement('li');
        newToDo.innerText = toDo;
        newToDo.classList.add('toDoItem');
        toDoDiv.appendChild(newToDo);

        // Checked Button
        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class="fas fa-check"></i>'; // Notice we used innerHTML not innerText here (innerText would not create this in HTML)
        completeButton.classList.add("completeButton");
        toDoDiv.appendChild(completeButton);

        // Delete Button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>'; // Notice we used innerHTML not innerText here (innerText would not create this in HTML)
        deleteButton.classList.add("deleteButton");
        toDoDiv.appendChild(deleteButton);

        // Append to List
        toDoList.appendChild(toDoDiv);
    })
}

function removeLocalToDos(toDo) {
    let toDos;
    if(localStorage.getItem("toDos") === null) {
        toDos = [];
    } else {
        toDos = JSON.parse(localStorage.getItem("toDos"));
    }
    const toDoIndex = toDo.children[0].innerText;
    toDos.splice(toDos.indexOf(toDoIndex), 1);
    localStorage.setItem("toDos", JSON.stringify(toDos));
}

// Testing area for multi page app

const selectedItem = document.getElementsByTagName("li");
const savedList = document.querySelector(".savedList"); // ul list
const input = document.getElementById("toDoInput"); // may have to change to list item instead of input value
const savedUl = document.querySelector(".savedList");
const getLocal = localStorage.getItem("toDos");

console.log(selectedItem);
console.log(document.getElementsByTagName("ul"));
console.log(document.getElementsByTagName("div"));

console.log(toDoList.children);
console.log(document.querySelector(".toDoList").children);
// console.log(document.querySelectorAll("li.toDoItem"));
// Array.from(selectedItem).map((test) => {
//     test.className = "testing";
//     // return test;
    
//     // if(selectedItem) {
//     //     test.className = "blue";
//     // }
//     // return test;
// }) // try changing to self updating when button is clicked to add new item



// Menu Button
$('.menu').click(function() {
    $(this).toggleClass('fa-times');
    $(".navbar").toggleClass('active');
});

