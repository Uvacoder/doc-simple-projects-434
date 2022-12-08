// AUTHOR: ELDERNY
// SOCIAL MEDIA: @elderny1 on telegram

//Call for function if user might have stored some notes already while loading the web page
showNotes();


/*           BUG FIX                */

//****Fix Navbar not closing in mobile****
let nav_main = document.querySelector('.navbar-collapse');
let nav_iconHTML = document.getElementById('icon_bdy').innerHTML;
let nav_icon = document.getElementById('icon_bdy');
let new_navIcon = `<button id="close_btn" class="navbar-toggler" type="button">
<span class="navbar-toggler-icon"></span>
</button>`
setInterval(() => {
  document.querySelector('#navvBar').addEventListener('click', () => {
    nav_icon.innerHTML = '';
    nav_icon.innerHTML = new_navIcon;
    close_btn = document.getElementById('close_btn');
    close_btn.addEventListener('click', close_icon_clk);
  });
}, 500);

function close_icon_clk() {
  nav_main = document.querySelector('.navbar-collapse');
  nav_icon.innerHTML = new_navIcon;
  nav_main.classList.remove('show');
  nav_icon.innerHTML = nav_iconHTML;
}

/*             BUG END                     */

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");

//Add the message element from the HTML
addBtn.addEventListener("click", showError);

//Declaring for the use of functions
let showPop = document.getElementById('showPop');
let message = '';

//Show success or error popup on adding and deleting notes
function btnclkMessage(type, text) {
  let typeTxt;
  if (type == 'success') {
    typeTxt = 'Added';
  }
  else if (type == 'danger') {
    typeTxt = 'Deleted';
  }
  message = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
  <strong>${typeTxt}:</strong> ${text}!
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`
  showPop.innerHTML += message;
  setTimeout(() => {
    showPop.innerHTML = '';
  }, 5000);
}

//Show error if the username is more then 8 characters 
function showError() {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  let addName = document.getElementById("addName");
  message = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                  <strong>Error,</strong> Username limit - 8 characters, Title limit - 18 characters, Note limit - 0+
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`
  //If username contains more then 8 characters show error
  if (addName.value.length > 8 || addTitle.value.length > 18 || addTxt.value.length <= 0) {
    showPop.innerHTML += message;
    setTimeout(() => {
      showPop.innerHTML = '';
    }, 10000);
    impChecker = 0;
  } else {
    //Otherwise we will call the note adder function
    btnAdder();
  }
}


//This will return current time of adding the note
function getTime() {
  let currentdate = new Date();
  let datetime = currentdate.getDay() + "/" + currentdate.getMonth()
    + "/" + currentdate.getFullYear() + " "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":" + currentdate.getSeconds();
  return datetime;
}

//This will add new note to the list
function btnAdder() {
  //Define main variables
  let notes = localStorage.getItem("notes");
  let markImp = document.getElementById('markImp');
  let impChecker = 0;
  let current_time = getTime();
  // Check if conditions are met or not
  if (markImp.checked) {
    impChecker = 1;
  }
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj = {
    title: addTitle.value,
    text: addTxt.value,
    important: impChecker,
    name: addName.value,
    time: current_time
  };
  //This will push user inserted data into an array string as JSON
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  // Reset the variables values
  let title_msg = addTitle.value;
  addTxt.value = "";
  addTitle.value = "";
  impChecker = 0;
  current_time = "";
  btnclkMessage(`success`, `Note, ${title_msg} has been added to the storage`);
  showNotes();
};


// Function to show notes which are saved in localStorage
//GET PERMISSION FROM @elderny1 on telegram to get access to this code below
function showNotes() {
  let notes = localStorage.getItem('notes');
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  //defining some variables
  let html = "";
  let text_val;
  let imp_cop = document.getElementById('elderny_copy');
  setInterval(() => {
    imp_cop = document.getElementById('elderny_copy');
  }, 5000);
  //This code will maintain note card width and height and position
  if (typeof (imp_cop) != 'undefined' && imp_cop != null) {
    if (imp_cop.innerText.includes("elderny")) {
      notesObj.forEach(function (element, index) {
        if (element.text.length > 168) {
          //This will stop text more then 168 characters to be shown directly on card stopping overflow
          text_val = String(element.text.substring(0, 168));
          text_val += ` <a href='#' style='text-decoration:none;' onclick="textShower(\` ${element.title} \`,\`  ${element.text} \`,\`  ${element.name} \`,\`  ${element.time} \`)">read more...</a>`;
        } else if (element.text.length <= 168) {
          text_val = element.text;
        }
        html += `<div class="FixWid noteCard my-2 mx-2 card ImpChk${element.important}" style="width: 18rem;">
    <div class="card-body fix_margin">
    <h5 class="card-title">${element.title}</h5>
    <p class="card-text">${text_val}</p>
    <div class="is_flex">
    <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
    <span class="card-text username"><b>${element.name}</b></span>
    </div>
    </div>
    </div>`;
      });
      //This will add the note to the localstorage notes array
      let notesElm = document.getElementById("notes");
      if (notesObj.length != 0) {
        notesElm.innerHTML = html;
      } else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
      }
    } else {
      //This is the copyright protection part DON't mess wit it
      setInterval(() => {
        window.onload = function () {
          location.href = "https://www.t.me/elderny1";
        }
      }, 5000);
      alert("You've tried to change copyright!, Contact elderny to get permission");
    }
  }
}

//This will show the readmore part of the note
function textShower(title, text, username, time) {
  //This is the readmore html part, you can add it in html directly then access the content parts through id and classes if you want to
  let new_text = `
  <div id="main_readmore_body">
    <div id="readmore_body" class="big_card noteCard my-5 card" style="width: 18rem;">
        <div class="card-body">
            <div class="is_flex_title">
                <h5>Title: </h5>
                <p class="card-title zoomed_title">${title}</p>
            </div>
            <button type="button" class="btn-close zoomed_close_btn" data-bs-dismiss="alert" onclick="rdclbtn()"
                aria-label="Close"></button>
            <div class="content_joiner">
                <div class="is_flex_new">
                    <h6>Username: </h6>
                    <p class="card-title zoomed_username">${username}</p>
                </div>
                <div class="is_flex_new">
                    <h6>Added Date: </h6>
                    <p class="card-title zoomed_time">${time}</p>
                </div>
            </div>
            <h3 class="text-center zoomed_heading">NOTE</h3>
        </div>
        <hr class="mx-3">
        <p class="card-text mx-3 zoomed_text">${text}</p>
        <hr class="mx-3">
    </div>
</div>
</div>
</div>`;
  let overlap_text = document.getElementById("overlap_text");
  overlap_text.innerHTML = new_text;
  let main_body = document.getElementById('main_body');
  main_body.className += " on_readmore";
}

//This will close the readmore part of the note
function rdclbtn() {
  console.log("click");
  let readmore_body = document.getElementById('main_readmore_body');
  readmore_body.parentElement.removeChild(readmore_body);
  let main_body = document.getElementById('main_body');
  main_body.classList.remove("on_readmore")
}

// Function to delete a note
function deleteNote(index) {

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  btnclkMessage(`danger`, `Note, ${notesObj[index].title} has been deleted from the storage`);
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

//THis will help to search throughout the notes
let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

  let inputVal = search.value;
  let noteCards = document.getElementsByClassName('noteCard');
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    }
    else {
      element.style.display = "none";
    }
  })
})
