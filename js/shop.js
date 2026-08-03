// ===================================
// RollerWerkstatt Shop
// ===================================



const productContainer =

document.getElementById(
"productContainer"
);





// Produkte laden


async function loadProducts(){



try {



const snapshot =

await db.collection("products")
.get();




if(snapshot.empty){



productContainer.innerHTML = `

<div class="card">

<h3>
Noch keine Artikel verfügbar
</h3>

<p>
Der Shop wird gerade aufgebaut.
</p>


</div>

`;



return;


}






snapshot.forEach(function(doc){



const product =
doc.data();




productContainer.innerHTML += `


<div class="card">


<h2>

${product.name}

</h2>



<p>

${product.description}

</p>



<p>

Preis:

<strong>

${product.price} €

</strong>

</p>




<button onclick="buyProduct('${doc.id}')">

Kaufen

</button>



</div>


`;




});



}

catch(error){


console.log(error);


}



}







// Bestellung vorbereiten


async function buyProduct(productID){



const user =

auth.currentUser;



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

new Date()



});





alert(

"Bestellung wurde aufgenommen!"

);



}







loadProducts();