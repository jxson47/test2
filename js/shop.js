const categoryContainer =
document.getElementById("categoryContainer");

const subcategoryContainer =
document.getElementById("subcategoryContainer");

const productContainer =
document.getElementById("productContainer");




// ===============================
// Kategorien aus Firebase laden
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

onclick="loadProducts('${doc.id}')">


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


async function loadProducts(subcategory){


productContainer.innerHTML=
"Lade Produkte...";



const snapshot =

await db.collection("products")
.where("subcategory","==",subcategory)
.get();



productContainer.innerHTML="";



if(snapshot.empty){


productContainer.innerHTML=`

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



<button onclick="buyProduct('${doc.id}')">

Kaufen

</button>



</div>


`;



});


}




// ===============================
// Kaufen
// ===============================


async function buyProduct(id){


const user = auth.currentUser;



if(!user){


alert("Bitte zuerst anmelden");

location.href="login.html";

return;


}




const productDoc =

await db.collection("products")
.doc(id)
.get();



const product =
productDoc.data();




await db.collection("orders").add({


customerUID:user.uid,

productID:id,

productName:product.name,

price:product.price,

status:"Offen",

created:new Date()


});



alert("Bestellung wurde aufgenommen!");


}




loadCategories();