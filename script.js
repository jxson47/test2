// ===============================
// Firebase Konfiguration
// ===============================

const firebaseConfig = {
    apiKey: "AIzaSyC90htVTaTMSaTb9xbqpEaEL_dRZOJt-K8",
    authDomain: "webseite-roller.firebaseapp.com",
    projectId: "webseite-roller",
    storageBucket: "webseite-roller.firebasestorage.app",
    messagingSenderId: "889692196344",
    appId: "1:889692196344:web:598cc494ee4c45fd221a0d"
};

// Firebase starten
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();


// ===============================
// Webseite
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    // Zurück Button nur auf Unterseiten

    let currentPage = window.location.pathname.split("/").pop();

    let pagesWithoutBack = [
        "",
        "index.html"
    ];

    if (!pagesWithoutBack.includes(currentPage)) {

        let backButton = document.createElement("button");

        backButton.innerHTML = "← Zurück";

        backButton.className = "back-button";

        backButton.onclick = function () {
            window.history.back();
        };

        document.body.appendChild(backButton);
    }

    // Registrierung

    const registerForm = document.getElementById("registerForm");

    if (registerForm) {

        registerForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const customer = {

                name: document.getElementById("name").value,

                email: document.getElementById("email").value,

                password: document.getElementById("password").value,

                street: document.getElementById("street").value,

                zip: document.getElementById("zip").value,

                city: document.getElementById("city").value,

                phone: document.getElementById("phone").value

            };


            auth.createUserWithEmailAndPassword(
                customer.email,
                customer.password
            )

            .then((userCredential) => {

                const uid = userCredential.user.uid;

                return db.collection("users").doc(uid).set({

                    name: customer.name,

                    email: customer.email,

                    street: customer.street,

                    zip: customer.zip,

                    city: customer.city,

                    phone: customer.phone

                });

            })

            .then(() => {

                alert("Konto erfolgreich erstellt!");

                window.location.href = "login.html";

            })

            .catch((error) => {

                alert(error.message);

            });

        });

    }

});


// ===============================
// Login
// ===============================

function login() {

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;


    auth.signInWithEmailAndPassword(email, password)

        .then(() => {

            window.location.href = "shop.html";

        })

        .catch((error) => {

            alert(error.message);

        });

}