// ===================================
// Kundenkonto laden
// ===================================

auth.onAuthStateChanged(async function(user){

if(!user){

window.location.href="login.html";

return;

}


const uid = user.uid;


try{


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
"Willkommen zurück, " + (data.name || "");

}


loadOrders(uid);



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
document.getElementById("customerPhone").value,


email:
user.email



};



try{


await db.collection("users")
.doc(user.uid)
.set(updateData,{merge:true});



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
// BESTELLUNGEN LADEN
// ===================================


async function loadOrders(uid){



const ordersContainer =
document.getElementById("ordersContainer");



ordersContainer.innerHTML =
"Bestellungen werden geladen...";



try{



const snapshot =

await db.collection("orders")
.where("customerUID","==",uid)
.get();




ordersContainer.innerHTML="";




if(snapshot.empty){


ordersContainer.innerHTML = `


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



let productsHTML="";



if(order.products){



order.products.forEach(product=>{


productsHTML += `


<li>

${product.name}

- Menge: ${product.quantity}

- ${product.price} €

</li>


`;


});


}



else if(order.productName){


productsHTML += `


<li>

${order.productName}

- ${order.price} €

</li>


`;



}




ordersContainer.innerHTML += `



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

${order.totalPrice || order.price || 0} €

</p>



<ul>

${productsHTML}

</ul>



</div>



`;



});




}



catch(error){


console.log(error);


ordersContainer.innerHTML = `


<div class="card">

<p>

Fehler beim Laden der Bestellungen.

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

return;

}



const confirmDelete = confirm(

"Möchtest du dein Konto wirklich löschen?"

);



if(!confirmDelete){

return;

}




try{



await db.collection("users")
.doc(user.uid)
.delete();




await user.delete();




alert(
"Konto gelöscht."
);



window.location.href="login.html";



}

catch(error){


console.log(error);



alert(
"Fehler: "
+
error.message
);



}



}