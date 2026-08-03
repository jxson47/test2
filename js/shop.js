// ======================================
// RollerWerkstatt Shop System
// Firebase Version
// ======================================


const categoryContainer = 
document.getElementById("categoryContainer");


const subcategoryContainer = 
document.getElementById("subcategoryContainer");


const productContainer = 
document.getElementById("productContainer");




// Kategorien

const categories = {


"Motor": {

icon:"🔧",

sub:[

"Zylinderkits",
"Dichtungen",
"Kurbelwellen",
"Kurbelwellenlager",
"Auspuffanlagen",
"Vergaser",
"Ansaugstutzen",
"Membransysteme"

]

},



"Antrieb": {

icon:"⚙️",

sub:[

"Variomatik",
"Variomatikgewichte",
"Keilriemen",
"Riemenscheiben",
"Kupplungen",
"Kupplungsglocken"

]

},



"Zündung": {

icon:"⚡",

sub:[

"Lichtmaschinen",
"Zündkerzen",
"CDI",
"Zündspulen"

]

}


};





// ================================
// Kategorien anzeigen
// ================================


function loadCategories(){


subcategoryContainer.innerHTML="";

productContainer.innerHTML="";


categoryContainer.innerHTML="";



Object.keys(categories).forEach(category=>{


let data = categories[category];



categoryContainer.innerHTML += `


<div class="shop-category"

onclick="openCategory('${category}')">


<h2>

${data.icon} ${category}

</h2>


<p>

Kategorie öffnen

</p>


</div>


`;



});


}






// ================================
// Unterkategorien
// ================================


function openCategory(category){


categoryContainer.innerHTML="";


subcategoryContainer.innerHTML="";


productContainer.innerHTML="";



let back = `

<button class="button"

onclick="loadCategories()">

← Kategorien

</button>

`;



subcategoryContainer.innerHTML += back;



categories[category].sub.forEach(sub=>{


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






// ================================
// Produkte laden
// ================================


async function loadProducts(subcategory){


productContainer.innerHTML =

`

<div class="card">

<h3>

Lade Produkte...

</h3>

</div>

`;





const snapshot = await db.collection("products")

.where("subcategory","==",subcategory)

.get();





productContainer.innerHTML="";



subcategoryContainer.innerHTML += `


<button class="button"

onclick="openCategoryBack()">

← Unterkategorien

</button>


`;





if(snapshot.empty){


productContainer.innerHTML = `


<div class="card">


<h3>

Keine Produkte gefunden

</h3>


<p>

Diese Kategorie wird bald erweitert.

</p>


</div>


`;


return;


}






snapshot.forEach(doc=>{


let product = doc.data();




productContainer.innerHTML += `


<div class="product-card card">



<img 

src="${product.image}"

class="product-image"

onerror="this.src='yamaha-aerox.jpg'"

>




<h2>

${product.name}

</h2>



<p class="category">

${product.category || ""}

</p>



<p>

${product.description}

</p>



<h3>

${Number(product.price).toFixed(2)} €

</h3>



<button onclick="buyProduct('${doc.id}')">

🛒 Kaufen

</button>



</div>


`;



});



}




// ================================
// Zurück zu Unterkategorien
// ================================


function openCategoryBack(){


loadCategories();


}






// ================================
// Bestellung speichern
// ================================


async function buyProduct(productID){



const user = auth.currentUser;



if(!user){


alert(
"Bitte zuerst anmelden!"
);


window.location.href="login.html";


return;


}




const productDoc = await db.collection("products")

.doc(productID)

.get();



const product = productDoc.data();





await db.collection("orders").add({



customerUID:user.uid,


productID:productID,


productName:product.name,


price:product.price,


status:"Offen",


created:new Date()



});





alert(

"Bestellung wurde erfolgreich aufgenommen!"

);



}







// Start

loadCategories();