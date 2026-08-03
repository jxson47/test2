// ===================================
// RollerWerkstatt Shop
// Produkte aus Firebase laden
// ===================================


const productContainer = document.getElementById("productContainer");


// Produkte laden

async function loadProducts() {


    try {


        const snapshot = await db
            .collection("products")
            .get();



        if (snapshot.empty) {


            productContainer.innerHTML = `

            <div class="card">

                <h3>
                Noch keine Artikel verfügbar
                </h3>

                <p>
                Der Shop wird gerade aufgebaut.
                </p>

            </div>

            `;

            return;

        }




        productContainer.innerHTML = "";



        snapshot.forEach(function(doc) {


            const product = doc.data();



            productContainer.innerHTML += `


            <div class="card product-card">


                <img 
                src="${product.image || 'bild-fehlt.jpg'}"
                alt="${product.name}"
                class="product-image"
                >



                <h2>

                ${product.name}

                </h2>



                <p>

                ${product.description}

                </p>



                <p class="category">

                Kategorie:
                ${product.category}

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


    catch(error) {


        console.error(
            "Shop Fehler:",
            error
        );


        productContainer.innerHTML = `

        <div class="card">

        <h3>
        Fehler beim Laden des Shops
        </h3>

        </div>

        `;


    }


}





// ===================================
// Bestellung speichern
// ===================================


async function buyProduct(productID) {


    const user = auth.currentUser;



    if(!user) {


        alert(
            "Bitte zuerst anmelden."
        );


        window.location.href =
        "login.html";


        return;

    }




    try {



        const productDoc = await db
        .collection("products")
        .doc(productID)
        .get();



        const product =
        productDoc.data();





        await db.collection("orders")
        .add({



            customerUID:
            user.uid,



            productID:
            productID,



            product:
            product.name,



            price:
            product.price,



            status:
            "Offen",



            created:
            firebase.firestore.FieldValue.serverTimestamp()



        });





        alert(
        "Bestellung wurde aufgenommen!"
        );



    }


    catch(error) {


        console.error(
            "Bestellfehler:",
            error
        );


        alert(
        "Bestellung konnte nicht gespeichert werden."
        );


    }



}




// Shop starten

loadProducts();