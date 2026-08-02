document.addEventListener("DOMContentLoaded", () => {

    let page = window.location.pathname.split("/").pop();


    // Auf index.html KEIN Zurück-Button

    if(page === "index.html" || page === "") {
        return;
    }


    const button = document.createElement("button");

    button.innerHTML = "← Zurück";

    button.className = "back-button";


    button.onclick = () => {

        history.back();

    };


    document.body.prepend(button);


});