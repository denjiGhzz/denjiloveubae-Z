// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, doc, setDoc, collection, addDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCTDr-9G3NobcbFsTdKw2HqrbEVaMx5cXM",
  authDomain: "denji-62e31.firebaseapp.com",
  projectId: "denji-62e31",
  storageBucket: "denji-62e31.firebasestorage.app",
  messagingSenderId: "938613666611",
  appId: "1:938613666611:web:911306ad11b52bf0f04446"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const continueBtn = document.getElementById('continueBtn');
const birthdateInput = document.getElementById('birthdate');
birthdateInput.setAttribute('max', new Date().toISOString().split('T')[0]);

continueBtn.addEventListener('click', async () => {
  const birthdate = birthdateInput.value;
  if (!birthdate) return alert("Please enter your birthdate!");

  // Save visitor log
  await addDoc(collection(db, "visitors"), {
    birthdate,
    visitedAt: new Date().toLocaleString()
  });

  localStorage.setItem("userBirthdate", birthdate);
  window.location.href = "message.html";
});
