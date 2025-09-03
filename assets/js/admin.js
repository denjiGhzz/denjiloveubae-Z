const ADMIN_USERNAME = "denji";
const ADMIN_PASSWORD = "1234";

const loginContainer = document.getElementById("loginContainer");
const adminPanel = document.getElementById("adminPanel");
const loginBtn = document.getElementById("loginBtn");

const newBirthdateInput = document.getElementById("newBirthdate");
const newNameInput = document.getElementById("newName");
const newImageInput = document.getElementById("newImage");
const newMessageInput = document.getElementById("newMessage");
const addMessageBtn = document.getElementById("addMessageBtn");

const visitorLogsDiv = document.getElementById("visitorLogs");

let messagesDB = JSON.parse(localStorage.getItem("messagesDB")) || {};
let visitorLogs = JSON.parse(localStorage.getItem("visitorLogs")) || [];

loginBtn.addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    loginContainer.style.display = "none";
    adminPanel.style.display = "block";
    loadVisitorLogs();
    loadVisitorMessages();
    alert("Login successful! Welcome, Admin.");
  } else {
    alert("Incorrect username or password.");
  }
});

addMessageBtn.addEventListener("click", () => {
  const birthdate = newBirthdateInput.value;
  const name = newNameInput.value.trim();
  const image = newImageInput.value.trim();
  const message = newMessageInput.value.trim();

  if (!birthdate || !name || !image || !message) {
    alert("Please fill in all fields.");
    return;
  }

  messagesDB[birthdate] = { name, image, message };
  localStorage.setItem("messagesDB", JSON.stringify(messagesDB));
  alert("Message added successfully!");

  newBirthdateInput.value = "";
  newNameInput.value = "";
  newImageInput.value = "";
  newMessageInput.value = "";
});

function loadVisitorLogs() {
  visitorLogsDiv.innerHTML = "";

  visitorLogs = JSON.parse(localStorage.getItem("visitorLogs")) || [];

  if (visitorLogs.length === 0) {
    visitorLogsDiv.innerHTML = "<p>No visitors yet.</p>";
    return;
  }

  visitorLogs.forEach((log, index) => {
    const p = document.createElement("p");
    p.textContent = `${index + 1}. ${log}`;
    visitorLogsDiv.appendChild(p);
  });
}

function loadVisitorMessages() {
  let visitorMessages = JSON.parse(localStorage.getItem("visitorMessages")) || [];

  if (visitorMessages.length === 0) {
    visitorLogsDiv.innerHTML += "<p>No visitor messages yet.</p>";
    return;
  }

  visitorMessages.forEach((msg, i) => {
    const p = document.createElement("p");
    p.textContent = `${i + 1}. [${msg.birthdate}] (${msg.time}): ${msg.message}`;
    visitorLogsDiv.appendChild(p);
  });
}
