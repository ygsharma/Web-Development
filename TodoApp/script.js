'use strict';
let body = document.body
let maincontainer = document.querySelector(".main_container")
let allticketarr = []


//  add task
let addtaskbtn = document.querySelector(".add_toBucket")
addtaskbtn.addEventListener("click", createmodal)

function createmodal(){
    let modalContainer = document.querySelector(".modal_container")
    if(modalContainer == null){
        modalContainer = document.createElement("div")
        modalContainer.setAttribute("class", "modal_container")
        modalContainer.innerHTML = `<i class="fas fa-times-circle"></i>
        <div class = "title_container">
            <input type="text" class = "task_name" placeholder="Enter task name here">
            <textarea class="description" placeholder="Write Description"></textarea>
        </div>
        <div class = "choose_priority">
            <label>Task Priority: <select class="drop_down">
                <option >Priority 1</option>
                <option >Priority 2</option>
                <option >Priority 3</option>
              </select></label>
           
              <label >Due Date: <input type="date" class="duedate" name="trip-start"
                value="2018-07-22"
                min="2019-01-01" max="2050-12-31"></label>
               
        </div>
        <div class = "savebtn">
            <button type = "button" class="save_btn">Save task</button>
        </div>`

        
    }

    body.appendChild(modalContainer)

    addtasktopage(modalContainer)
  
    // close modal using x button

    let closemodalbtn = document.querySelector(".fa-times-circle")
    closemodalbtn.addEventListener("click", closemodal)
    function closemodal(){
        if(modalContainer != null){
            modalContainer.remove()
        }
    }

}

function addtasktopage(modalContainer){
    let savebtnclicked = document.querySelector(".save_btn")
    savebtnclicked.addEventListener("click", function(e){
        let uid = uuidv4()
        let taskname = document.querySelector(".task_name")
        let description = document.querySelector(".description")
        let dropdown = document.querySelector(".drop_down")
        let duedate = document.querySelector(".duedate")
        modalContainer.remove()
        createtask(taskname.value, description.value, dropdown.value, duedate.value, uid)
})
}


function createtask(title, description, priority, duedate, uid){
    let ticketcontainer = document.createElement("div")
    ticketcontainer.setAttribute("class", "ticket_container")
    ticketcontainer.innerHTML = 
    `<div class="icon_container">
        <div class="kebab">
            <i class="fas fa-ellipsis-h"></i>
        </div>
        <div class="dropdown_content">
            <a class = "view" href="#" id = "view" value = "${uid}">View</a>
            <a class = "Edit" href="#" id = "Edit" value = "${uid}">Edit</a>
            <a class = "delete" href="#" id = "delete" value = "${uid}">Delete</a>
            <a class = "complete" href="#" id = "complete" value = "${uid}">Mark as Complete</a>
        </div>
    </div>
    <div class = "information">
        <div class = "tasktitlediv"><h1 class = "task_title">${title}</h1></div>
        <div class = "sub_information">
            <h4 class = "priority_selected">Urgency : ${priority}</h4>
            <h4 class="due_date">Due date: ${duedate}</h4>
        </div>
    </div>`

    if(priority === "Priority 1"){
        let prioritycontainer = document.querySelector(".division1")
        prioritycontainer.appendChild(ticketcontainer)
        ticketcontainer.style.backgroundColor = "#e31029"
    }else if(priority === "Priority 2"){
        let prioritycontainer = document.querySelector(".division2")
        prioritycontainer.appendChild(ticketcontainer)
        ticketcontainer.style.backgroundColor = "#72e031"
    }else if(priority === "Priority 3"){
        let prioritycontainer = document.querySelector(".division3")
        prioritycontainer.appendChild(ticketcontainer)
        ticketcontainer.style.backgroundColor = "#b742ed"
    }   
    
    //maincontainer.appendChild(ticketcontainer)
    allticketarr.push([uid, ticketcontainer, title, description, priority, duedate ])
    localStorage.setItem("Alltickets", allticketarr)
    console.log(allticketarr)

    // Delete task

    let deletebtn = ticketcontainer.querySelector(".delete")
    deletebtn.addEventListener("click", deletetask)

    // View Task

    let viewbtn = ticketcontainer.querySelector(".view")
    viewbtn.addEventListener("click", viewtask)

    // Edit Task

    let editbtn = ticketcontainer.querySelector(".Edit")
    editbtn.addEventListener("click", Edittask)

    // Mark as complete task

    let completebtn = ticketcontainer.querySelector(".complete")
    completebtn.addEventListener("click", markcomplete)

    
}

function deletetask(e){

    let currticketcontainer = e.currentTarget;
    let uid = currticketcontainer.getAttribute("value")
    for(let i = 0; i< allticketarr.length; i++){
        let id = (allticketarr[i])[0]
        let ticketselected = (allticketarr[i])[1]
        if(id == uid){
            let arr1 = allticketarr.splice(0, i)
            let arr2 = allticketarr.splice(i, allticketarr.length)
            allticketarr = arr1.concat(arr2)
            localStorage.setItem("Alltickets", allticketarr)
            ticketselected.remove()
        }
      
    }
   
    
}

function viewtask(e){
    getvalues()
    function getvalues(){
        let currticketcontainer = e.currentTarget;
        let uid = currticketcontainer.getAttribute("value")
        for(let i = 0; i< allticketarr.length; i++){
            let id = (allticketarr[i])[0]
            if(id == uid){
                let settitle = (allticketarr[i])[2]
                let setdescription = (allticketarr[i])[3]
                let setpriority = (allticketarr[i])[4]
                let setdate = (allticketarr[i])[5]
                viewmodal()
                 
                function viewmodal(){
                    let modalContainer = document.querySelector(".modal_container")
                    if(modalContainer == null){
                        modalContainer = document.createElement("div")
                        modalContainer.setAttribute("class", "modal_container")
                        modalContainer.innerHTML = `<i class="fas fa-times-circle"></i>
                        <div class = "title_container" ">
                            <input type="text" class = "task_name" readonly="readonly" value = "${settitle}">
                            <textarea class="description" readonly="readonly">${setdescription}</textarea>
                            </div>
                            <div class = "choose_priority">
                                <label>Task Priority: <select class="drop_down">
                                    <option selected disable hidden>${setpriority}</option>
                                </select></label>
                                  <label >Due Date: <input type="date" class="duedate" name="trip-start"
                                        value="${setdate}" readonly="readonly"
                                        min="2019-01-01" max="2050-12-31">
                                  </label>
                                   
                        </div>`
                    
                            
                        }
                    
                        body.appendChild(modalContainer)
                      
                        // close modal using x button
                    
                        let closemodalbtn = document.querySelector(".fa-times-circle")
                        closemodalbtn.addEventListener("click", closemodal)
                        function closemodal(){
                            if(modalContainer != null){
                                modalContainer.remove()
                            }
                        }
                }
            }
        }
    }
}

function Edittask(e){
    getvalues()
    function getvalues(){
        let currticketcontainer = e.currentTarget;
        let uid = currticketcontainer.getAttribute("value")
        for(let i = 0; i< allticketarr.length; i++){
            let id = (allticketarr[i])[0]
            if(id == uid){
                let settitle = (allticketarr[i])[2]
                let setdescription = (allticketarr[i])[3]
                let setpriority = (allticketarr[i])[4]
                let setdate = (allticketarr[i])[5]
                deletetask(e)
                viewmodal()
                function viewmodal(){
                    let modalContainer = document.querySelector(".modal_container")
                    if(modalContainer == null){
                        modalContainer = document.createElement("div")
                        modalContainer.setAttribute("class", "modal_container")
                        modalContainer.innerHTML = `<i class="fas fa-times-circle"></i>
                        <div class = "title_container">
                            <input type="text" class = "task_name"  value = "${settitle}">
                            <textarea class="description">${setdescription}</textarea>
                            </div>
                            <div class = "choose_priority">
                                <label>Task Priority: <select class="drop_down">
                                    <option >Priority 1</option>
                                    <option >Priority 2</option>
                                    <option >Priority 3</option>
                                    </select></label>
                                  <label >Due Date: <input type="date" class="duedate" name="trip-start"
                                        value="${setdate}" 
                                        min="2019-01-01" max="2050-12-31">
                                  </label>
                        </div>
                        <div class = "savebtn">
                            <button type = "button" class="save_btn">Save task</button>
                        </div>`                                
                        }
                        body.appendChild(modalContainer)
                        addtasktopage(modalContainer)
                        // close modal using x button
                    
                        let closemodalbtn = document.querySelector(".fa-times-circle")
                        closemodalbtn.addEventListener("click", closemodal)
                        function closemodal(){
                            if(modalContainer != null){
                                modalContainer.remove()
                            }
                        }

                        createtask(taskname.value, description.value, dropdown.value, duedate.value, uid)
                }
            }
        }
    }
}

function markcomplete(e){
    let currticketcontainer = e.currentTarget;
    let uid = currticketcontainer.getAttribute("value")
    for(let i = 0; i< allticketarr.length; i++){
        let id = (allticketarr[i])[0]
        let ticketselected = (allticketarr[i])[1]
        if(id == uid){
            let title = ticketselected.querySelector(".task_title").innerText.strike()
            ticketselected.querySelector(".task_title").innerHTML = title
            
            let priority = ticketselected.querySelector(".priority_selected").innerText.strike()
            ticketselected.querySelector(".priority_selected").innerHTML = priority

            let due_date = ticketselected.querySelector(".due_date").innerText.strike()
            ticketselected.querySelector(".due_date").innerHTML = due_date

            let compeletedcontainer = document.querySelector(".division4")
            compeletedcontainer.appendChild(ticketselected)
        }
      
    }
}

function uuidv4() {
    return 'xxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}