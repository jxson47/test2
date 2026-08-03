const categoryContainer =
document.getElementById("categoryContainer");

const subcategoryContainer =
document.getElementById("subcategoryContainer");

const productContainer =
document.getElementById("productContainer");




// ===============================
// Kategorien laden
// ===============================

async function loadCategories(){


categoryContainer.innerHTML="";


const snapshot =
await db.collection("categories").get();



snapshot.forEach(doc=>{


const category = doc.data();



categoryContainer.innerHTML += `

<div class="shop-category"
onclick="openCategory('${doc.id}')">


<h2>
🔧 ${category.name}
</h2>


<p>
Kategorie öffnen
</p>


</div>

`;


});


}







// ===============================
// Unterkategorien laden
// ===============================


async function openCategory(categoryID){


subcategoryContainer.innerHTML="";

productContainer.innerHTML="";



const snapshot =

await db.collection("categories")
.doc(categoryID)
.collection("subcategories")
.get();




snapshot.forEach(doc=>{


const sub = doc.data();



subcategoryContainer.innerHTML += `


<div class="shop-subcategory"

onclick="loadProducts('${categoryID}','${doc.id}')">


<h3>
${sub.name}
</h3>


</div>


`;



});


}







// ===============================
// Produkte laden
// ===============================


async function loadProducts(categoryID,subcategoryID){


productContainer.innerHTML =
"Lade Produkte...";



try{


const snapshot =

await db.collection("categories")
.doc(categoryID)
.collection("subcategories")
.doc(subcategoryID)
.collection("products")
.get();



productContainer.innerHTML="";



if(snapshot.empty){


productContainer.innerHTML = `

<div class="card">

<h3>
Keine Produkte vorhanden
</h3>


<p>
Diese Kategorie wird noch gefüllt.
</p>

</div>

`;


return;

}




snapshot.forEach(doc=>{


const product = doc.data();



productContainer.innerHTML += `


<div class="product-card">



<img 
class="product-image"
src="${product.image || ''}">



<h2>
${product.name}
</h2>



<p>
${product.description || ""}
</p>



<h3>
${product.price} €
</h3>




<button onclick="addToCart('${categoryID}','${subcategoryID}','${doc.id}')">


🛒 In Warenkorb


</button>



</div>


`;



});


}

catch(error){


console.log(error);


productContainer.innerHTML =
"Fehler beim Laden der Produkte";


}


}








// ===============================
// Produkt in Warenkorb
// ===============================


async function addToCart(categoryID,subcategoryID,productID){


const user =
auth.currentUser;



if(!user){


alert(
"Bitte zuerst anmelden"
);


location.href="login.html";


return;

}





// Produkt holen


const productDoc =

await db.collection("categories")
.doc(categoryID)
.collection("subcategories")
.doc(subcategoryID)
.collection("products")
.doc(productID)
.get();



if(!productDoc.exists){


alert(
"Produkt nicht gefunden"
);


return;


}



const product =
productDoc.data();




// prüfen ob schon im Warenkorb


const cartItem =

await db.collection("carts")
.doc(user.uid)
.collection("items")
.doc(productID)
.get();





if(cartItem.exists){


// Menge erhöhen


let menge =
cartItem.data().quantity || 1;



await db.collection("carts")
.doc(user.uid)
.collection("items")
.doc(productID)
.update({

quantity: menge + 1

});



}

else{


// neu hinzufügen


await db.collection("carts")
.doc(user.uid)
.collection("items")
.doc(productID)
.set({


name:product.name,


price:product.price,


image:product.image || "",


quantity:1,


added:new Date()


});


}





alert(
"Produkt wurde zum Warenkorb hinzugefügt!"
);



}







loadCategories();