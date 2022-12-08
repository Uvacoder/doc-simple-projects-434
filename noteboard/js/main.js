const dashboard = document.querySelector(".dashboard");
const add = document.querySelector(".add-note-btn");
const textareas = document.querySelectorAll("textarea");

var observe;
if (window.attachEvent) {
	observe = function (element, event, handler) {
		element.attachEvent("on" + event, handler);
	};
} else {
	observe = function (element, event, handler) {
		element.addEventListener(event, handler, false);
	};
}

function init() {
	function resize() {
		textareas.forEach((text) => {
			text.style.height = "auto";
			text.style.height = text.scrollHeight + "px";
			text.parentElement.scrollTo(0, text.parentElement.scrollHeight);
		});
	}
	function delayedResize() {
		window.setTimeout(resize, 0);
	}
	textareas.forEach((text) => {
		observe(text, "change", resize);
		observe(text, "cut", delayedResize);
		observe(text, "paste", delayedResize);
		observe(text, "drop", delayedResize);
		observe(text, "keydown", delayedResize);
	});
	resize();
}

// Add notes on load
let notes = getSavedNotes();
notes.forEach((note) => populateBoard(note.nTitle, note.nBody, note.nID));

function saveNote(title, body, id = -1) {
	let notes;
	const noteData = {
		nTitle: title,
		nBody: body,
		nID: id,
	};
	notes = getSavedNotes();
	noteData.nID = notes.length + 1;
	notes.push(noteData);
	localStorage.setItem("notes", JSON.stringify(notes));
}

// Adds a note to the dashboard
function populateBoard(title, body, id = -1) {
	let notes;
	notes = getSavedNotes();
	id = id == -1 ? notes.length : id;

	// Create note
	const note = document.createElement("div");
	note.classList.add("note");
	note.setAttribute("data-id", id);
	// Create Header
	const noteHeader = document.createElement("div");
	noteHeader.classList.add("note-header");
	// Create title input
	const noteTitle = document.createElement("input");
	noteTitle.classList.add("title");
	noteTitle.placeholder = "Title";
	noteTitle.maxLength = 30;
	noteTitle.type = "text";
	noteTitle.value = title;
	observe(noteTitle, "change", updateNote);
	observe(noteTitle, "cut", updateNote);
	observe(noteTitle, "paste", updateNote);
	observe(noteTitle, "drop", updateNote);
	observe(noteTitle, "keyup", updateNote);
	// Create delete button
	const deleteNoteBtn = document.createElement("button");
	deleteNoteBtn.classList.add("delete");
	deleteNoteBtn.setAttribute("title", "Delete note");
	deleteNoteBtn.innerHTML = "🗑";
	deleteNoteBtn.addEventListener("click", deleteNote);
	// Create body
	const noteBody = document.createElement("textarea");
	noteBody.classList.add("body");
	noteBody.placeholder = "Body";
	noteBody.rows = 1;
	noteBody.type = "text";
	noteBody.value = body;
	observe(noteBody, "change", updateNote);
	observe(noteBody, "cut", updateNote);
	observe(noteBody, "paste", updateNote);
	observe(noteBody, "drop", updateNote);
	observe(noteTitle, "keyup", updateNote);
	// Append components to note
	noteHeader.appendChild(noteTitle);
	noteHeader.appendChild(deleteNoteBtn);
	note.appendChild(noteHeader);
	note.appendChild(noteBody);
	// Prepend note to dashboard
	dashboard.insertBefore(note, dashboard.firstChild);
	noteTitle.focus();
	function resize() {
		noteBody.style.height = "auto";
		noteBody.style.height = noteBody.scrollHeight + "px";
		note.scrollTo(0, note.scrollHeight);
	}
	function delayedResize() {
		window.setTimeout(resize, 0);
	}
	observe(noteBody, "change", resize);
	observe(noteBody, "cut", delayedResize);
	observe(noteBody, "paste", delayedResize);
	observe(noteBody, "drop", delayedResize);
	observe(noteBody, "keyup", delayedResize);
	resize();
}

// Returns saved notes
function getSavedNotes() {
	let notes;

	if (localStorage.getItem("notes") === null) {
		notes = [];
	} else {
		notes = JSON.parse(localStorage.getItem("notes"));
	}
	return notes;
}

// Deletes note from dashboard
function deleteNote() {
	let note = this.parentElement.parentElement;
	// Get deleted ID
	let id = parseFloat(note.dataset.id);
	// Delete from UI
	dashboard.removeChild(note);
	// Load saved notes
	let notes = getSavedNotes();
	// Find and remove note that matches ID
	let noteToBeDeleted = notes.find((note) => {
		return note.nID == id;
	});
	let index = notes.indexOf(noteToBeDeleted);
	if (index > -1) {
		notes.splice(index, 1);
	}
	// Reassign ID
	let i = 1;
	notes.forEach((note) => {
		note.nID = i;
		i++;
	});
	// Repopulate board
	dashboard.innerHTML = "";
	notes.forEach((note) => populateBoard(note.nTitle, note.nBody, note.nID));
	// Resave notes
	localStorage.setItem("notes", JSON.stringify(notes));
}

// Returns index of note from saved list
function getIndex(notes, id) {
	// Find and update note that matches ID
	let itemToBeUpdated = notes.find((note) => {
		return note.nID == id;
	});
	return notes.indexOf(itemToBeUpdated);
}

// Update note
function updateNote() {
	let id = 0,
		index = 0,
		tagName = this.tagName,
		notes = getSavedNotes();

	if (tagName == "INPUT") {
		id = this.parentElement.parentElement.dataset.id;
		index = getIndex(notes, id);
		notes[index].nTitle = this.value;
		localStorage.setItem("notes", JSON.stringify(notes));
	} else if (tagName == "TEXTAREA") {
		id = this.parentElement.dataset.id;
		index = getIndex(notes, id);
		notes[index].nBody = this.value;
		localStorage.setItem("notes", JSON.stringify(notes));
	}
}

add.addEventListener("click", () => {
	saveNote("", "");
	populateBoard("", "");
});
