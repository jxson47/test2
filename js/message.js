// ===================================
// PROFESSIONELLE WEBSEITEN MELDUNGEN
// ===================================


let confirmCallback = null;

let messageTimer = null;





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






// alten Timer löschen

if(messageTimer){

clearTimeout(messageTimer);

}






// Nur normale Meldungen automatisch schließen

if(type !== "warning" && buttons === ""){



messageTimer = setTimeout(()=>{


hideMessage();


},3000);



}



}









function hideMessage(){



const box =
document.getElementById("messageBox");



if(box){


box.className =
"message-box";


}



if(messageTimer){

clearTimeout(messageTimer);

}


confirmCallback = null;



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