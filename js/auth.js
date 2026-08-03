// ===================================
// AUTH SYSTEM
// Registrierung & Login
// ===================================


// ===================================
// REGISTRIERUNG
// ===================================


const registerForm =
document.getElementById("registerForm");



if(registerForm){


registerForm.addEventListener(
"submit",
async function(e){


e.preventDefault();



const name =
document.getElementById("name").value;


const email =
document.getElementById("email").value;


const password =
document.getElementById("password").value;


const street =
document.getElementById("street").value;


const zip =
document.getElementById("zip").value;


const city =
document.getElementById("city").value;


const phone =
document.getElementById("phone").value;



try{


const userCredential =

await auth.createUserWithEmailAndPassword(
email,
password
);



const uid =
userCredential.user.uid;



await db.collection("users")
.doc(uid)
.set({

customerID:
"RW-" + Date.now(),

name:name,

email:email,

street:street,

zip:zip,

city:city,

phone:phone,

role:"customer",

created:new Date()

});




if(typeof showMessage === "function"){


showMessage(
"✅ Konto erfolgreich erstellt."
);


}
else{


alert(
"Konto erfolgreich erstellt."
);


}




setTimeout(()=>{


window.location.href =
"konto.html";


},1200);



}



catch(error){


if(typeof showMessage === "function"){


showMessage(
"❌ " + error.message
);


}
else{


alert(error.message);


}



}



});


}









// ===================================
// LOGIN
// ===================================


const loginForm =
document.getElementById("loginForm");



if(loginForm){



loginForm.addEventListener(
"submit",
async function(e){


e.preventDefault();



const email =
document.getElementById("loginEmail").value;



const password =
document.getElementById("loginPassword").value;




try{


await auth.signInWithEmailAndPassword(
email,
password
);




if(typeof showMessage === "function"){


showMessage(
"✅ Erfolgreich angemeldet."
);


}
else{


alert(
"Erfolgreich angemeldet."
);


}





setTimeout(()=>{


window.location.href =
"konto.html";


},1000);




}



catch(error){


if(typeof showMessage === "function"){


showMessage(
"❌ " + error.message
);


}
else{


alert(error.message);


}



}



});


}