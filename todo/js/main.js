$(document).ready(function() {
  // done and remove icons
  var completeIcon = '<i class="material-icons">done</i>';
  var removeIcon = '<i class="material-icons">delete</i>';
  var editIcon = '<i class="material-icons">edit</i>';

  // Ajax loader
  $.ajax({
    url:"js/data.json",
    type:'GET',
    dataType:'json',
    success: function(tasks) {
      $.each(tasks, function(i, item) {
        addTask(item.task);
      })
    },
    error: function() {
      // alert('Error Loading Tasks...');
      console.log("Error");
    }
  });

  // Close Edit Popup
  function closePopup() {
    $('#nav-menu').css({left:'-450px'});
    $('#transparent-bkg').fadeOut('fast');
    $('#editPopup').slideUp('fast');
    $('#edit-input').val('');
  }
  $('#transparent-bkg').click(closePopup);
  $('#editPopup .closePopup').click(closePopup);

  // Edit task function
  function editTask() {
    var $toBeEdited = $(this).prev().prev();
    var $toBeEditedText = $toBeEdited.text();
    $('#transparent-bkg').fadeIn('fast');
    $('#editPopup').slideDown('fast');
    $('#edit-input').focus();
    $('#edit-input').val($toBeEdited.text());
    $('#save').click(function() {
      var $editedText = $('#edit-input').val();
      if ($editedText) {
        $toBeEdited.text($editedText);
        //  Fetches saved data
        var tasks = JSON.parse(localStorage.getItem('tasks'));
        //  Edits task from saved tasks
        for (let i = 0; i < tasks.length; i++) {
          if (tasks[i].task_name == $toBeEditedText) {
            tasks[i].task_name = $editedText
          }
        }
        //  Re-sets data to localStorage
        localStorage.setItem('tasks',JSON.stringify(tasks));
        $('#transparent-bkg').fadeOut('fast');
        $('#editPopup').slideUp('fast');
      } else {
        $('#edit-input').css('border','0.5px solid red');
        setTimeout(function() {
          $('#edit-input').css('border','0.5px solid #e7a514');
        }, 1500);
      }
    });
  }

  // Adds Task from Input
  function addTheTask() {
    var $taskInput = $('#input');
    var $value = $taskInput.val();
    if ($value) {
      addTask($value);
    } else {
      $taskInput.css('border','1px solid red');
      setTimeout(function() {
        $taskInput.css('border','none');
      }, 1500);
    }
  }
  // Add task to list: click and enter
  $('#add-task').click(addTheTask);
  $("#input").keypress(function(e) {
    if (e.which == 13) {
      addTheTask();
    }
  });

  //adds a task to list
   function addTask(item) {
     // To do list
     var $todoList = $('#todo');

     // Task
     var $task = $("<li>", {
       class: "task"
     });
     var $taskName = $("<span>", {
       class: "task-name"
     });
     $taskName.text(item);

     // Complete task button
     var $complete = $("<span>", {
       class: "check-task"
     });
     $complete.addClass("pull-left");
     $complete.click(completeTask);

     // Edit task button
     var $edit = $("<span>", {
       class: "edit-task"
     });
     $edit.addClass("task-options");
     $edit.html(editIcon);
     // Edit function
     $edit.click(editTask);

     // Delete task button
     var $remove = $("<span>", {
       class: "delete-task"
     });
     $remove.addClass("task-options");
     $remove.html(removeIcon);
     $remove.click(removeTask);

     // Append elements to task
     $task.append($complete);
     $task.append($taskName);
     $task.append($remove);
     $task.append($edit);

     // Append task to todo list
     $todoList.append($task);

    //  Creates a task object
    const task = {
      task_name: item,
      completion: false
    }

    if (localStorage.getItem('tasks') === null) {
      // Creates new array
      var tasks = [];
      // Adds task data to array
      tasks.push(task);
      //  Re-sets data to localStorage
      localStorage.setItem('tasks',JSON.stringify(tasks));
    } else {
      // Fetches array of saved tasks
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      // Adds new task to array
      tasks.push(task);
      //  Re-sets data to localStorage
      localStorage.setItem('tasks',JSON.stringify(tasks));
    }

     // Clear input
     $("#input").val('');

     // Input Break styling
     if ($('.task').length > 0) {
       $('#input-break .task-status').css('display','block');
       $('#input-break hr').css('border-color','#e74c3c');
     } else {
       $('#input-break .task-status').css('display','none');
       $('#input-break hr').css('border-color','#eee');
     }

     // Task Break styling
     if ($('.done-task').length > 0) {
       $('#task-break').css('display','block');
     } else {
       $('#task-break').css('display','none');
     }

     // Notifications
     if ($('.task').length == 0 && $('.done-task').length > 0) {
       $('#todo-notif').css('display','block');
       $('#done-notif').css('display','none');
     } else if ($('.task').length > 0 && $('.done-task').length == 0) {
       $('#todo-notif').css('display','none');
       $('#done-notif').css('display','block');
     } else if ($('.task').length > 0 && $('.done-task').length > 0) {
       $('#todo-notif').css('display','none');
       $('#done-notif').css('display','none');
     } else {
       $('#todo-notif').css('display','block');
       $('#done-notif').css('display','none');
     }
     
   }

   // completes a task
   function completeTask() {
     var $doneList = $("#done");
     var $taskTitle = $(this).next().text();

     // Task
     var $doneTask = $("<li>", {
       class: "done-task"
     });
     var $taskName = $("<span>", {
       class: "task-name"
     });
     $taskName.text($taskTitle);

     // Completed task button
     var $complete = $("<span>", {
       class: "checked-task"
     });
     $complete.addClass("pull-left");
     $complete.html(completeIcon);
     $complete.click(uncompleteTask);

     // Edit task button
     var $edit = $("<span>", {
       class: "edit-task"
     });
     $edit.addClass("task-options");
     $edit.html(editIcon);
     // Edit function
     $edit.click(editTask);

     // Delete task button
     var $remove = $("<span>", {
       class: "delete-task"
     });
     $remove.addClass("task-options");
     $remove.html(removeIcon);
     $remove.click(removeTask);

     // Append elements to done task
     $doneTask.append($complete);
     $doneTask.append($taskName);
     $doneTask.append($remove);
     $doneTask.append($edit);

     // Append task to the done list
     $doneList.prepend($doneTask);

     //  Fetches saved data
     var tasks = JSON.parse(localStorage.getItem('tasks'));

    //  Updates completion status
     for (let i = 0; i < tasks.length; i++) {
       if (tasks[i].task_name == $taskTitle) {
         tasks[i].completion = true;
       }
     }
     //  Re-sets data to localStorage
     localStorage.setItem('tasks',JSON.stringify(tasks));

     // Remove original element
     var $doneItem = $(this).parent();
     var $doneParent = $doneItem.parent();
     $doneItem.remove();

     // Input Break styling
     if ($('.task').length > 0) {
       $('#input-break .task-status').css('display','block');
       $('#input-break hr').css('border-color','#e74c3c');
     } else {
       $('#input-break .task-status').css('display','none');
       $('#input-break hr').css('border-color','#eee');
     }

     // Task Break styling
     if ($('.done-task').length > 0) {
       $('#task-break').css('display','block');
     } else {
       $('#task-break').css('display','none');
     }

     // Notifications
     if ($('.task').length == 0 && $('.done-task').length > 0) {
       $('#todo-notif').css('display','block');
       $('#done-notif').css('display','none');
     } else if ($('.task').length > 0 && $('.done-task').length == 0) {
       $('#todo-notif').css('display','none');
       $('#done-notif').css('display','block');
     } else if ($('.task').length > 0 && $('.done-task').length > 0) {
       $('#todo-notif').css('display','none');
       $('#done-notif').css('display','none');
     } else {
       $('#todo-notif').css('display','block');
       $('#done-notif').css('display','none');
     }

   }

   // uncompletes a task
   function uncompleteTask() {
     var $todoList = $("#todo");
     var $taskTitle = $(this).next().text();

     // Task
     var $todoTask = $("<li>", {
       class: "task"
     });
     var $taskName = $("<span>", {
       class: "task-name"
     });
     $taskName.text($taskTitle);

     // Completed task button
     var $complete = $("<span>", {
       class: "check-task"
     });
     $complete.addClass("pull-left");
     $complete.html(completeIcon);
     $complete.click(completeTask);

     // Edit task button
     var $edit = $("<span>", {
       class: "edit-task"
     });
     $edit.addClass("task-options");
     $edit.html(editIcon);
     // Edit function
     $edit.click(editTask);

     // Delete task button
     var $remove = $("<span>", {
       class: "delete-task"
     });
     $remove.addClass("task-options");
     $remove.html(removeIcon);
     $remove.click(removeTask);

     // Append elements to done task
     $todoTask.append($complete);
     $todoTask.append($taskName);
     $todoTask.append($remove);
     $todoTask.append($edit);

     // Append task to the done list
     $todoList.prepend($todoTask);

     //  Fetches saved data
     var tasks = JSON.parse(localStorage.getItem('tasks'));
     // Updates the completion status
     for (let i = 0; i < tasks.length; i++) {
       if (tasks[i].task_name == $taskTitle) {
         tasks[i].completion = false;
       }
     }
     //  Re-sets data to localStorage
     localStorage.setItem('tasks',JSON.stringify(tasks));

     // Remove original element
     var $doneItem = $(this).parent();
     var $doneParent = $doneItem.parent();
     $doneItem.remove();

     // Input Break styling
     if ($('.task').length > 0) {
       $('#input-break .task-status').css('display','block');
       $('#input-break hr').css('border-color','#e74c3c');
     } else {
       $('#input-break .task-status').css('display','none');
       $('#input-break hr').css('border-color','#eee');
     }

     // Task Break styling
     if ($('.done-task').length > 0) {
       $('#task-break').css('display','block');
     } else {
       $('#task-break').css('display','none');
     }

     // Notifications
     if ($('.task').length == 0 && $('.done-task').length > 0) {
       $('#todo-notif').css('display','block');
       $('#done-notif').css('display','none');
     } else if ($('.task').length > 0 && $('.done-task').length == 0) {
       $('#todo-notif').css('display','none');
       $('#done-notif').css('display','block');
     } else if ($('.task').length > 0 && $('.done-task').length > 0) {
       $('#todo-notif').css('display','none');
       $('#done-notif').css('display','none');
     } else {
       $('#todo-notif').css('display','block');
       $('#done-notif').css('display','none');
     }

   }

   // Removes a task from both lists
  function removeTask() {
      var $item = $(this).parent();
      var $taskTitle = $(this).prev().text();      
      $item.remove();

      // Fetches saved data
      var tasks = JSON.parse(localStorage.getItem('tasks'));

      // Delete an item from saved data
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].task_name == $taskTitle) {
          tasks.splice(i,1)
        }
      }
      // Re-set data to storage
      localStorage.setItem('tasks',JSON.stringify(tasks));

      // Input Break styling
      if ($('.task').length > 0) {
        $('#input-break .task-status').css('display','block');
        $('#input-break hr').css('border-color','#e74c3c');
      } else {
        $('#input-break .task-status').css('display','none');
        $('#input-break hr').css('border-color','#eee');
      }

      // Task Break styling
      if ($('.done-task').length > 0) {
        $('#task-break').css('display','block');
      } else {
        $('#task-break').css('display','none');
      }

      // Notifications
      if ($('.task').length == 0 && $('.done-task').length > 0) {
        $('#todo-notif').css('display','block');
        $('#done-notif').css('display','none');
      } else if ($('.task').length > 0 && $('.done-task').length == 0) {
        $('#todo-notif').css('display','none');
        $('#done-notif').css('display','block');
      } else if ($('.task').length > 0 && $('.done-task').length > 0) {
        $('#todo-notif').css('display','none');
        $('#done-notif').css('display','none');
      } else {
        $('#todo-notif').css('display','block');
        $('#done-notif').css('display','none');
      }
  }

  // Removes All Tasks
  var $deleteAll = $('#del-all');
  $deleteAll.click(function() {
      $("#done").empty();
      $("#todo").empty();
      $('#option-holder').css({display:"none"});

      // Fetchs saved data and empties it
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      tasks = [];
      localStorage.setItem('tasks',JSON.stringify(tasks));

      // Input Break styling
      if ($('.task').length > 0) {
        $('#input-break .task-status').css('display','block');
        $('#input-break hr').css('border-color','#e74c3c');
      } else {
        $('#input-break .task-status').css('display','none');
        $('#input-break hr').css('border-color','#eee');
      }

      // Task Break styling
      if ($('.done-task').length > 0) {
        $('#task-break').css('display','block');
      } else {
        $('#task-break').css('display','none');
      }

      // Notifications
      if ($('.task').length == 0 && $('.done-task').length > 0) {
        $('#todo-notif').css('display','block');
        $('#done-notif').css('display','none');
      } else if ($('.task').length > 0 && $('.done-task').length == 0) {
        $('#todo-notif').css('display','none');
        $('#done-notif').css('display','block');
      } else if ($('.task').length > 0 && $('.done-task').length > 0) {
        $('#todo-notif').css('display','none');
        $('#done-notif').css('display','none');
      } else {
        $('#todo-notif').css('display','block');
        $('#done-notif').css('display','none');
      }
  });

  // Display options: Delete all and Sync
  $('#options-btn').click(function() {
    if ($('#option-holder').css("display") == "none") {
      $('#option-holder').css({display:'inline-block'});
    } else {
      $('#option-holder').css({display:'none'});
    }
  });

  // Display Navigation
  $('.nav-icon').click(function() {
    if ($('#nav-menu').css("left") == "-450px") {
      $('#nav-menu').css({left:'0px'});
      $('#transparent-bkg').fadeIn('fast');
    } else {
      $('#nav-menu').css({left:'-450px'});
      $('#transparent-bkg').fadeOut('fast');
    }
  });

  // Task counter
  setInterval(function() {
    $('#todo-counter span').html($('.task').length);
    $('#done-counter span').html($('.done-task').length);
  }, 500);

});
