// ==========================
// Automatischer Zurück Button
// ==========================


document.addEventListener("DOMContentLoaded", () => {


let page = window.location.pathname.split("/").pop();



if(page !== "index.html" && page !== ""){


const button = document.createElement("button");


button.innerHTML="← Zurück";


button.className="back-button";


button.onclick=()=>{

history.back();

};


document.body.prepend(button);


}





// Registrierung vorbereiten


const registerForm = document.getElementById("registerForm");


if(registerForm){


registerForm.addEventListener("submit", function(e){


e.preventDefault();



let user = {


name:
document.getElementById("name").value,


email:
document.getElementById("email").value,


password:
document.getElementById("password").value,


street:
document.getElementById("street").value,


zip:
document.getElementById("zip").value,


city:
document.getElementById("city").value,


phone:
document.getElementById("phone").value



};





console.log("Benutzerdaten:", user);



alert(
"Registrierung vorbereitet. Firebase wird als nächstes verbunden."
);



});

}


});





// Login Platzhalter

function login(){


alert(
"Login wird als nächstes mit Firebase verbunden."
);


}