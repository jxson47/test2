// ===================================
// Registrierung & Login
// ===================================



// Registrierung


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



try {



const userCredential =

await auth.createUserWithEmailAndPassword(
email,
password
);



const uid =
userCredential.user.uid;




// Kundendaten speichern


await db.collection("users")
.doc(uid)
.set({


customerID:

"RW-" +
Date.now(),


name:name,


email:email,


street:street,


zip:zip,


city:city,


phone:phone,


role:"customer",


created:
new Date()



});



alert(
"Konto erfolgreich erstellt!"
);



window.location.href =
"konto.html";



}

catch(error){


alert(error.message);


}



});


}






// Login


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



window.location.href =
"konto.html";



}

catch(error){


alert(error.message);


}



});


}