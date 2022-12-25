function createList() {
    // console.log(localStorage);

    // Find Local Storage Trash and delete it (temporarily needed)
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key != "notes") {
            localStorage.removeItem(key); 
        }
    }

    // Create Empty Local Storage Structure if there's none.
    if (window.localStorage.length == 0) {
        notes = []
        localStorage.setItem("notes", JSON.stringify(notes) ); 
    } 

    // Ziehe alles aus dem Local Storage in ein nutzbares Array
    notes = JSON.parse(localStorage.getItem("notes"));

    // Sortiere localStorageContent nach Zeit. Newest on top.
    if (notes.length != 0) {
        notes.sort(function(x, y){
            return y.timestamp - x.timestamp;
        });
    }

    // Zeige Inhalt von Local Storage bei Pageload an.
    for (let i = 0; i < notes.length; i++) {

        let logDiv = document.getElementById("log");

        let entryDiv = document.createElement("div");
        entryDiv.classList.add("entry");
        entryDiv.id = notes[i].id;

        messageSpan = document.createElement("p");
        messageSpan.classList.add("message");
        messageSpan.innerHTML = notes[i].content.replace(/(?:\r\n|\r|\n)/g, '<br/>');

        entryDiv.appendChild(messageSpan);
        logDiv.appendChild(entryDiv);


        // Edit Link erstellen
        var aEdit = document.createElement("button");
        var aEditText = document.createTextNode("Edit");
        aEdit.appendChild(aEditText);
        aEdit.title = "edit";
        let editClass= "edit-btn-" + notes[i].id;
        aEdit.classList.add("btn-edit", editClass);
        aEdit.classList.add("btn", editClass);

        // Delete Link erstellen
        let aDelete = document.createElement("button");
        let aDeleteText = document.createTextNode("Delete");
        aDelete.appendChild(aDeleteText);
        aDelete.title = "delete";
        aDelete.className = "btn btn-delete delete-btn-" + notes[i].id;

        // Uhrzeit erstellen
        let uhrzeit = document.createElement("p");
        uhrzeit.classList.add("time");
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: "numeric", minute: "numeric" };
        uhrzeit.innerHTML = new Date(notes[i].timestamp).toLocaleDateString("de-DE",  options);

        // meta div
        let metaDiv = document.createElement("div");
        metaDiv.classList.add("meta");


        metaDiv.appendChild(uhrzeit);
        metaDiv.appendChild(aEdit);
        metaDiv.appendChild(aDelete);
        entryDiv.appendChild(metaDiv);


           // Aktuelles Objekt auslesen
           let objectID = notes[i].id;
           const currentObject = document.getElementById(objectID);
   
           aDelete.onclick = function() {
               if (confirm("Wirklich löschen?")) {
                   // Delete from view
                   currentObject.remove();
           
                   // Delete from Local Storage
                   notes.splice(i,1);
                   localStorage.setItem("notes", JSON.stringify(notes) );
                   document.getElementById("log").innerHTML = "";
                    createList(); 
               } else {
                   // Do nothing!
               }
           
               return false;
           }

        // Edit Logic
        
        aEdit.onclick = function() {
            console.log("edit!");
            console.log(objectID);
            console.log(currentObject);
            // 2. Ersetze Element durch Textarea, die den Content des Elements beinhaltet

            // Create Div, das alles beinhalten wird.
            let editDiv = document.createElement("div");
            editDiv.setAttribute("id","editDiv");


            let toBeReplaced = document.getElementById(objectID);
            // Replace Object with Textarea
            toBeReplaced.replaceWith(editDiv);

            // Create Textarea
            let editTextarea = document.createElement("textarea");
            editTextarea.value = notes[i].content;

            // Create Cancel Button
            let cancelButton = document.createElement("button");
            cancelButton.innerHTML = "Cancel";
            cancelButton.onclick = function () {
                editDiv.replaceWith(toBeReplaced);
            };

            // Create Save Button
            let saveButton = document.createElement("button");
            saveButton.innerHTML = "Save";
            saveButton.onclick = function () {
                notes[i].content = editTextarea.value; 
                localStorage.setItem("notes", JSON.stringify(notes) );                 
                document.getElementById("log").innerHTML = "";
                createList();
            };

            // Füge alles ins editDiv ein
            editDiv.appendChild(editTextarea);
            editDiv.appendChild(cancelButton);
            editDiv.appendChild(saveButton);

        }

    }
}
createList();  





function saveNote() {

    // Check ob Input leer
    if (document.getElementById("note").value === "") {
        alert("sollte nicht leer sein, wa");
        return;
    }

    // 1. Neues Objekt aus Textarea erstellen
    let userInput = document.getElementById("note").value; 
    let timeStamp = Date.now();

    // Generate Random ID
    const randomID = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    const note = {
        id: randomID(),
        timestamp: timeStamp,
        content:  userInput
    }

    // 2. Bereits zur Darstellung heruntergeladenes Local Storage Object mit neuem Object befüllen
    notes.push(note);

    // 3. Alles wieder in Local Storage bringen
    localStorage.setItem("notes", JSON.stringify(notes) ); 

    // Focus zurück ins Input Feld, alles löschen und neu füllen
    document.getElementById("note").value = "";
    document.getElementById("note").focus;

    document.getElementById("log").innerHTML = "";
    createList();


}

// CMD + Enter to send
var input = document.getElementById("note");

input.addEventListener("keydown", function(event) {
    if (event.metaKey && event.key == "Enter") {
        saveNote();
    } 
});

function clearLocalStorage(){
    if (confirm("Wirklich alles löschen?")) {
        notes = [];
        localStorage.clear();
        localStorage.setItem("notes", JSON.stringify(notes)); 
        document.getElementById("log").innerHTML = "";
    } else {
    // Do nothing!
    }
}
