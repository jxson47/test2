// ===================================
// RollerWerkstatt Haupt Script
// ===================================


// Zurück Button automatisch erstellen

document.addEventListener("DOMContentLoaded", function(){



let currentPage = 
window.location.pathname.split("/").pop();



let noBackPages = [

"",
"index.html"

];



if(!noBackPages.includes(currentPage)){



let backButton = document.createElement("button");



backButton.innerHTML =
"← Zurück";



backButton.className =
"back-button";



backButton.onclick = function(){


history.back();


};



document.body.appendChild(backButton);



}





});




// ===================================
// Später Firebase Login Funktionen
// ===================================



function logout(){


console.log("Logout wird später aktiviert");


}



function checkLogin(){


console.log("Loginprüfung wird später aktiviert");


}