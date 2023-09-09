// Initialize arrays for upcoming todos
let todoArray = [];
let completedTodoArray = [];
// Get references to input elements for creating a todo
const title = document.querySelector("#title");
const date = document.querySelector("#date");
const buttonConfirm = document.querySelector("#button_confirm");
const buttonCancel = document.querySelector("#button_cancel");
const cardsDiv = document.querySelector(".cards");
const newtodoBtn = document.querySelector("#new_todo_btn");
const mytodoBtn = document.querySelector("#my_todo_btn");
const completedtodoBtn = document.querySelector("#completed_todo_btn");
const form = document.querySelector("form");
const h1Cards = document.querySelector(".h1_cards");
let cardButtonComplete, cardButtonDelete, cardButtonUndo, cardButtonDeleteUndo;

// Create a function that generates objects using input data
function createTodo(title, date) {
  const todo = {
    title: title,
    date: date,
  };
  todoArray.push(todo);
}
// Add event listeners for "My Todo" and "Completed Todo" buttons
mytodoBtn.addEventListener("click", function () {
  makeTodoElements(todoArray);
  h1Cards.textContent = "Things to do:";
});
completedtodoBtn.addEventListener("click", function () {
  makeTodoElements(completedTodoArray);
  h1Cards.textContent = "Completed todo's:";
});

// Create event listeners for actions like deletion and completion of todos
buttonConfirm.addEventListener("click", function (e) {
  e.preventDefault();
  if (title.value === "") {
    form.style.display = "none";
  } else {
    createTodo(title.value, date.value);
    makeTodoElements(todoArray);
    form.style.display = "none";
    title.value = "";
    date.value = "";
  }
});

newtodoBtn.addEventListener("click", () => {
  form.style.display = "flex";
});

buttonCancel.addEventListener("click", (e) => {
  e.preventDefault();
  form.style.display = "none";
  title.value = "";
  date.value = "";
});

// Display todo objects in the document
function makeTodoElements(array) {
  cardsDiv.innerHTML = "";
  if (array === completedTodoArray) {
    // Display completed todos
    completedTodoArray.forEach(function (object) {
      // Create and populate a card for each completed todo
      const newDiv = document.createElement("div");
      newDiv.classList.add("card");
      newDiv.dataset.index = `${completedTodoArray.indexOf(object)}`;
      newDiv.innerHTML += `
      <button title="Click to undo" class="card_button_undo"><i class="fa-solid fa-arrow-rotate-left" style="color: #ff733b;"></i></button>
        <div class="card_text">
          <h3>${object.title}</h3>
           <p class="card__time"><time datetime="${object.date}">${object.date}</time></p>
        </div>
        <button class="card_button_delete_undo"><i class="fa-solid fa-trash" style="color: #ff733b;"></i></button>
    `;
      cardsDiv.appendChild(newDiv);
    });
    cardButtonUndo = document.querySelectorAll(".card_button_undo");
    cardButtonDeleteUndo = document.querySelectorAll(".card_button_delete_undo");
    runEventListeners();
  } else {
    // Display active todos
    todoArray.forEach(function (object) {
      // Create and populate a card for each active todo
      const newDiv = document.createElement("div");
      newDiv.classList.add("card");
      newDiv.dataset.index = `${todoArray.indexOf(object)}`;
      newDiv.innerHTML += `
    <button class="card_button"><i class="fa-solid fa-check" style="color: #ff733b;"></i></button>
      <div class="card_text">
        <h3>${object.title}</h3>
         <p class="card__time"><time datetime="${object.date}">${object.date}</time></p>
      </div>
      <button class="card_button_delete"><i class="fa-solid fa-trash" style="color: #ff733b;"></i></button>
  `;
      cardsDiv.appendChild(newDiv);
    });
    cardButtonComplete = document.querySelectorAll(".card_button");
    cardButtonDelete = document.querySelectorAll(".card_button_delete");
    runEventListeners();
  }
}
// Define event listeners for various todo actions
function runEventListeners() {
  // Handle marking a todo as complete and moving it to the completed todos
  cardButtonComplete.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      let i = e.target.parentElement.dataset.index;
      if (todoArray[i] === undefined) {
        i = e.target.parentElement.parentElement.dataset.index;
        completedTodoArray.push(todoArray[i]);
      } else {
        completedTodoArray.push(todoArray[i]);
      }
      todoArray.splice(i, 1);
      makeTodoElements(todoArray);
    });
  });
  // Handle deleting a todo
  cardButtonDelete.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      todoArray.splice(e.target.parentElement.dataset.index, 1);
      makeTodoElements(todoArray);
    });
  });

  if (cardButtonDeleteUndo) {
    // Handle deleting a completed todo
    cardButtonDeleteUndo.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        completedTodoArray.splice(e.target.parentElement.dataset.index, 1);
        makeTodoElements(completedTodoArray);
      });
    });
  }

  if (cardButtonUndo) {
    // Handle undoing a completed todo and moving it back to the active todo
    cardButtonUndo.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        let i = e.target.parentElement.dataset.index;
        if (completedTodoArray[i] === undefined) {
          i = e.target.parentElement.parentElement.dataset.index;
          todoArray.push(completedTodoArray[i]);
        } else {
          todoArray.push(completedTodoArray[i]);
        }
        completedTodoArray.splice(i, 1);
        makeTodoElements(completedTodoArray);
      });
    });
  }
}
