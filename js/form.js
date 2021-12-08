const qs = (selector) => document.querySelector(selector);

const btnSubmit = qs(".btn-submit");
const form = qs("#form");
const booksTable = qs(".books-table");

const LOCALSTORAGE_KEY = "BOOKS_LIST";

const saveBooks = (key, value) => {
  try {
    const valueJSON = JSON.stringify(value);
    localStorage.setItem(key, valueJSON);
  } catch (error) {
    console.log(error);
  }
};

const getBooks = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.log(error);
  }
};

let books =
  getBooks(LOCALSTORAGE_KEY) !== undefined ? getBooks(LOCALSTORAGE_KEY) : [];

const renderBooks = () => {
  books.forEach(({ bookTitle, bookAuthor, bookPriority, bookCategory }) => {
    booksTable.innerHTML += `
        <tr class='booksTableRow'>
          <td class='booksTableElement'>${bookTitle}</td>
      <td class='booksTableElement'>${bookAuthor}</td>
      <td class='booksTableElement'>${bookPriority}</td>
      <td class='booksTableElement'>${bookCategory}</td></tr>`;
  });
};

const addBooksToArray = (e) => {
  books.push({
    bookTitle: `${form.elements[0].value}`,
    bookAuthor: `${form.elements[1].value}`,
    bookPriority: `${form.elements[2].value}`,
    bookCategory: `${form.elements[3].value}`,
  });

  saveBooks(LOCALSTORAGE_KEY, books);
  renderBooks();
  form.reset();
};

const checkValidation = (e) => {
  e.preventDefault();
  if (
    form.elements[0].value.length < 1 ||
    form.elements[1].value.length < 3 ||
    form.elements[3].value == ""
  ) {
    alert(
      "Brak możliwości dodania książki! Proszę uzupełnić prawidłowo wszystkie pola!"
    );
    return;
  } else {
    addBooksToArray();
  }
};

renderBooks();

btnSubmit.addEventListener("click", checkValidation);
