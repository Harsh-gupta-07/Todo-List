const addbtn = document.getElementById("add")
const listdiv = document.getElementById("list")
const taskinput = document.getElementById("tti")
addbtn.addEventListener("click",addtask)
taskinput.addEventListener("keydown", function(event){
    if (event.key === "Enter"){
        addtask();
    }
})

if (localStorage.getItem("tasks") === null){
    localStorage.setItem("tasks",JSON.stringify([]))
}

let tasklist = JSON.parse(localStorage.getItem("tasks"));

function create(){
    JSON.parse(localStorage.getItem("tasks")).forEach((element,ind) => {
        createtask(element,ind);
    });
}

function addtask(){
    const temp = taskinput.value;
    if (temp){
        createtask([temp,false], tasklist.length);
        tasklist.push([temp,false]);
        localStorage.setItem("tasks", JSON.stringify(tasklist));
        console.log(localStorage.getItem("tasks"));
    }
}

function createtask(element,ind){
    const tasksdiv = document.createElement('div');
    const taskhead = document.createElement('div');
    const taskheadtext = document.createElement('p');
    const taskactions = document.createElement('div');
    const checkbtn = document.createElement('button');
    const delbtn = document.createElement("button");
    tasksdiv.classList.add("task-div");
    tasksdiv.id = String(ind);
    taskhead.classList.add("task-head");
    taskhead.appendChild(taskheadtext);
    taskactions.classList.add("task-actions");
    checkbtn.innerHTML = "<i class='fa-solid fa-check'>";
    checkbtn.id = "check";
    checkbtn.value = ind;
    checkbtn.addEventListener("click", function(){ check(ind)});
    delbtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    delbtn.value = ind;
    delbtn.id = "del";
    delbtn.addEventListener("click", function(){ del(ind)});
    taskactions.appendChild(checkbtn);
    taskactions.appendChild(delbtn);
    taskheadtext.textContent= element[0];
    taskheadtext.classList.add("head-p");
    taskinput.value = "";
    if (element[1]){
        taskheadtext.classList.add("dashed");
        checkbtn.style.display = "none";
    }
    tasksdiv.appendChild(taskhead);
    tasksdiv.appendChild(taskactions);
    listdiv.prepend(tasksdiv);
}


function check(ind){
    const parent = document.getElementById(String(ind));
    const head = parent.querySelector(".task-head");
    const text = head.querySelector("p");
    text.classList.add("dashed");
    const action = parent.querySelector(".task-actions");
    const ch = action.querySelector("#check");
    ch.style.display = "none";
    tasklist[ind][1] = true;
    localStorage.setItem("tasks",JSON.stringify(tasklist));
}

function del(ind){
    const parent = document.getElementById(String(ind));
    parent.style.display = "none";
    tasklist.pop(ind);
    localStorage.setItem("tasks",JSON.stringify(tasklist));
}
