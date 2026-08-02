// Automatischer Zurück-Button

document.addEventListener("DOMContentLoaded", () => {

    const button = document.createElement("button");

    button.innerHTML = "← Zurück";

    button.className = "back-button";

    button.onclick = () => {
        history.back();
    };

    document.body.prepend(button);


});



// Test Login / Registrierung Platzhalter

function login(){

    alert("Login-System wird später mit Firebase verbunden.");

}


function register(){

    alert("Registrierung wird später mit Firebase verbunden.");

}