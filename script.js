const list_container = document.querySelector("#list-container")
const input_box = document.querySelector("#input-container > input")
const progress_bar = document.querySelector("#progress")
const progress_number = document.querySelector("#numbers")
const toggleButton = document.getElementById('theme-toggle');
const rootElement = document.documentElement;


toggleButton.addEventListener('click', () => {
    const currentTheme = rootElement.getAttribute('data-theme');

    if (currentTheme === 'dark') {
        rootElement.removeAttribute('data-theme');
    } else {
        rootElement.setAttribute('data-theme', 'dark');
    }
});


let sat_array = JSON.parse(localStorage.getItem("sat_save") || "[]")
let sun_array = JSON.parse(localStorage.getItem("sun_save") || "[]")
let mon_array = JSON.parse(localStorage.getItem("mon_save") || "[]")
let tue_array = JSON.parse(localStorage.getItem("tue_save") || "[]")
let thur_array = JSON.parse(localStorage.getItem("thu_save") || "[]")
let wed_array = JSON.parse(localStorage.getItem("wed_save") || "[]")
let fri_array = JSON.parse(localStorage.getItem("fri_save") || "[]")


// ============================================================
const list_renderer = (array, div) => {
    array.sort((a, b) => a.time.localeCompare(b.time))
    let i = 0
    const string = array.map((item) => {
        i++
        return `<div class="day-items">
                    <h5>${i} .</h5>
                        <div style="text-align: left;">
                            <h4>${item.task}</h4>
                        </div>
                        <h4>${item.time}</h4>
                        <div style="text-align: right;">
                            <p>${item.desc}</p>
                        </div>
                    </div>`
    }).join("")
    document.querySelector(div).innerHTML = string
}

const add_obj = (task, time, des, array, div ,Name) => {
    let new_obj = {
        task: document.querySelector(`input[name = ${task}]`).value,
        time: document.querySelector(`input[name = ${time}]`).value,
        desc: document.querySelector(`input[name = ${des}]`).value
    }
    if (new_obj.desc && new_obj.time && new_obj.desc) {
        array.push(new_obj)
        list_renderer(array, div)
        document.querySelector(`input[name = ${task}]`).value = ''
        document.querySelector(`input[name = ${time}]`).value = ''
        document.querySelector(`input[name = ${des}]`).value = ''
        SaveArraay(Name , array)
    } else {
        alert("Error! you must write something")
    }
}

const ClearAll = (array , location , Name) => {
    let conf = confirm("Are you sure you wanna clear all tasks?")
    if (conf == true){
        array = []
        SaveArraay(Name , array)
        list_renderer(array , location)
    }
}

const deleteItem = (array , location , Name) => {
    let index = +prompt("Enter the number of the item you wanna delete!")
    if (!(index === "") && index.typeof != "null" && index != 0){
        array.splice((index-1) , 1)
    }
    SaveArraay(Name , array)
    list_renderer(array , location)
}

const SaveArraay = (Name, array) => {
    localStorage.setItem(Name , JSON.stringify(array))
}


// ======================================================
const update_progress = () => {
    const total_task = list_container.children.length
    const completed_tasks = list_container.getElementsByClassName("checked").length
    let percent = Math.round(completed_tasks / total_task * 100) || 0
    progress_bar.style.width = total_task ? `${(completed_tasks / total_task) * 100}%` : "0%"
    progress_number.textContent = percent + '%'
}

function addtask() {
    if (input_box.value === "") {
        alert("You must write something!")
    } else {
        let li = document.createElement("li")
        li.innerHTML = input_box.value
        list_container.appendChild(li)
        let span = document.createElement("span")
        span.innerHTML = 'x'
        li.appendChild(span)
    }
    input_box.value = ""
    update_progress()
    DataSave()
}

list_container.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
        event.target.classList.toggle("checked")
        DataSave()
    } else if (event.target.tagName === "SPAN") {
        event.target.parentElement.remove();
        DataSave()
    }
    update_progress()
    DataSave()
})

function DataSave() {
    localStorage.setItem("TodoList", list_container.innerHTML)
}
const show_task = () => {
    list_container.innerHTML = localStorage.getItem("TodoList")
    update_progress()
}




// ====================================================
list_renderer(sat_array, "#sat-list")
list_renderer(sun_array, "#sun-list")
list_renderer(mon_array, "#mon-list")
list_renderer(tue_array, "#tue-list")
list_renderer(thur_array, "#thu-list")
list_renderer(wed_array, "#wed-list")
list_renderer(fri_array, "#fri-list")
show_task()