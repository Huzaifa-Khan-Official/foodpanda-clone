import { app } from "./config.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

let adminId;

const getAdminCredentials = async () => {
    const querySnapshot = await getDocs(collection(db, "adminLogIn"));
    querySnapshot.forEach((doc) => {
        adminId = doc.id;
    });
}

getAdminCredentials();

if (!localStorage.getItem("adminId")) {
    location.href = "./adminSignIn.html";
}
