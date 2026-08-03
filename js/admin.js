// ===================================
// Admin Bereich
// ===================================



auth.onAuthStateChanged(async function(user){



if(!user){


window.location.href =
"login.html";


return;


}





const uid = user.uid;




const userDoc =

await db.collection("users")
.doc(uid)
.get();




if(!userDoc.exists){


window.location.href =
"index.html";


return;


}




const userData =
userDoc.data();





// Admin Prüfung


if(userData.role !== "admin"){



alert(
"Keine Berechtigung!"
);



window.location.href =
"index.html";


return;


}







document.getElementById(
"adminWelcome"
).innerHTML =


"Willkommen Admin " +
userData.name;





document.getElementById(
"adminPanel"
).style.display =
"block";






loadCustomers();

loadOrders();







});








// ===================================
// Kunden laden
// ===================================


async function loadCustomers(){



const box =

document.getElementById(
"customers"
);




const snapshot =

await db.collection("users")
.get();




box.innerHTML="";





snapshot.forEach(doc=>{


const user =
doc.data();



box.innerHTML += `


<div class="card">


<strong>

${user.name}

</strong>


<br>

ID:
${user.customerID}


<br>

Telefon:
${user.phone}


<br>

Adresse:

${user.street}

${user.zip}

${user.city}


</div>



`;



});



}








// ===================================
// Bestellungen laden
// ===================================


async function loadOrders(){



const box =

document.getElementById(
"orders"
);




const snapshot =

await db.collection("orders")
.get();





box.innerHTML="";





if(snapshot.empty){


box.innerHTML =
"Keine Bestellungen";


return;


}




snapshot.forEach(doc=>{



const order =
doc.data();




box.innerHTML += `


<div class="card">


Produkt:

<strong>
${order.product}
</strong>


<br>


Preis:

${order.price} €


<br>


Status:

${order.status}



</div>



`;




});



}