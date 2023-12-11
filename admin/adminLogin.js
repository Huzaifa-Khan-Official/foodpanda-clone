import { app } from "./config.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
let adminEmail;
let adminPassword;
let adminId;

const getAdminCredentials = async () => {
    const querySnapshot = await getDocs(collection(db, "adminLogIn"));
    querySnapshot.forEach((doc) => {
        adminId = doc.id;
        adminEmail = doc.data().aemail;
        adminPassword = doc.data().apassword;
    });
}

getAdminCredentials();

const adminLoginBtn = document.querySelector("#adminLoginBtn");
const emailInput = document.querySelector("#emailInput");
const passwordInput = document.querySelector("#passwordInput");

adminLoginBtn.addEventListener("click", async () => {
    const emailInputValue = emailInput.value;
    const passwordInputValue = passwordInput.value;
    if ((emailInputValue == "") && (passwordInputValue == "")) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please Fill All Fields!',
        });
    } else if (emailInputValue == "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please Fill The Email Field!',
        });
    } else if (passwordInputValue == "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please Fill The Password Field!',
        });
    } else if ((emailInputValue == adminEmail) && (passwordInputValue == adminPassword)) {
        localStorage.setItem("adminId", adminId);
        location.href = "./admin.html";
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Invalid Login Credentials!',
        });
    }
})

passwordInput.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
        adminLoginBtn.click();
    }
})

