import { getLocalStorageItems } from "./handle_localstorage.js";

const createElement = (id, text, link) => {
	return `<li class="list-of-links__wrapper">
            <a class="list-of-links__link" href="${link}" target="_blank" rel="noreferrer">${text}</a>
            <span data-id="${id}" class="button delete-js list-of-links__delete">Delete</span>
      		</li>`;
};

const createElements = () => {
	const items = getLocalStorageItems();

	if (items.length === 0) return createElement("", "No saved links", "#");

	const elements = items.map((item) => {
		const { id, text, link } = item;
		return createElement(id, text, link);
	});

	return elements.join("");
};

const printElements = (appendTo) => {
	if (appendTo) {
		appendTo.textContent = "";
		appendTo.innerHTML = createElements();
	}
};

export { createElement, createElements, printElements };
