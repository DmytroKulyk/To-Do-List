//add interactivity so the user can manage daily tasks
 
 var taskInput = document.getElementById("new-task"); //new-task
 var addButton = document.getElementsByTagName("button")[0]; //first button
 var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
 var completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks

//New task list Item
var createNewTaskElement = function(taskString){
  // Create List Item
  var listItem = document.createElement("li");
     
     //input(checkbox)
     var checkBox = document.createElement("input");
	  //lable
	 var label = document.createElement("label"); 
	  //input(text)
	  var editInput = document.createElement("input");
	  //button.edit
	  var editButton = document.createElement("button");
	  //button. delete
	  var deleteButton = document.createElement("button");
	  
	  //Each element needs modified
	  checkBox.type = "checkbox";
	  editInput.type = "text";

	  editButton.innerText = "Edit";
	  editButton.className = "edit";
	  deleteButton.innerText = "Delete";
	  deleteButton.className = "delete";

	  label.innerText = taskString;

	  //Each element needs appended
	  listItem.appendChild(checkBox);
	  listItem.appendChild(label);
	  listItem.appendChild(editInput);
	  listItem.appendChild(editButton);
	  listItem.appendChild(deleteButton);

 return listItem;	  
}


 // Add a new task
var addTask = function(){
	console.log("add task ...");
  //create a new list item with the text from #new-task:

    var emptyTask = "";
    if (taskInput.value !== emptyTask) {

        var listItem = createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTasksHolder
        incompleteTasksHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskCompleted);

        taskInput.value = "";
    } else {
        console.log("No task was appended");
    }

};

 //Edit an existing task
var editTask = function(){ 
	console.log("Edit task ...");

	var listItem = this.parentNode;

	var editInput = listItem.querySelector("input[type=text]");
	var lable = listItem.querySelector("label");
    
    var containsClass = listItem.classList.contains('editMode');
    var button = listItem.querySelector("button.edit");
	   //if the class of the parent is .editMode
	   if(containsClass){
	    //swich from .editMode
	    //lable text become the input's value
	    lable.innerText = editInput.value;
	    button.innerText = "Edit";
	   }else{
	    //Swich to .editMode
	    //input value becomes the label's text
	    editInput.value = lable.innerText;
         button.innerText = "Save";

	}
   //Toggle .editMode on the listItem
   listItem.classList.toggle("editMode");
}

 //Delete an existing task
 var deleteTask = function(){
 	console.log("delete task ...");
   
   var listItem = this.parentNode;
   var ul = listItem.parentNode;
   //Remove the parent list item from the ul
   ul.removeChild(listItem);
}

 //Mark a task as complete
 var taskCompleted = function(){
 	console.log("complete task ...");
   //Append the task list item to the #complete-tasks
   var listItem = this.parentNode;
   completedTasksHolder.appendChild(listItem);
   bindTaskEvents(listItem, taskIncomplete);
}

 //Mark a task as incomplete
 var taskIncomplete = function(){
 	console.log("incomplete task ...");
    //Append the task list to the #incomplete-tasks
   var listItem = this.parentNode;
   incompleteTasksHolder.appendChild(listItem);
   bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHendler){
console.log("bind list item events");
//select taskListItem's children
 var checkBox = taskListItem.querySelector("input[type=checkbox]");
 var editButton = taskListItem.querySelector("button.edit");
 var deleteButton = taskListItem.querySelector("button.delete");

	 // bind editTask to edit button
	 editButton.onclick = editTask;
	 // bind deleteTask to delete button
	 deleteButton.onclick = deleteTask;
	 // bind checkBoxEventHendler to checkbox
	 checkBox.onchange = checkBoxEventHendler;
}


//set the click handler to the add function
addButton.addEventListener("click", addTask);

//cycle over incompleteTasksHolder ul list item
for(var i = 0; i < incompleteTasksHolder.children.length; i++){
    //bind events to list item's cheldren (taskCompleted)
   bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);

}


//cycle over completeTasksHolder ul list item
for(var i = 0; i < completedTasksHolder.children.length; i++){
	  //bind events to list item's cheldren (taskIncomplete)

   bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}




