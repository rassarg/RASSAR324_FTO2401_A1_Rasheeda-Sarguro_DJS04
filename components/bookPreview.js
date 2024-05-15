import { books, authors, genres, BOOKS_PER_PAGE } from "../data.js";

customElements.define(
  "book-preview",
  class BookPreview extends HTMLElement {
    inner = this.attachShadow({ mode: "closed" });

    constructor() {
      super();
      const template = document.createElement("template");
      template.innerHTML = `
          <dialog class="overlay" data-list-active>
              <div class="overlay__preview">
              <img class="overlay__blur" data-list-blur src="" /><img
                  class="overlay__image"
                  data-list-image
                  src=""
              />
              </div>
              <div class="overlay__content">
              <h3 class="overlay__title" data-list-title></h3>
              <div class="overlay__data" data-list-subtitle></div>
              <p
                  class="overlay__data overlay__data_secondary"
                  data-list-description
              ></p>
              </div>
              
              <div class="overlay__row">
              <button class="overlay__button overlay__button_primary" data-list-close>
                  Close
              </button>
              </div>
          </dialog>
          <style>
            /* Your styles here */
          </style>
        `;
      this.inner.appendChild(template.content.cloneNode(true));
    }
  }
);

function bookPreviewEventListeners() {
  // Search modal drop down list of book title / author / genre
  document.querySelector("[data-list-close]").addEventListener("click", () => {
    document.querySelector("[data-list-active]").open = false;
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
export { bookPreviewEventListeners };
