// Lav et array for alle vores kommende todo's
let todoArray = [];
let completedTodoArray = [];
// Tag fat i alle inputs for at lave en todo
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

// Lav en function der laver objecter med data fra inputs
function createTodo(title, date) {
  const todo = {
    title: title,
    date: date,
  };
  todoArray.push(todo);
}
mytodoBtn.addEventListener("click", function () {
  makeTodoElements(todoArray);
  h1Cards.textContent = "Things to do:";
});
completedtodoBtn.addEventListener("click", function () {
  makeTodoElements(completedTodoArray);
  h1Cards.textContent = "Completed todo's:";
});

// Lav eventlisteners der kan slette og udføre en todo
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

// Print the object todos to the document
function makeTodoElements(array) {
  cardsDiv.innerHTML = "";
  if (array === completedTodoArray) {
    completedTodoArray.forEach(function (object) {
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
    todoArray.forEach(function (object) {
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

function runEventListeners() {
  // Make a complete button and a make it move to a completed todo's array
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
  // Make a delete button on the todo
  cardButtonDelete.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      todoArray.splice(e.target.parentElement.dataset.index, 1);
      makeTodoElements(todoArray);
    });
  });

  if (cardButtonDeleteUndo) {
    cardButtonDeleteUndo.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        completedTodoArray.splice(e.target.parentElement.dataset.index, 1);
        makeTodoElements(completedTodoArray);
      });
    });
  }

  if (cardButtonUndo) {
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
