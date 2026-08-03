// ===================================
// ADMIN BEREICH
// ===================================


// ===============================
// ADMIN PRÜFEN
// ===============================

auth.onAuthStateChanged(async function(user){


if(!user){

window.location.href="login.html";

return;

}



try{


const userDoc =
await db.collection("users")
.doc(user.uid)
.get();



if(!userDoc.exists){

window.location.href="index.html";

return;

}



const userData =
userDoc.data();



if(userData.role !== "admin"){


showMessage(
"❌ Keine Berechtigung!"
);


setTimeout(()=>{

window.location.href="index.html";

},1200);


return;


}




const welcome =
document.getElementById("adminWelcome");


const panel =
document.getElementById("adminPanel");



if(welcome){

welcome.innerHTML =
"Willkommen Admin " +
(userData.name || "");

}



if(panel){

panel.style.display="block";

}



loadCustomers();

loadOrders();



}

catch(error){

console.log(error);

}



});







// ===================================
// KUNDEN LADEN
// ===================================


async function loadCustomers(){


const box =
document.getElementById("customers");



if(!box){

return;

}



const snapshot =
await db.collection("users").get();



box.innerHTML="";



snapshot.forEach(doc=>{


const user =
doc.data();



box.innerHTML += `


<div class="card">


<h3>
👤 ${user.name || "Kein Name"}
</h3>


<p>

🆔 ${user.customerID || doc.id}

</p>


<p>

📧 ${user.email || ""}

</p>


<p>

📞 ${user.phone || ""}

</p>


<p>

📍 ${user.street || ""}

<br>

${user.zip || ""}

${user.city || ""}

</p>


</div>


`;


});


}








// ===================================
// BESTELLUNGEN LADEN
// ===================================


async function loadOrders(){


const box =
document.getElementById("orders");



if(!box){

return;

}



const snapshot =
await db.collection("orders")
.get();



box.innerHTML="";



if(snapshot.empty){


box.innerHTML =
"Keine Bestellungen vorhanden.";


return;


}





snapshot.forEach(doc=>{


const order =
doc.data();



let productsHTML="";



if(order.products){


order.products.forEach(product=>{


productsHTML += `


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



box.innerHTML += `


<div class="card">


<h3>
🛒 Bestellung
</h3>



<p>

<strong>Kunde:</strong>

${order.customerName || ""}

</p>



<p>

<strong>E-Mail:</strong>

${order.customerEmail || ""}

</p>




<p>

<strong>Status:</strong>

${order.status || "Offen"}

</p>




<p>

<strong>Gesamt:</strong>

${order.totalPrice || 0} €

</p>



<ul>

${productsHTML}

</ul>



</div>


`;



});



}