const cartContainer =
document.getElementById("cartContainer");

const totalPrice =
document.getElementById("totalPrice");


let currentUser = null;


// ===============================
// LOGIN PRÜFEN
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
// LIEFERDATEN LADEN
// ===============================

async function loadCustomerData(uid){


try{


const userDoc =
await db.collection("users")
.doc(uid)
.get();



if(userDoc.exists){


const customer = userDoc.data();



document.getElementById("customerName").value =
customer.name || "";


document.getElementById("customerEmail").value =
customer.email || "";


document.getElementById("customerStreet").value =
customer.street || "";


document.getElementById("customerZip").value =
customer.zip || "";


document.getElementById("customerCity").value =
customer.city || "";


document.getElementById("customerPhone").value =
customer.phone || "";



}


}

catch(error){

console.log(error);

}



}




// ===============================
// LIEFERDATEN SPEICHERN
// ===============================

async function saveDeliveryData(){


const user = auth.currentUser;


if(!user){

alert("Nicht angemeldet");

return;

}



await db.collection("users")
.doc(user.uid)
.set({


name:
document.getElementById("customerName").value,


email:
document.getElementById("customerEmail").value,


street:
document.getElementById("customerStreet").value,


zip:
document.getElementById("customerZip").value,


city:
document.getElementById("customerCity").value,


phone:
document.getElementById("customerPhone").value



},{merge:true});



alert(
"Lieferdaten gespeichert!"
);



}




// ===============================
// WARENKORB LADEN
// ===============================


async function loadCart(uid){


const snapshot = await db.collection("carts")
.doc(uid)
.collection("items")
.get();



cartContainer.innerHTML="";


let total = 0;



if(snapshot.empty){


cartContainer.innerHTML =
"<p>Warenkorb ist leer.</p>";


totalPrice.innerHTML =
"Gesamt: 0 €";


return;


}





snapshot.forEach(doc=>{


const item = doc.data();


total += item.price * item.quantity;



cartContainer.innerHTML += `


<div class="card">


<h3>
${item.name}
</h3>


<p>
Preis:
${item.price} €
</p>



<p>
Menge:
</p>


<button onclick="changeQuantity('${doc.id}',-1)">
➖
</button>


<strong>
${item.quantity}
</strong>


<button onclick="changeQuantity('${doc.id}',1)">
➕
</button>



<br><br>


<button onclick="removeItem('${doc.id}')">

❌ Entfernen

</button>


</div>


`;



});




totalPrice.innerHTML =
"Gesamt: " + total.toFixed(2) + " €";



}




// ===============================
// MENGE ÄNDERN
// ===============================


async function changeQuantity(id, amount){



const ref =
db.collection("carts")
.doc(currentUser.uid)
.collection("items")
.doc(id);



const itemDoc =
await ref.get();



let quantity =
itemDoc.data().quantity;



quantity += amount;



if(quantity <= 0){


await ref.delete();


}

else{


await ref.update({

quantity:quantity

});


}



loadCart(currentUser.uid);



}





// ===============================
// PRODUKT ENTFERNEN
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
// BESTELLUNG ABSCHICKEN
// ===============================


async function checkout(){



await saveDeliveryData();



const userDoc =
await db.collection("users")
.doc(currentUser.uid)
.get();



const customer =
userDoc.data();




const cart =
await db.collection("carts")
.doc(currentUser.uid)
.collection("items")
.get();




let products=[];

let total=0;



cart.forEach(doc=>{


const item = doc.data();



products.push({

name:item.name,

price:item.price,

quantity:item.quantity

});



total += item.price * item.quantity;



});






await db.collection("orders").add({



customerUID:
currentUser.uid,


customerName:
customer.name || "",


customerEmail:
customer.email || "",


customerStreet:
customer.street || "",


customerZip:
customer.zip || "",


customerCity:
customer.city || "",


customerPhone:
customer.phone || "",


products:products,


totalPrice:total,


status:"Offen",


created:new Date()



});






const items =
await db.collection("carts")
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