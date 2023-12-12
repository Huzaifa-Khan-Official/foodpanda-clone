import { app } from "./config.js";
import { getFirestore, collection, getDocs, onSnapshot, addDoc, query, orderBy, } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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


const prevCategList = document.querySelector("#prevCategList");
const prevCategHeadDiv = document.querySelector(".prevCategHeadDiv");

const getAllCategories = () => {
    onSnapshot(collection(db, "categories"), (data) => {
        if (data.size) {
            prevCategHeadDiv.style.display = "block";
            data.docChanges().forEach((category) => {
                if (category.type === "removed") {
                    let delCategory = document.getElementById(category.doc.id);
                    if (delCategory) {
                        delCategory.remove();
                    }
                } else if (category.type === "added") {
                    const categoryName = category.doc.data().category;
                    prevCategList.innerHTML += `
                    <li>${categoryName}</li>
                    `;
                }
            })
        }
    })
}

getAllCategories();

const addCategoryBtn = document.querySelector("#addCategoryBtn");
const addCatInp = document.getElementById("addCatInp");


addCategoryBtn.addEventListener("click", async () => {
    $('#addCategoryModal').modal('hide');
    try {
        const addCategory = addCatInp.value
        if (addCategory == "") {
            errorPara.innerText = "Please fill input field!";
            setTimeout(() => {
                errorPara.innerHTML = "";
            }, 3000);
        } else {
            $('#addTodoModal').modal('hide');
            const docRef = await addDoc(collection(db, "categories"), {
                category: addCategory,
            });
            Swal.fire({
                icon: 'success',
                title: 'Congrats',
                text: 'Successfully add your category!',
            });
        }
    } catch (e) {
        console.error("Error adding document: ", e);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Couldn't Add The Category!`,
        });
    }
    addCatInp.value = "";
})

addCatInp.addEventListener("keypress", (e)=> {
    if (e.key == "Enter") {
        addCategoryBtn.click();
    };
});