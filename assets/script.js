let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      read ? "read" : "not read yet"
    }`;
  };
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  saveLocal();
}

function saveLocal() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function restoreLocal() {
  console.log("Restoring local storage");
  const storedBooks = localStorage.getItem("myLibrary");
  if (storedBooks) {
    console.log("Found stored books");
    myLibrary = JSON.parse(storedBooks);
    displayBook();
  } else {
    console.log("No stored books found");
    addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, "Read");
    addBookToLibrary(
      "The Fellowship of the Ring",
      "J.R.R. Tolkien",
      398,
      "Not Read"
    );

    displayBook();
  }
}

function displayBook() {
  const bookContainer = document.querySelector(".book-container");
  bookContainer.innerHTML = "";
  myLibrary.forEach((book, index) => {
    const card = document.createElement("div");

    card.innerHTML = `<h3>${book.title}</h3> <p>Author: ${book.author}</p> <p>Pages: ${book.pages}</p> <p>Status: ${book.read}</p> <button onclick="removeBook(${index})">Remove</button>`;
    bookContainer.appendChild(card);
  });
}

const addButton = document.querySelector(".add-book-btn");
const closeButton = document.querySelector(".close-btn");
const cancelButton = document.querySelector(".cancel-btn");
const modal = document.querySelector(".modal");
const submitButton = document.querySelector(".confirm-submission");

addButton.addEventListener("click", () => {
  modal.showModal();
});

closeButton.addEventListener("click", () => {
  modal.close();
});

cancelButton.addEventListener("click", () => {
  modal.close();
});

submitButton.addEventListener("click", (event) => {
  const form = document.querySelector("#book-form");

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  event.preventDefault();

  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector("#read").value;

  addBookToLibrary(title, author, pages, read);
  displayBook();
  form.reset();
  modal.close();
});

function removeBook(index) {
  myLibrary.splice(index, 1);
  displayBook();
  saveLocal();
}
