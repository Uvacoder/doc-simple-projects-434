const red = '#FF4E55';        // Red color
const green = '#1abc9c';      // Green color
let countdown, records;                                        // Countdown function and records array declaration
const show = document.querySelector('.show-times');            // Show records button
const blurBkg = document.querySelector('.blur-bkg');           // Blurred background when records are shown
const increment = document.querySelector('.increment');        // Increment button
const decrement = document.querySelector('.decrement');        // Decrement button
const minuteDisplay = document.querySelector('.minute');       // Minute display when timer is running
const start = document.querySelector('.start');                // Start timer button
const selectTask = document.querySelector('select');           // List of task options
const recordList = document.querySelector('.records');         // List of records on UI
const clearRecords = document.querySelector('.clear-records'); // Clear records button

// Initialize and set record data
const recordData = [
   {taskName: 'work', value: 0},
   {taskName: 'study', value: 0},
   {taskName: 'break', value: 0},
   {taskName: 'uncategorized', value: 0}
];

// Set record data depending on its existence
if (localStorage.getItem('records') === null) {
   records = recordData;
   localStorage.setItem('records',JSON.stringify(records));
} else {
   records = getSavedRecords();		
}

// Update UI with stored record data
records.forEach(record => {
   displayRecords(record.taskName, record.value);
});

// Returns saved records
function getSavedRecords() {
   return JSON.parse(localStorage.getItem('records'));
}

// Updates respective record value
function updateRecords(task, value) {
   let taskValue;
   let records = getSavedRecords();
   let isFound = records.find((el) => el.taskName == task);
   taskValue = isFound.value;
   taskValue += value;
   isFound.value = taskValue;
   localStorage.setItem('records',JSON.stringify(records));
   displayRecords(task, taskValue);
}

// Displays records on the UI
function displayRecords(task, value) {
   let currChild;
   let taskLength = recordList.childElementCount;
   const hours = Math.floor(value / 3600);
   value -= hours * 3600
   const minutes = Math.floor(value / 60);
   const timeDisplay = `${hours}h ${minutes}m`;
   for (let i = 1; i < taskLength; i++) {
      currChild = recordList.children[i];
      if (currChild.dataset.task == task) {
         currChild.querySelector('.record').textContent = timeDisplay;
      }
   }
}

// Increment minutes
increment.addEventListener('click', () => {
   let currMin = parseInt(minuteDisplay.textContent);
   if (currMin < 60)
      currMin+=5;
   minuteDisplay.textContent = currMin;
});
// Decrement minutes
decrement.addEventListener('click', () => {
   let currMin = parseInt(minuteDisplay.textContent);
   if (currMin > 5)
      currMin-=5;
   minuteDisplay.textContent = currMin;
});

// Show / Hide Records
show.addEventListener('click', () => {
   document.body.classList.toggle('times-shown');
   if (document.body.classList.contains('times-shown')) {
      show.innerHTML = '<i class="icon ion-md-close"></i>';
      show.style.background = red;
   } else {
      show.innerHTML = '<i class="icon ion-md-list-box"></i>';
      show.style.background = green;
   }
});
// Show / Hide Blur Background
blurBkg.addEventListener('click', () => {
   document.body.classList.remove('times-shown');
   show.innerHTML = '<i class="icon ion-md-list-box"></i>';
   show.style.background = green;
});

// Timer function
function timer(seconds, task) {
   clearInterval(countdown);
   const now = Date.now();
   const then = now + seconds * 1000;
   displayTime(seconds);
   countdown = setInterval(() => {
      const secondsLeft = Math.round((then - Date.now()) / 1000);
      if (secondsLeft < 0) {
         document.body.classList.remove('timer-running');
         start.innerHTML = 'Start';
         minuteDisplay.textContent = '25';
         document.title = 'Timr Ended!';
         updateRecords(task, seconds);
         clearInterval(countdown);
         return;
      }
      displayTime(secondsLeft);
   }, 1000);
}

// Displays time when timer is running
function displayTime(seconds) {
   const minutes = Math.floor(seconds / 60);
   const remainderSeconds = seconds % 60;
   const timeDisplay = `${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
   document.title = timeDisplay;
   minuteDisplay.textContent = timeDisplay;
}

// Start timer
start.addEventListener('click', () => {
   let min = parseInt(minuteDisplay.textContent);
   let task = selectTask.value;
   
   if (document.body.classList.contains('timer-running')) {
      document.body.classList.remove('timer-running');
      start.innerHTML = 'Start';
      minuteDisplay.textContent = '25';
      document.title = 'Timr';
      clearInterval(countdown);     
   } else {
      document.body.classList.add('timer-running');
      start.innerHTML = 'Stop';
      timer(min * 60, task);
   }
});

// Clear records and update UI
clearRecords.addEventListener('click', () => {
   let recordsArray = getSavedRecords();
   recordsArray.forEach(record => {
      if (record.value != 0) {
         record.value = 0;
         localStorage.setItem('records',JSON.stringify(recordsArray));
         displayRecords(record.taskName, record.value);
      }
   });
});
