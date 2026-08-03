// ===================================
// KUNDENKONTO SYSTEM
// ===================================


let accountUser = null;



// ===================================
// LOGIN PRÜFEN
// ===================================


auth.onAuthStateChanged(async function(user){


if(!user){

window.location.href="login.html";

return;

}



accountUser = user;



try{


const userDoc =

await db.collection("users")
.doc(user.uid)
.get();



if(userDoc.exists){


const data = userDoc.data();



const customerID =
document.getElementById("customerID");

if(customerID){

customerID.innerHTML =
data.customerID || user.uid;

}



const customerEmail =
document.getElementById("customerEmail");

if(customerEmail){

customerEmail.innerHTML =
data.email || user.email;

}



const customerName =
document.getElementById("customerName");

if(customerName){

customerName.value =
data.name || "";

}



const customerAddress =
document.getElementById("customerAddress");

if(customerAddress){

customerAddress.value =

(data.street || "") +
" " +
(data.zip || "") +
" " +
(data.city || "");

}



const customerPhone =
document.getElementById("customerPhone");

if(customerPhone){

customerPhone.value =
data.phone || "";

}



const welcome =
document.getElementById("welcome");

if(welcome){

welcome.innerHTML =
"Willkommen zurück, " +
(data.name || "");

}



}


await loadOrders(user.uid);


if(typeof updateCartCount === "function"){

updateCartCount();

}



}

catch(error){


console.log(
"Konto Ladefehler:",
error
);


// KEINE FEHLERMELDUNG MEHR AUF DER SEITE

}



});






// ===================================
// DATEN SPEICHERN
// ===================================


async function saveAccountData(){


if(!accountUser){

showMessage(
"Bitte zuerst anmelden."
);

return;

}



const address =
document.getElementById("customerAddress").value;



const data = {


name:
document.getElementById("customerName").value,


address:address,


phone:
document.getElementById("customerPhone").value,


email:
accountUser.email



};



try{


await db.collection("users")
.doc(accountUser.uid)
.set(data,{merge:true});



showMessage(
"✅ Daten erfolgreich gespeichert."
);



}

catch(error){


console.log(error);


showMessage(
"❌ Fehler beim Speichern."
);


}


}







// ===================================
// BESTELLUNGEN LADEN
// ===================================


async function loadOrders(uid){


const container =
document.getElementById("ordersContainer");


if(!container){

return;

}



container.innerHTML =
"Bestellungen werden geladen...";



try{


const snapshot =

await db.collection("orders")
.where(
"customerUID",
"==",
uid
)
.get();



container.innerHTML="";



if(snapshot.empty){


container.innerHTML = `

<div class="card">

<p>
Noch keine Bestellungen vorhanden.
</p>

</div>

`;


return;


}



snapshot.forEach(doc=>{


const order = doc.data();


let products = "";



if(order.products){


order.products.forEach(product=>{


products += `

<li>

${product.name}

<br>

Menge:
${product.quantity}

<br>

Preis:
${product.price} €

</li>

`;

});


}



container.innerHTML += `


<div class="card">


<h3>
🛒 Bestellung
</h3>



<p>

<strong>Status:</strong>

${order.status || "Offen"}

</p>



<p>

<strong>Gesamt:</strong>

${Number(order.totalPrice || 0).toFixed(2)} €

</p>



<ul>

${products}

</ul>


</div>


`;



});


}

catch(error){


console.log(
"Bestellungen Fehler:",
error
);


container.innerHTML = `

<div class="card">

<p>
Keine Bestellungen konnten geladen werden.
</p>

</div>

`;


}


}






// ===================================
// ABMELDEN
// ===================================


function logout(){


auth.signOut()

.then(()=>{


showMessage(
"✅ Erfolgreich abgemeldet."
);



setTimeout(()=>{


window.location.href="login.html";


},1200);



})


.catch(error=>{


console.log(error);


});


}








// ===================================
// KONTO LÖSCHEN
// ===================================


function deleteAccount(){


const user =
auth.currentUser;



if(!user){

return;

}



confirmMessage(

"Möchtest du dein Konto wirklich löschen?",


async function(){


try{


await db.collection("users")
.doc(user.uid)
.delete();



await user.delete();



showMessage(
"✅ Konto wurde gelöscht."
);



setTimeout(()=>{


window.location.href="login.html";


},1200);



}


catch(error){


console.log(error);


showMessage(
"❌ Konto konnte nicht gelöscht werden."
);


}


}


);


}