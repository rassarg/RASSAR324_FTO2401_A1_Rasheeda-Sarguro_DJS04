import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";
// Initialize page and matches
let page = 1;
let matches = books;
// Function to render books
function renderBooks() {
  const starting = document.createDocumentFragment();
  for (const { author, id, image, title } of matches.slice(0, BOOKS_PER_PAGE)) {
    const element = document.createElement("button");
    element.classList = "preview";
    element.setAttribute("data-preview", id);
    element.innerHTML = `
      <img class="preview__image" src="${image}" />
      <div class="preview__info">
          <h3 class="preview__title">${title}</h3>
          <div class="preview__author">${authors[author]}</div>
      </div>
    `;
    starting.appendChild(element);
  }
  document.querySelector("[data-list-items]").appendChild(starting);
}
// Function to render genres
function renderGenres() {
  const genreHtml = document.createDocumentFragment();
  const firstGenreElement = document.createElement("option");
  firstGenreElement.value = "any";
  firstGenreElement.innerText = "All Genres";
  genreHtml.appendChild(firstGenreElement);
  for (const [id, name] of Object.entries(genres)) {
    const element = document.createElement("option");
    element.value = id;
    element.innerText = name;
    genreHtml.appendChild(element);
  }
  document.querySelector("[data-search-genres]").appendChild(genreHtml);
}
// Function to render authors
function renderAuthors() {
  const authorsHtml = document.createDocumentFragment();
  const firstAuthorElement = document.createElement("option");
  firstAuthorElement.value = "any";
  firstAuthorElement.innerText = "All Authors";
  authorsHtml.appendChild(firstAuthorElement);
  for (const [id, name] of Object.entries(authors)) {
    const element = document.createElement("option");
    element.value = id;
    element.innerText = name;
    authorsHtml.appendChild(element);
  }
  document.querySelector("[data-search-authors]").appendChild(authorsHtml);
}
// Function to set theme
function setTheme() {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    document.querySelector("[data-settings-theme]").value = "night";
    document.documentElement.style.setProperty("--color-dark", "255, 255, 255");
    document.documentElement.style.setProperty("--color-light", "10, 10, 20");
  } else {
    document.querySelector("[data-settings-theme]").value = "day";
    document.documentElement.style.setProperty("--color-dark", "10, 10, 20");
    document.documentElement.style.setProperty(
      "--color-light",
      "255, 255, 255"
    );
  }
}
// Function to update books when "Show more" button is clicked
function showMoreButton() {
  const listButton = document.querySelector("[data-list-button]");
  const remaining = matches.length - page * BOOKS_PER_PAGE;
  listButton.innerText = "Show more";
  listButton.disabled = remaining <= 0;
  const remainingSpan = document.createElement("span");
  remainingSpan.className = "list__remaining";
  remainingSpan.textContent = ` (${remaining > 0 ? remaining : 0})`;
  listButton.innerHTML = "";
  listButton.appendChild(document.createTextNode("Show more"));
  listButton.appendChild(remainingSpan);
}
// Function to setup event listeners
function setupEventListeners() {
  // Canceling the search modal
  document
    .querySelector("[data-search-cancel]")
    .addEventListener("click", () => {
      document.querySelector("[data-search-overlay]").open = false;
    });
  // Opening the search modal
  document
    .querySelector("[data-header-search]")
    .addEventListener("click", () => {
      document.querySelector("[data-search-overlay]").open = true;
      document.querySelector("[data-search-title]").focus();
    });
  // Search modal drop down list of book title / author / genre
  document.querySelector("[data-list-close]").addEventListener("click", () => {
    document.querySelector("[data-list-active]").open = false;
  });
  // Searching books
  document
    .querySelector("[data-search-form]")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const filters = Object.fromEntries(formData);
      const result = [];
      for (const book of books) {
        let genreMatch = filters.genre === "any";
        for (const singleGenre of book.genres) {
          if (genreMatch) break;
          if (singleGenre === filters.genre) {
            genreMatch = true;
          }
        }
        if (
          (filters.title.trim() === "" ||
            book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
          (filters.author === "any" || book.author === filters.author) &&
          genreMatch
        ) {
          result.push(book);
        }
      }
      page = 1;
      matches = result;
      if (result.length < 1) {
        document
          .querySelector("[data-list-message]")
          .classList.add("list__message_show");
      } else {
        document
          .querySelector("[data-list-message]")
          .classList.remove("list__message_show");
      }
      document.querySelector("[data-list-items]").innerHTML = "";
      const newItems = document.createDocumentFragment();
      for (const { author, id, image, title } of result.slice(
        0,
        BOOKS_PER_PAGE
      )) {
        const element = document.createElement("button");
        element.classList = "preview";
        element.setAttribute("data-preview", id);
        element.innerHTML = `
        <img class="preview__image" src="${image}" />
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
      `;
        newItems.appendChild(element);
      }
      document.querySelector("[data-list-items]").appendChild(newItems);
      document.querySelector("[data-list-button]").disabled =
        matches.length - page * BOOKS_PER_PAGE < 1;
      showMoreButton();
      window.scrollTo({ top: 0, behavior: "smooth" });
      document.querySelector("[data-search-overlay]").open = false;
    });
  // Canceling the theme modal
  document
    .querySelector("[data-settings-cancel]")
    .addEventListener("click", () => {
      document.querySelector("[data-settings-overlay]").open = false;
    });
  // Opening the theme modal
  document
    .querySelector("[data-header-settings]")
    .addEventListener("click", () => {
      document.querySelector("[data-settings-overlay]").open = true;
    });
  // Changing theme
  document
    .querySelector("[data-settings-form]")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const { theme } = Object.fromEntries(formData);
      if (theme === "night") {
        document.documentElement.style.setProperty(
          "--color-dark",
          "255, 255, 255"
        );
        document.documentElement.style.setProperty(
          "--color-light",
          "10, 10, 20"
        );
      } else {
        document.documentElement.style.setProperty(
          "--color-dark",
          "10, 10, 20"
        );
        document.documentElement.style.setProperty(
          "--color-light",
          "255, 255, 255"
        );
      }
      document.querySelector("[data-settings-overlay]").open = false;
    });
  // Show more button
  document.querySelector("[data-list-button]").addEventListener("click", () => {
    const fragment = document.createDocumentFragment();
    for (const { author, id, image, title } of matches.slice(
      page * BOOKS_PER_PAGE,
      (page + 1) * BOOKS_PER_PAGE
    )) {
      const element = document.createElement("button");
      element.classList = "preview";
      element.setAttribute("data-preview", id);
      element.innerHTML = `
        <img class="preview__image" src="${image}" />
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
      `;
      fragment.appendChild(element);
    }
    document.querySelector("[data-list-items]").appendChild(fragment);
    page += 1;
  });
  // Book preview
  document
    .querySelector("[data-list-items]")
    .addEventListener("click", (event) => {
      const pathArray = Array.from(event.path || event.composedPath());
      let active = null;
      for (const node of pathArray) {
        if (active) break;
        if (node?.dataset?.preview) {
          let result = null;
          for (const singleBook of books) {
            if (result) break;
            if (singleBook.id === node?.dataset?.preview) result = singleBook;
          }
          active = result;
        }
      }
      if (active) {
        document.querySelector("[data-list-active]").open = true;
        document.querySelector("[data-list-blur]").src = active.image;
        document.querySelector("[data-list-image]").src = active.image;
        document.querySelector("[data-list-title]").innerText = active.title;
        document.querySelector("[data-list-subtitle]").innerText = `${
          authors[active.author]
        } (${new Date(active.published).getFullYear()})`;
        document.querySelector("[data-list-description]").innerText =
          active.description;
      }
    });
}
// Call functions to initialize the application
document.addEventListener("DOMContentLoaded", function () {
  console.log("scrips.js and the DOM are loaded");
  renderBooks();
  renderGenres();
  renderAuthors();
  setTheme();
  showMoreButton();
  setupEventListeners();
});
