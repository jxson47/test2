// ===================================
// Kundenkonto laden
// ===================================



auth.onAuthStateChanged(async function(user){



if(!user){


window.location.href =
"login.html";


return;


}




const uid =
user.uid;



try {



const userDoc =

await db.collection("users")
.doc(uid)
.get();




if(userDoc.exists){



const data =
userDoc.data();




document.getElementById(
"customerID"
).innerHTML =
data.customerID;




document.getElementById(
"customerName"
).innerHTML =
data.name;




document.getElementById(
"customerEmail"
).innerHTML =
data.email;




document.getElementById(
"customerAddress"
).innerHTML =

data.street +
"<br>" +
data.zip +
" " +
data.city;




document.getElementById(
"customerPhone"
).innerHTML =
data.phone;




document.getElementById(
"welcome"
).innerHTML =

"Willkommen zurück, " 
+
data.name;



}



}

catch(error){


console.log(error);


}



});






// ===================================
// Logout
// ===================================


function logout(){



auth.signOut()

.then(()=>{


window.location.href =
"index.html";


});



}