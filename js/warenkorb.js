// ===============================
// WARENKORB SYSTEM
// ===============================


const cartContainer =
document.getElementById("cartContainer");


const totalPrice =
document.getElementById("totalPrice");


let currentUser = null;





// ===============================
// LOGIN
// ===============================


auth.onAuthStateChanged(async function(user){


if(!user){

window.location.href="login.html";

return;

}


currentUser = user;


await loadCustomerData(user.uid);

await loadCart(user.uid);

updateCartCount();


});







// ===============================
// LIEFERDATEN LADEN
// ===============================


async function loadCustomerData(uid){


const userDoc =
await db.collection("users")
.doc(uid)
.get();



if(userDoc.exists){


const customer =
userDoc.data();



if(document.getElementById("customerName"))

document.getElementById("customerName").value =
customer.name || "";



if(document.getElementById("customerEmail"))

document.getElementById("customerEmail").value =
customer.email || "";



if(document.getElementById("customerStreet"))

document.getElementById("customerStreet").value =
customer.street || "";



if(document.getElementById("customerZip"))

document.getElementById("customerZip").value =
customer.zip || "";



if(document.getElementById("customerCity"))

document.getElementById("customerCity").value =
customer.city || "";



if(document.getElementById("customerPhone"))

document.getElementById("customerPhone").value =
customer.phone || "";



}


}








// ===============================
// LIEFERDATEN SPEICHERN
// ===============================


async function saveDeliveryData(){


const user =
auth.currentUser;



if(!user){

showMessage(
"Bitte zuerst anmelden."
);

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




showMessage(
"✅ Lieferdaten wurden gespeichert."
);



}








// ===============================
// WARENKORB LADEN
// ===============================


async function loadCart(uid){


const snapshot =

await db.collection("carts")
.doc(uid)
.collection("items")
.get();




if(!cartContainer){

return;

}



cartContainer.innerHTML="";


let total = 0;





if(snapshot.empty){


cartContainer.innerHTML =
"<p>Dein Warenkorb ist leer.</p>";



if(totalPrice)

totalPrice.innerHTML =
"Gesamt: 0 €";



updateCartCount();


return;


}







snapshot.forEach(doc=>{


const item =
doc.data();



total +=
Number(item.price) * Number(item.quantity);





cartContainer.innerHTML += `


<div class="card">


<h3>

${item.name}

</h3>



<p>

Preis:

${item.price} €

</p>





<div class="quantity-control">


<button onclick="changeQuantity('${doc.id}',-1)">

−

</button>




<span class="quantity-number">

${item.quantity}

</span>





<button onclick="changeQuantity('${doc.id}',1)">

+

</button>



</div>





<button class="remove-button"

onclick="removeItem('${doc.id}')">


❌ Entfernen


</button>



</div>


`;



});





if(totalPrice)

totalPrice.innerHTML =

"Gesamt: " + total.toFixed(2) + " €";




updateCartCount();



}









// ===============================
// MENGE ÄNDERN
// ===============================


async function changeQuantity(id, amount){



if(!currentUser){

return;

}



const ref =

db.collection("carts")
.doc(currentUser.uid)
.collection("items")
.doc(id);





const itemDoc =
await ref.get();




if(!itemDoc.exists){

return;

}




let quantity =

itemDoc.data().quantity || 1;




quantity += amount;





if(quantity <= 0){


await ref.delete();



showMessage(
"Artikel wurde entfernt."
);


}

else{


await ref.update({

quantity:quantity

});



}




await loadCart(currentUser.uid);


updateCartCount();



}









// ===============================
// ARTIKEL ENTFERNEN
// ===============================


async function removeItem(id){



if(!currentUser){

return;

}




await db.collection("carts")
.doc(currentUser.uid)
.collection("items")
.doc(id)
.delete();





showMessage(
"Artikel wurde entfernt."
);





await loadCart(currentUser.uid);


updateCartCount();



}









// ===============================
// BESTELLUNG
// ===============================


async function checkout(){



if(!currentUser){

showMessage(
"Bitte anmelden."
);

return;

}





await saveDeliveryData();





const userDoc =

await db.collection("users")
.doc(currentUser.uid)
.get();




const customer =
userDoc.data() || {};





const cart =

await db.collection("carts")
.doc(currentUser.uid)
.collection("items")
.get();





if(cart.empty){


showMessage(
"Dein Warenkorb ist leer."
);


return;


}





let products=[];

let total=0;





cart.forEach(doc=>{


const item =
doc.data();




products.push({


name:item.name,


price:item.price,


quantity:item.quantity



});




total +=

Number(item.price) *

Number(item.quantity);



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





await Promise.all(

items.docs.map(doc=>

doc.ref.delete()

)

);






updateCartCount();





showMessage(
"✅ Bestellung erfolgreich abgeschickt."
);




setTimeout(()=>{


window.location.href="konto.html";


},1200);



}