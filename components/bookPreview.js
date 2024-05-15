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
    `;

class BookPreview extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    let clone = template.content.cloneNode(true);
    shadowRoot.append(clone);
  }
}
// Define the custom element
customElements.define("book-preview", BookPreview);
