// ===================================
// PROFESSIONELLE WEBSEITEN MELDUNGEN
// ===================================


let confirmCallback = null;

let messageTimer = null;

let passwordCallback = null;



// ===================================
// NACHRICHT ANZEIGEN
// ===================================


function showMessage(text, type="info", buttons=""){


const box =
document.getElementById("messageBox");


const messageText =
document.getElementById("messageText");


const messageButtons =
document.getElementById("messageButtons");



if(!box || !messageText){

return;

}



messageText.innerHTML = text;



if(messageButtons){

messageButtons.innerHTML = buttons;

}



box.className =
"message-box show " + type;




if(messageTimer){

clearTimeout(messageTimer);

}




if(type !== "warning" && buttons === ""){


messageTimer = setTimeout(()=>{


hideMessage();


},3000);



}



}



// ===================================
// NACHRICHT SCHLIESSEN
// ===================================


function hideMessage(){


const box =
document.getElementById("messageBox");


if(box){

box.className =
"message-box";

}



const messageButtons =
document.getElementById("messageButtons");


if(messageButtons){

messageButtons.innerHTML="";

}



if(messageTimer){

clearTimeout(messageTimer);

}



confirmCallback = null;

passwordCallback = null;



}



// ===================================
// BESTÄTIGUNG
// ===================================


function confirmMessage(text, callback){


confirmCallback = callback;


showMessage(

text,

"warning",

`

<button onclick="hideMessage()">

Abbrechen

</button>



<button onclick="confirmAction()">

Bestätigen

</button>

`

);


}





function confirmAction(){



if(confirmCallback){


confirmCallback();


}



hideMessage();



}



// ===================================
// PASSWORT ABFRAGE
// ===================================


function passwordMessage(callback){


passwordCallback = callback;



showMessage(

"Bitte gib dein Passwort erneut ein, um dein Konto zu löschen.",

"warning",

`

<input 
id="deletePassword"
type="password"
placeholder="Passwort"
>


<br>


<button onclick="hideMessage()">

Abbrechen

</button>



<button onclick="confirmPassword()">

Bestätigen

</button>

`

);



}




function confirmPassword(){


const input =
document.getElementById("deletePassword");



if(!input || !input.value){


showMessage(
"Bitte Passwort eingeben."
);


return;


}



if(passwordCallback){


passwordCallback(
input.value
);


}



hideMessage();



}