// ===================================
// Kundenkonto laden
// ===================================



auth.onAuthStateChanged(async function(user){



if(!user){


window.location.href =
"login.html";


return;


}




const uid =
user.uid;



try {



const userDoc =

await db.collection("users")
.doc(uid)
.get();




if(userDoc.exists){



const data =
userDoc.data();




document.getElementById(
"customerID"
).innerHTML =
data.customerID;




document.getElementById(
"customerName"
).innerHTML =
data.name;




document.getElementById(
"customerEmail"
).innerHTML =
data.email;




document.getElementById(
"customerAddress"
).innerHTML =

data.street +
"<br>" +
data.zip +
" " +
data.city;




document.getElementById(
"customerPhone"
).innerHTML =
data.phone;




document.getElementById(
"welcome"
).innerHTML =

"Willkommen zurück, " 
+
data.name;



}



}

catch(error){


console.log(error);


}



});






// ===================================
// Logout
// ===================================


function logout(){



auth.signOut()

.then(()=>{


window.location.href =
"index.html";


});



}
// =========================
// ABMELDEN
// =========================


function logoutUser(){


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




// =========================
// KONTO LÖSCHEN
// =========================


async function deleteAccount(){



const user = auth.currentUser;



if(!user){


alert(
"Kein Benutzer angemeldet."
);


return;


}



let confirmDelete = confirm(

"Möchtest du dein Konto wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden."

);



if(!confirmDelete){

return;

}




try {



// Firestore Kundendaten löschen


await db.collection("users")
.doc(user.uid)
.delete();




// Firebase Auth Konto löschen


await user.delete();




alert(

"Konto wurde vollständig gelöscht."

);



window.location.href="login.html";



}


catch(error){


console.log(error);



alert(

"Fehler beim Löschen: " + error.message

);


}



}