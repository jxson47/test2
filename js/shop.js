// ===================================
// RollerWerkstatt Shop
// Produkte aus Firebase laden
// ===================================


const productContainer =
document.getElementById("productContainer");



async function loadProducts(){


try{


const snapshot =
await db.collection("products").get();



productContainer.innerHTML = "";



if(snapshot.empty){


productContainer.innerHTML = `

<div class="card">

<h3>
Noch keine Produkte vorhanden
</h3>

<p>
Der Shop wird gerade aufgebaut.
</p>

</div>

`;

return;

}




snapshot.forEach((doc)=>{


const product = doc.data();



productContainer.innerHTML += `


<div class="card product-card">


<h2>

${product.name}

</h2>



<p>

${product.description}

</p>



<h3>

${product.price.toFixed(2)} €

</h3>



<button onclick="buyProduct('${doc.id}')">

🛒 Kaufen

</button>



</div>


`;



});



}

catch(error){


console.error(
"Shop Fehler:",
error
);


productContainer.innerHTML =

"Fehler beim Laden der Produkte";


}


}




// Bestellung vorbereiten


async function buyProduct(productID){



const user = auth.currentUser;



if(!user){


alert(
"Bitte zuerst anmelden."
);


window.location.href =
"login.html";


return;


}



const productDoc =

await db.collection("products")
.doc(productID)
.get();



const product =
productDoc.data();




await db.collection("orders")
.add({


customerUID:
user.uid,


product:
product.name,


price:
product.price,


status:
"Offen",


created:
firebase.firestore.FieldValue.serverTimestamp()


});




alert(
"Bestellung wurde gespeichert!"
);



}




loadProducts();
