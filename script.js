document.addEventListener("DOMContentLoaded", function () {


    // Zurück Button nur auf Unterseiten

    let currentPage = window.location.pathname.split("/").pop();


    let pagesWithoutBack = [
        "",
        "index.html"
    ];


    if(!pagesWithoutBack.includes(currentPage)) {


        let backButton = document.createElement("button");


        backButton.innerHTML = "← Zurück";


        backButton.className = "back-button";


        backButton.onclick = function(){

            window.history.back();

        };


        document.body.appendChild(backButton);

    }




    // Registrierung vorbereiten

    const registerForm =
    document.getElementById("registerForm");



    if(registerForm){


        registerForm.addEventListener("submit", function(e){


            e.preventDefault();



            const customer = {


                name:
                document.getElementById("name").value,


                email:
                document.getElementById("email").value,


                password:
                document.getElementById("password").value,


                address:
                {

                    street:
                    document.getElementById("street").value,


                    zip:
                    document.getElementById("zip").value,


                    city:
                    document.getElementById("city").value

                },


                phone:
                document.getElementById("phone").value


            };



            console.log(customer);



            alert(
            "Konto vorbereitet. Firebase wird als nächstes verbunden."
            );


        });


    }



});




function login(){

alert(
"Login wird später über Firebase aktiviert."
);

}