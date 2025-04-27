let inputval = document.querySelector('#input');
let allTasks = JSON.parse(localStorage.getItem('hamra'))||[];
let list = document.querySelector('#list');
let add = document.querySelector('#add');
let filter = document.querySelector('#filter');
add.addEventListener('click',()=>{
   if(inputval.value===''){
    return;
   }
   else{
    let newtasks = {
        id:Date.now(),
        textval:inputval.value,
        done:false
    };
    allTasks.unshift(newtasks);
    inputval.value = '';
    save();
    render();
   }
})
// save to localstorage
function save(){
    localStorage.setItem("hamra",JSON.stringify(allTasks));
}
 // delte task 
function deleteTask(id){
     allTasks = allTasks.filter(task=>task.id!==id);
     save();
     render();
}

// render list 
function render(){
    list.innerHTML = '';
    let filterdata = allTasks;
    if (filter.value === 'Done') {
        filterdata = allTasks.filter(task => task.done);
    } else if (filter.value === 'Pending') {
        filterdata = allTasks.filter(task => !task.done);
    }
    filterdata.forEach(element => {
        const li = document.createElement('li');
        li.innerHTML = `
        <span id="span">${element.textval}</span>
        <button id='buttons1'>✅Done</button>
        <button id='buttons2' onclick={deleteTask(${element.id})}>🚮Delete</button>
        `
        list.appendChild(li);
    });
}
render();