import { nanoid as generateId } from "https://cdn.jsdelivr.net/npm/nanoid/nanoid.js";

import { printElements } from "./modules/handle_elements.js";
import { validateUrl } from "./utils/validate_url.js";

import { addToLocalStorage, removeFromLocalStorage, clearLocalStorage } from "./modules/handle_localstorage.js";

const formApp = document.getElementById("form-app");
const listOfLinks = document.getElementById("list-of-links");
const clearAll = document.getElementById("clear-all");
const errorMessage = document.getElementById("error-message");
const inputLink = document.getElementById("link-to-save");

formApp.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {
      id: generateId(),
      text: formApp.title.value.trim(),
      link: formApp.link.value.trim(),
  };

  const isValidUrl = validateUrl(data.link);

  if (data.text !== "" && isValidUrl) {
    addToLocalStorage(data);
    printElements(listOfLinks);
    formApp.reset();
  } else {
    errorMessage.classList.add("error-message--show");
    inputLink.disabled = true;

    setTimeout(() => {
      errorMessage.classList.remove("error-message--show");
      inputLink.disabled = false;
    }, 1500);
  }
});

clearAll.addEventListener("click", () => {
    clearLocalStorage();
    printElements(listOfLinks);
});

listOfLinks.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-js")) {
        const id = e.target.dataset.id;
        removeFromLocalStorage(id);
        printElements(listOfLinks);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    printElements(listOfLinks);
});
