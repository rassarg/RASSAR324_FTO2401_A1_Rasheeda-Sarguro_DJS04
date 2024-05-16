import { selectors } from "../scripts.js";

export class ThemeModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  renderTheme() {
    const prefersDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = prefersDarkMode ? "night" : "day";
    selectors.dataSettingsTheme.value = theme;
    document.documentElement.style.setProperty(
      "--color-dark",
      prefersDarkMode ? "255, 255, 255" : "10, 10, 20"
    );
    document.documentElement.style.setProperty(
      "--color-light",
      prefersDarkMode ? "10, 10, 20" : "255, 255, 255"
    );
  }
}

customElements.define("theme-modal", ThemeModal);
