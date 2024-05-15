class ThemeModal extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    // Import external CSS file
    const linkElem = document.createElement("link");
    linkElem.setAttribute("rel", "stylesheet");
    linkElem.setAttribute("href", "styles.css");
    shadowRoot.appendChild(linkElem);
    // Copy the contents of the dialog element into the shadow root
    shadowRoot.innerHTML = `
        <dialog class="overlay" data-settings-overlay>
            <div class="overlay__content">
            <form class="overlay__form" data-settings-form id="settings">
                <label class="overlay__field">
                <div class="overlay__label">Theme</div>

                <select
                    class="overlay__input overlay__input_select"
                    data-settings-theme
                    name="theme"
                >
                    <option value="day">Day</option>
                    <option value="night">Night</option>
                </select>
                </label>
            </form>
            
            <div class="overlay__row">
                <button class="overlay__button" data-settings-cancel>Cancel</button>
                <button
                class="overlay__button overlay__button_primary"
                type="submit"
                form="settings"
                >
                Save
                </button>
            </div>
            </div>
        </dialog>
        `;
  }
}

// Define the custom element
customElements.define("settings-overlay", ThemeModal);
