const messagesDB = JSON.parse(localStorage.getItem("messagesDB")) || {};
const birthdate = localStorage.getItem("userBirthdate");
const container = document.getElementById("birthdayMessage");
const sendMessageBtn = document.getElementById("sendMessageBtn");

if (birthdate && messagesDB[birthdate]) {
  const data = messagesDB[birthdate];

  container.innerHTML = `
    <h2>${data.name}</h2>
    <img src="${data.image}" alt="${data.name}" style="border-radius: 50%; width: 150px; height: 150px; margin: 20px 0;" />
    <p>${data.message}</p>
  `;
} else if (birthdate) {
  container.innerHTML = `
    <h2>Welcome!</h2>
    <p>We don't have a message for your birthday yet, but you can leave a message for Denji below!</p>
  `;
} else {
  container.innerHTML = `<p>Error: No birthdate found. Please go back and enter your birthdate.</p>`;
}

sendMessageBtn.addEventListener("click", () => {
  const visitorMessage = document.getElementById("visitorMessage").value.trim();
  if (!visitorMessage) {
    alert("Please write a message before sending.");
    return;
  }

  let visitorMessages = JSON.parse(localStorage.getItem("visitorMessages")) || [];

  visitorMessages.push({
    birthdate: birthdate,
    message: visitorMessage,
    time: new Date().toLocaleString()
  });

  localStorage.setItem("visitorMessages", JSON.stringify(visitorMessages));

  alert("Thank you for your message!");
  document.getElementById("visitorMessage").value = "";
});
