// 🔹 Quote API (safe)
fetch("https://api.quotable.io/random")
.then(res => res.json())
.then(data => {
  document.getElementById("quote").innerText = data.content;
  document.getElementById("author").innerText = "- " + data.author;
})
.catch(err => {
  console.log("Quote API failed");
});

// 🔹 Store tasks globally (for alarm)
let tasks = [];

// 🔹 Add Task
function addTask() {
  console.log("Button clicked");

  let task = document.getElementById("task").value;
  let time = document.getElementById("time").value;

  if(task === "" || time === ""){
    alert("Enter task and time");
    return;
  }

  fetch("https://student-backend-3kbm.onrender.com/add_task", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: "user1",
      task: task,
      time: time
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log("Response:", data);
    alert(data.message);

    // clear input
    document.getElementById("task").value = "";
    document.getElementById("time").value = "";

    loadTasks();
  })
  .catch(err => console.log("Error:", err));
}

// 🔹 Alarm system (uses tasks from backend)
setInterval(() => {
  let now = new Date().toTimeString().slice(0,5);

  tasks.forEach(t => {
    if(t.time === now){
      alert("Time for: " + t.task);
    }
  });
}, 1000);

// 🔹 Search
function searchTopic(){
  let topic = document.getElementById("topic").value;
  window.open("https://www.google.com/search?q=" + topic, "_blank");
}

// 🔹 Schedule (local only)
function addSchedule(){
  let task = document.getElementById("scheduleTask").value;
  let time = document.getElementById("scheduleTime").value;

  let li = document.createElement("li");
  li.innerText = time + " - " + task;

  document.getElementById("scheduleList").appendChild(li);
}

// 🔹 Load tasks from backend
function loadTasks() {
  fetch("https://student-backend-3kbm.onrender.com/get_tasks/user1")
  .then(res => res.json())
  .then(data => {

    let list = document.getElementById("scheduleList");
    list.innerHTML = "";

    data.forEach(t => {
      let li = document.createElement("li");

      // text
      let text = document.createElement("span");
      text.innerText = t.time + " - " + t.task;

      // delete button
      let delBtn = document.createElement("button");
      delBtn.innerText = "Delete";
      delBtn.style.marginLeft = "10px";

      delBtn.onclick = function() {
        deleteTask(t.task, t.time);
      };

      li.appendChild(text);
      li.appendChild(delBtn);
      list.appendChild(li);
    });
  })
  .catch(err => console.log(err));
}

// 🔹 Delete task
function deleteTask(task, time) {
  fetch("https://student-backend-3kbm.onrender.com/delete_task", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: "user1",
      task: task,
      time: time
    })
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
    loadTasks();
  })
  .catch(err => console.log(err));
}

// 🔹 Ensure DOM is loaded before adding event
document.addEventListener("DOMContentLoaded", function() {
  loadTasks();
  document.getElementById("addBtn").addEventListener("click", addTask);
});
