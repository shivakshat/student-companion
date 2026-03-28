fetch("https://api.quotable.io/random")
.then(res => res.json())
.then(data => {
  document.getElementById("quote").innerText = data.content;
  document.getElementById("author").innerText = "- " + data.author;
});
let tasks = [];

function addTask() {
  let task = document.getElementById("task").value;
  let time = document.getElementById("time").value;

  tasks.push({task, time});
  alert("Task Added!");
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