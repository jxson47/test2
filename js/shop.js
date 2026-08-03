// ===============================
// SHOP SYSTEM
// ===============================


const categoryContainer =
document.getElementById("categoryContainer");


const subcategoryContainer =
document.getElementById("subcategoryContainer");


const productContainer =
document.getElementById("productContainer");





// ===============================
// KATEGORIEN LADEN
// ===============================


async function loadCategories(){


if(!categoryContainer){

return;

}


try{


categoryContainer.innerHTML="";


const snapshot =
await db.collection("categories").get();



snapshot.forEach(doc=>{


const category =
doc.data();



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

catch(error){

console.log(error);

}


}







// ===============================
// KATEGORIE ÖFFNEN
// ===============================


async function openCategory(categoryID){



if(!subcategoryContainer){

return;

}



subcategoryContainer.innerHTML="";


if(productContainer){

productContainer.innerHTML="";

}



const snapshot =

await db.collection("categories")
.doc(categoryID)
.collection("subcategories")
.get();



snapshot.forEach(doc=>{


const sub =
doc.data();



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
// PRODUKTE LADEN
// ===============================


async function loadProducts(categoryID,subcategoryID){



if(!productContainer){

return;

}



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

</div>

`;


return;


}



snapshot.forEach(doc=>{


const product =
doc.data();



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

}



}







// ===============================
// PRODUKT IN WARENKORB
// ===============================


async function addToCart(categoryID,subcategoryID,productID){



const user =
auth.currentUser;



if(!user){


window.location.href="login.html";

return;

}





try{



const productDoc =

await db.collection("categories")
.doc(categoryID)
.collection("subcategories")
.doc(subcategoryID)
.collection("products")
.doc(productID)
.get();





if(!productDoc.exists){

console.log("Produkt nicht gefunden");

return;

}





const product =
productDoc.data();





const cartRef =

db.collection("carts")
.doc(user.uid)
.collection("items")
.doc(productID);





const cartItem =
await cartRef.get();





if(cartItem.exists){



const quantity =

cartItem.data().quantity || 1;



await cartRef.update({

quantity: quantity + 1

});



}

else{


await cartRef.set({


name:product.name,


price:product.price,


image:product.image || "",


quantity:1,


added:new Date()


});



}





// KEINE MELDUNG MEHR


if(typeof updateCartCount === "function"){

updateCartCount();

}



}

catch(error){


console.log(
"Fehler beim Warenkorb:",
error
);


}



}







// ===============================
// START
// ===============================


if(typeof auth !== "undefined"){


auth.onAuthStateChanged(()=>{


loadCategories();


});


}