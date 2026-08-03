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


Object.keys(categories).forEach(category=>{


categoryContainer.innerHTML += `


<div class="shop-category"

onclick="openCategory('${category}')">


<h2>

🔧 ${category}

</h2>


<p>
Kategorie öffnen
</p>


</div>


`;

});


}





function openCategory(category){


subcategoryContainer.innerHTML="";

productContainer.innerHTML="";



categories[category].forEach(sub=>{


subcategoryContainer.innerHTML += `


<div class="shop-subcategory"

onclick="loadProducts('${sub}')">


<h3>

${sub}

</h3>


</div>


`;

});


}







async function loadProducts(sub){


productContainer.innerHTML=
"Lade Produkte...";



const snapshot = await db.collection("products")
.where("subcategory","==",sub)
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
src="${product.image}">



<h2>
${product.name}
</h2>


<p>
${product.description}
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







async function buyProduct(id){


const user = auth.currentUser;


if(!user){

alert("Bitte zuerst anmelden");

location.href="login.html";

return;

}




const doc = await db.collection("products")
.doc(id)
.get();



const product = doc.data();




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