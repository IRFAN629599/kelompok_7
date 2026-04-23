// LOGIN
function login() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  if (user === "admin" && pass === "123") {
    localStorage.setItem("login", "true");
    window.location.href = "dashboard.html";
  } else {
    alert("Login gagal!");
  }
}

// LOGOUT
function logout() {
  localStorage.removeItem("login");
  window.location.href = "index.html";
}

// CEK LOGIN
if (window.location.pathname.includes("dashboard.html")) {
  if (localStorage.getItem("login") !== "true") {
    window.location.href = "index.html";
  }
}

// TASK
function addTask() {
  let input = document.getElementById("taskInput");
  let task = input.value;

  if (task === "") return;

  let li = document.createElement("li");
  li.innerHTML = task + " <button onclick='deleteTask(this)'>Hapus</button>";

  document.getElementById("taskList").appendChild(li);

  saveTasks();
  input.value = "";
}

// HAPUS TASK
function deleteTask(btn) {
  btn.parentElement.remove();
  saveTasks();
}

// SIMPAN KE LOCAL STORAGE
function saveTasks() {
  let tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push(li.innerText.replace("Hapus", "").trim());
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// LOAD TASK
window.onload = function () {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    let li = document.createElement("li");
    li.innerHTML = task + " <button onclick='deleteTask(this)'>Hapus</button>";
    document.getElementById("taskList")?.appendChild(li);
  });
};