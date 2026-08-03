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



const data = {


name:
document.getElementById("customerName").value,


address:
document.getElementById("customerAddress").value,


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



setTimeout(()=>{

hideMessage();

},2000);



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



const order =
doc.data();



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





<button onclick="cancelOrder('${doc.id}')">


❌ Bestellung stornieren


</button>




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
// BESTELLUNG STORNIEREN
// ===================================


async function cancelOrder(orderID){



const confirmCancel =

confirm(
"Möchtest du diese Bestellung wirklich stornieren?"
);



if(!confirmCancel){

return;

}




try{


const orderRef =

db.collection("orders")
.doc(orderID);




const orderDoc =

await orderRef.get();




if(!orderDoc.exists){

return;

}




const orderData =
orderDoc.data();






await db.collection("cancelledOrders")
.doc(orderID)
.set({


...orderData,


status:"Storniert",


cancelledAt:new Date()



});






await orderRef.delete();






showMessage(
"✅ Bestellung wurde storniert."
);





setTimeout(()=>{


location.reload();


},1200);



}



catch(error){


console.log(
"Stornierung Fehler:",
error
);



showMessage(
"❌ Bestellung konnte nicht storniert werden."
);



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