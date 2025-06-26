const bookList = [];
const BookStatus = {
  READ: "read",
  UNREAD: "unread",
  INPROGRESS: "in-progress",
};
class Book {
  constructor(name, author, publishedDate, status) {
    this.name = name;
    this.author = author;
    this.publishedDate = publishedDate;
    this.status = status;
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
    this.status =
      this.status === BookStatus.READ ? BookStatus.UNREAD : BookStatus.READ;
  }
}

// Handle onclick showSection inline html event
const addBookDialog = document.querySelector("#add-book-dialog");
const searchBookDialog = document.querySelector("#search-book-dialog");
function showSection(section) {
  switch (section) {
    case "add-book":
      // Display add books modal
      addBookDialog.showModal();
      break;
    case "all-books":
      // Display ALL books
      break;
    case "unread-books":
      // Display ALL unread books
      break;
    case "read-books":
      // Display ALL unread books
      break;
    case "search-books":
      // Display search books modal
      searchBookDialog.showModal();
      break;
  }
}
// Clear form fields on close
const dialogs = document.querySelectorAll("dialog");

dialogs.forEach((dialog) =>
  dialog.addEventListener("close", () => {
    const form = dialog.querySelector("form");
    if (form) form.reset();
  })
);

// Clear form fields on cancel
const cancelButton = document.querySelectorAll(".btn-cancel");

cancelButton.forEach((btn) =>
  btn.addEventListener("click", () => {
    const form = btn.closest("form");
    const dialog = btn.closest("dialog");
    if (form) form.reset();
    if (dialog) dialog.close();
  })
);
