// ===================================
// GLOBALER WARENKORB ZÄHLER
// ===================================


async function updateCartCount(){



const cartCount =
document.getElementById("cartCount");



if(!cartCount){

return;

}




if(
typeof auth === "undefined" ||
typeof db === "undefined"
){

cartCount.innerHTML = "0";

return;

}




const user =
auth.currentUser;



if(!user){


cartCount.innerHTML = "0";


return;


}




try{



const snapshot =

await db.collection("carts")
.doc(user.uid)
.collection("items")
.get();




let count = 0;




snapshot.forEach(doc=>{


const item =
doc.data();



count += Number(item.quantity || 0);



});




cartCount.innerHTML = count;



}



catch(error){



console.log(
"Warenkorb-Zähler Fehler:",
error
);



cartCount.innerHTML = "0";



}



}









// ===================================
// LOGIN STATUS ÜBERWACHEN
// ===================================


if(typeof auth !== "undefined"){



auth.onAuthStateChanged(function(user){



if(user){


updateCartCount();


}

else{


const cartCount =
document.getElementById("cartCount");



if(cartCount){


cartCount.innerHTML = "0";


}



}



});



}