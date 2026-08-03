// ===================================
// Kundenkonto laden
// ===================================


auth.onAuthStateChanged(async function(user){


if(!user){

window.location.href="login.html";

return;

}



const uid = user.uid;



try {


const userDoc = await db.collection("users")
.doc(uid)
.get();



if(userDoc.exists){


const data = userDoc.data();



document.getElementById("customerID").innerHTML =
data.customerID || uid;



document.getElementById("customerEmail").innerHTML =
data.email || user.email;



document.getElementById("customerName").value =
data.name || "";



document.getElementById("customerAddress").value =
data.address || "";



document.getElementById("customerPhone").value =
data.phone || "";




document.getElementById("welcome").innerHTML =

"Willkommen zurück, " + 
(data.name || "");




}



}

catch(error){

console.log(error);

}



});







// ===================================
// DATEN SPEICHERN
// ===================================


async function saveAccountData(){



const user = auth.currentUser;



if(!user){

alert("Nicht angemeldet");

return;

}




const updateData = {


name:
document.getElementById("customerName").value,


address:
document.getElementById("customerAddress").value,


phone:
document.getElementById("customerPhone").value



};





try {



await db.collection("users")
.doc(user.uid)
.update(updateData);




alert(
"Daten erfolgreich gespeichert!"
);




}



catch(error){



console.log(error);



alert(
"Fehler beim Speichern: "
+
error.message
);



}



}








// ===================================
// ABMELDEN
// ===================================


function logout(){



auth.signOut()

.then(()=>{


alert(
"Erfolgreich abgemeldet!"
);



window.location.href="login.html";



})

.catch(error=>{


console.log(error);


});



}







// ===================================
// KONTO LÖSCHEN
// ===================================


async function deleteAccount(){



const user = auth.currentUser;



if(!user){

alert(
"Kein Benutzer angemeldet"
);

return;

}





const confirmDelete = confirm(

"Möchtest du dein Konto wirklich löschen?"

);




if(!confirmDelete){

return;

}




try {



await db.collection("users")
.doc(user.uid)
.delete();




await user.delete();




alert(
"Konto wurde vollständig gelöscht."
);



window.location.href="login.html";



}


catch(error){


console.log(error);



alert(

"Fehler beim Löschen: "
+
error.message

);



}



}