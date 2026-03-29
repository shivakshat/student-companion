fetch("https://api.quotable.io/random")
.then(res => res.json())
.then(data => {
  document.getElementById("quote").innerText = data.content;
  document.getElementById("author").innerText = "- " + data.author;
})
.catch(err => {
  console.log("Quote API failed");
});
let tasks = [];

function addTask() {
  console.log("Button clicked");

  let task = document.getElementById("task").value;
  let time = document.getElementById("time").value;

  console.log("Sending:", task, time);

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
    loadTasks(); // refresh UI
  })
  .catch(err => console.log("Error:", err));
}
setInterval(() => {
  let now = new Date().toTimeString().slice(0,5);

  tasks.forEach(t => {
    if(t.time === now){
      alert("Time for: " + t.task);
    }
  });
}, 1000);

function searchTopic(){
  let topic = document.getElementById("topic").value;
  window.open("https://www.google.com/search?q=" + topic, "_blank");
}

function addSchedule(){
  let task = document.getElementById("scheduleTask").value;
  let time = document.getElementById("scheduleTime").value;

  let li = document.createElement("li");
  li.innerText = time + " - " + task;

  document.getElementById("scheduleList").appendChild(li);
}
function loadTasks() {
  fetch("https://student-backend-3kbm.onrender.com/get_tasks/user1")
  .then(res => res.json())
  .then(data => {
    let list = document.getElementById("scheduleList");
    list.innerHTML = "";

    data.forEach(t => {
      let li = document.createElement("li");
      li.innerText = t.time + " - " + t.task;
      list.appendChild(li);
    });
  })
  .catch(err => console.log(err));
}
window.onload=loadTasks;
document.getElementById("addBtn").addEventListener("click", addTask);
