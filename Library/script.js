// ====== Constants & Utilities ======
const BookStatus = {
  READ: "read",
  UNREAD: "unread",
};

const bookList = [];

// Capitalize first letter of each word
function normalizeString(input) {
  return input
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function toggleBookStatus(status) {
  return status === BookStatus.READ ? BookStatus.UNREAD : BookStatus.READ;
}

function isDuplicate(entry) {
  return bookList.some(
    (book) =>
      book.name === entry.name &&
      book.author === entry.author &&
      book.publishedYear === entry.publishedYear
  );
}

// ====== Book Class ======
class Book {
  constructor(name, author, publishedYear, coverImg) {
    this.name = name;
    this.author = author;
    this.publishedYear = publishedYear;
    this.coverImg = coverImg;
    this.status = BookStatus.UNREAD;
  }

  get status() {
    return this._status;
  }

  set status(newStatus) {
    if (newStatus !== BookStatus.READ && newStatus !== BookStatus.UNREAD) {
      throw new Error("Invalid status value");
    }
    this._status = newStatus;
  }

  toggleStatus() {
    this.status = toggleBookStatus(this.status);
  }
}

// ====== DOM Elements ======
const bookGrid = document.querySelector(".books-grid");
const addBookDialog = document.querySelector("#add-book-dialog");
const searchBookDialog = document.querySelector("#search-book-dialog");
const addBookForm = document.querySelector("#add-book-form");
const searchBookForm = document.querySelector("#search-book-form");
const errorMessageDiv = document.querySelector("#add-book-error");

// ====== UI Rendering ======
function renderLibrary(status = "all", books = bookList) {
  bookGrid.replaceChildren();

  // Filter books based on status
  let filteredBooks = books;
  if (status !== "all") {
    filteredBooks = bookList.filter((book) => book.status === status);
  }

  if (filteredBooks.length === 0) {
    bookGrid.textContent = "No books found.";
    return;
  }

  filteredBooks.forEach((book) => {
    bookGrid.appendChild(createBookCard(book));
  });
}

function createBookCard(book) {
  const bookCardDiv = document.createElement("div");
  bookCardDiv.classList.add("book-card");

  // Book Image
  const bookImgDiv = document.createElement("div");
  bookImgDiv.classList.add("book-image");
  const img = document.createElement("img");
  img.src = book.coverImg;
  img.alt = book.name;
  bookImgDiv.appendChild(img);

  // Book Details
  const h3 = document.createElement("h3");
  h3.classList.add("book-title");
  h3.textContent = book.name;

  const authorPara = document.createElement("p");
  authorPara.classList.add("book-author");
  authorPara.textContent = `by ${book.author}`;

  const publishedYearPara = document.createElement("p");
  publishedYearPara.classList.add("book-date");
  publishedYearPara.textContent = `Published: ${book.publishedYear}`;

  // Status
  const statusDiv = document.createElement("div");
  statusDiv.classList.add(
    "book-status",
    book.status === BookStatus.READ ? "status-read" : "status-unread"
  );
  statusDiv.textContent =
    book.status.charAt(0).toUpperCase() + book.status.slice(1);

  // Actions
  const actionDiv = document.createElement("div");
  actionDiv.classList.add("book-actions");

  const statusButton = document.createElement("button");
  statusButton.classList.add("btn", "btn-status");
  const statusLabel = `Mark as ${toggleBookStatus(book.status)}`;
  statusButton.setAttribute("aria-label", statusLabel);
  statusButton.textContent = statusLabel;
  statusButton.addEventListener("click", () => {
    book.toggleStatus();
    renderLibrary();
  });

  const removeButton = document.createElement("button");
  removeButton.classList.add("btn", "btn-remove");
  removeButton.textContent = "Remove";
  removeButton.setAttribute("aria-label", `Remove ${book.name}`);
  removeButton.addEventListener("click", () => {
    const index = bookList.indexOf(book);
    if (index > -1) {
      bookList.splice(index, 1);
      renderLibrary();
    }
  });

  actionDiv.appendChild(statusButton);
  actionDiv.appendChild(removeButton);

  bookCardDiv.appendChild(bookImgDiv);
  bookCardDiv.appendChild(h3);
  bookCardDiv.appendChild(authorPara);
  bookCardDiv.appendChild(publishedYearPara);
  bookCardDiv.appendChild(statusDiv);
  bookCardDiv.appendChild(actionDiv);

  return bookCardDiv;
}

// ====== Book List Initialization ======
function loadBookList() {
  bookList.length = 0;
  const bookCards = document.querySelectorAll(".books-grid .book-card");
  bookCards.forEach((card) => {
    const name = card.querySelector(".book-title")?.textContent.trim() || "";
    const authorText =
      card.querySelector(".book-author")?.textContent.trim() || "";
    const author = authorText.replace(/^by\s+/i, "");
    const publishedYearText =
      card.querySelector(".book-date")?.textContent.trim() || "";
    const publishedYear = publishedYearText.replace(/^Published:\s*/i, "");
    const coverImg =
      card.querySelector(".book-image img")?.getAttribute("src") || "";
    const statusText =
      card.querySelector(".book-status")?.textContent.trim().toLowerCase() ||
      "unread";
    const status = statusText === "read" ? BookStatus.READ : BookStatus.UNREAD;

    const book = new Book(name, author, publishedYear, coverImg);
    book.status = status;
    bookList.push(book);
  });
}

// ====== Dialog and Form Handling ======
function showSection(section) {
  switch (section) {
    case "add-book":
      addBookDialog.showModal();
      break;
    case "search-books":
      searchBookDialog.showModal();
      break;
    // TODO: Implement filtering for all-books, unread-books, read-books
  }
}

// Clear form fields on dialog close
document.querySelectorAll("dialog").forEach((dialog) =>
  dialog.addEventListener("close", () => {
    const form = dialog.querySelector("form");
    if (form) form.reset();
  })
);

// Clear form fields on cancel button click
document.querySelectorAll(".btn-cancel").forEach((btn) =>
  btn.addEventListener("click", () => {
    const form = btn.closest("form");
    const dialog = btn.closest("dialog");
    if (form) form.reset();
    if (dialog) dialog.close();
  })
);

// ====== Add Book Submission ======
function submitBook(event) {
  event.preventDefault();
  const title = normalizeString(document.querySelector("#addBookTitle").value);
  const author = normalizeString(
    document.querySelector("#addBookAuthor").value
  );
  const publishedYear = document.querySelector("#addPublishYear").value;
  const coverImg = document.querySelector("#addBookImage").value;

  const newEntry = new Book(title, author, publishedYear, coverImg);

  if (isDuplicate(newEntry)) {
    errorMessageDiv.textContent = "Book already registered!";
    errorMessageDiv.classList.add("display-error");
    errorMessageDiv.focus();
    return;
  }
  bookList.push(newEntry);
  errorMessageDiv.textContent = "";
  errorMessageDiv.classList.remove("display-error");
  renderLibrary();
  addBookDialog.close();
  addBookForm.reset();
}

// ====== Search Book Submission ======
function searchBook(event) {
  event.preventDefault();
  const title = normalizeString(document.querySelector("#bookTitle").value);
  const author = normalizeString(document.querySelector("#bookAuthor").value);
  const publishedYear = document.querySelector("#publishYear").value;

  const results = bookList.filter((book) => {
    // Match only if each filled field matches the book property
    const matchTitle = !title || book.name === title;
    const matchAuthor = !author || book.author === author;
    const matchDate = !publishedYear || book.publishedYear === publishedYear;
    return matchTitle && matchAuthor && matchDate;
  });

  renderLibrary("all", results);
  searchBookDialog.close();
  searchBookForm.reset();
}

// ====== Event Listeners ======
addBookForm.addEventListener("submit", submitBook);

searchBookForm.addEventListener("submit", searchBook);

document
  .querySelector("#show-all")
  .addEventListener("click", () => renderLibrary("all"));
document
  .querySelector("#show-read")
  .addEventListener("click", () => renderLibrary(BookStatus.READ));
document
  .querySelector("#show-unread")
  .addEventListener("click", () => renderLibrary(BookStatus.UNREAD));

// ====== Initialize on DOM Ready ======
window.addEventListener("DOMContentLoaded", () => {
  loadBookList();
  renderLibrary();
});
