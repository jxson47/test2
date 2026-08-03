const cartContainer =
document.getElementById("cartContainer");


const totalPrice =
document.getElementById("totalPrice");


const customerInfo =
document.getElementById("customerInfo");



let currentUser = null;




// ===============================
// Benutzer prüfen
// ===============================


auth.onAuthStateChanged(async function(user){


if(!user){

window.location.href="login.html";

return;

}


currentUser = user;


await loadCustomerData(user.uid);

await loadCart(user.uid);


});







// ===============================
// Kundendaten laden
// ===============================


async function loadCustomerData(uid){


try{


const userDoc = await db.collection("users")
.doc(uid)
.get();



if(userDoc.exists){


const customer = userDoc.data();



if(customerInfo){


customerInfo.innerHTML = `

<h3>
📦 Lieferadresse
</h3>

<p>

<strong>${customer.name || ""}</strong>

<br>

${customer.address || ""}

<br>

${customer.phone || ""}

<br>

${customer.email || ""}

</p>

`;

}



}



}

catch(error){

console.log(error);

}



}









// ===============================
// Warenkorb laden
// ===============================


async function loadCart(uid){


try{


const snapshot = await db.collection("carts")
.doc(uid)
.collection("items")
.get();



cartContainer.innerHTML="";


let total = 0;




if(snapshot.empty){


cartContainer.innerHTML = `

<p>
Dein Warenkorb ist leer.
</p>

`;



totalPrice.innerHTML =
"Gesamt: 0 €";


return;


}







snapshot.forEach(doc=>{


const product = doc.data();



total += 
product.price * product.quantity;




cartContainer.innerHTML += `


<div class="card">


<h3>
${product.name}
</h3>



<p>
Preis:
${product.price} €
</p>



<p>
Menge:
${product.quantity}
</p>



<button onclick="removeItem('${doc.id}')">

❌ Entfernen

</button>



</div>


`;



});





totalPrice.innerHTML =

"Gesamt: " + total + " €";



}


catch(error){

console.log(error);

cartContainer.innerHTML =
"Fehler beim Laden des Warenkorbs";


}



}









// ===============================
// Produkt entfernen
// ===============================


async function removeItem(id){


await db.collection("carts")
.doc(currentUser.uid)
.collection("items")
.doc(id)
.delete();



loadCart(currentUser.uid);


}









// ===============================
// Bestellung abschicken
// ===============================


async function checkout(){


if(!currentUser){

return;

}






const cartSnapshot = await db.collection("carts")
.doc(currentUser.uid)
.collection("items")
.get();





if(cartSnapshot.empty){


alert(
"Warenkorb ist leer"
);


return;


}






const userDoc = await db.collection("users")
.doc(currentUser.uid)
.get();



const customer = userDoc.data();




let products = [];

let total = 0;






cartSnapshot.forEach(doc=>{


const item = doc.data();



products.push({


name:item.name,


price:item.price,


quantity:item.quantity


});



total += 
item.price * item.quantity;



});









await db.collection("orders").add({



customerUID:
currentUser.uid,



customerName:
customer.name || "",



customerEmail:
customer.email || "",



customerAddress:
customer.address || "",



customerPhone:
customer.phone || "",



products:products,



totalPrice:
total,



status:
"Offen",



created:
new Date()



});









// Warenkorb löschen


const items = await db.collection("carts")
.doc(currentUser.uid)
.collection("items")
.get();





items.forEach(doc=>{


doc.ref.delete();


});







alert(
"Bestellung erfolgreich abgeschickt!"
);



window.location.href="konto.html";



}