const categoryContainer =
document.getElementById("categoryContainer");

const subcategoryContainer =
document.getElementById("subcategoryContainer");

const productContainer =
document.getElementById("productContainer");



const categories = {

"Motor":[
"Zylinderkits",
"Dichtungen",
"Kurbelwellen",
"Kurbelwellenlager",
"Auspuffanlagen",
"Vergaser",
"Ansaugstutzen",
"Membransysteme"
],


"Antrieb":[
"Variomatik",
"Variomatikgewichte",
"Keilriemen",
"Riemenscheiben",
"Kupplungen",
"Kupplungsglocken"
],


"Zündung":[
"Lichtmaschinen",
"Zündkerzen",
"CDI",
"Zündspulen"
]


};





function loadCategories(){


categoryContainer.innerHTML="";


for(let category in categories){


categoryContainer.innerHTML += `


<div class="shop-category"
onclick="openCategory('${category}')">


<h2>
🔧 ${category}
</h2>


<p>
Produkte anzeigen
</p>


</div>


`;

}


}




function openCategory(category){


subcategoryContainer.innerHTML="";

productContainer.innerHTML="";


categories[category].forEach(item=>{


subcategoryContainer.innerHTML += `


<div class="shop-subcategory"
onclick="loadProducts('${item}')">


<h3>
${item}
</h3>


</div>


`;


});


}






async function loadProducts(sub){


productContainer.innerHTML =
"<p>Lade Produkte...</p>";



const snapshot = await db.collection("products")
.where("subcategory","==",sub)
.get();



productContainer.innerHTML="";



if(snapshot.empty){


productContainer.innerHTML=`

<div class="card">

<h3>
Keine Produkte gefunden
</h3>

<p>
Diese Kategorie wird noch aufgebaut.
</p>

</div>

`;

return;

}



snapshot.forEach(doc=>{


let p = doc.data();



productContainer.innerHTML += `


<div class="product-card card">


<img 
src="${p.image}"
class="product-image">


<h2>
${p.name}
</h2>


<p class="category">
${p.category || ""}
</p>


<p>
${p.description}
</p>


<h3>
${p.price} €
</h3>


<button onclick="buyProduct('${doc.id}')">

Kaufen

</button>


</div>


`;



});


}






async function buyProduct(id){


const user = auth.currentUser;


if(!user){

alert("Bitte zuerst anmelden");

location.href="login.html";

return;

}



const product = await db.collection("products")
.doc(id)
.get();



await db.collection("orders").add({

customerUID:user.uid,

productID:id,

productName:product.data().name,

price:product.data().price,

status:"Offen",

created:new Date()

});



alert("Bestellung wurde aufgenommen!");

}



loadCategories();
