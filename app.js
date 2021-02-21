// Grâce à une api et un appel AJAX montrer le cours du bitcoin en temps réel.
function getCours(){
    /* Appel AJAX vers cryptocompare.com */
    var ajax = new XMLHttpRequest();
    console.log("Etat apres new : " + ajax.readyState);

    /* Détection de l'avancement de l'appel AJAX */ 
    ajax.onreadystatechange = function(){
        console.log("Etat a changé et vaut maintenant : " + ajax.readyState);
    }
    
    /* Détéction de la fin d'appel */
    ajax.onload = function(){
        console.log("Appel AJAX terminé");
        console.log("status : " + this.status);
        console.log("response : " + this.response);
        if(this.status == 200){  /* Le service a bien répondu */
            // Convertir le retour JSON
           var json=JSON.parse(this.response);
           var dt = new Date();
           document.querySelector("div#horo").innerHTML="Maj " + dt.toLocaleString();
           var eur = formatMontant(json.EUR);
           document.getElementById("cours").innerHTML=eur + " $euro;";
        }
    }
    /* Récupérer l'API*/
    var url = "https://min-api.cryptocompare.com/data/price?fsym=BTC$tsyms=EUR";
    ajax.open("GET", url, true);
    ajax.send();

    /* Gérer le délai d'expiration */
    ajax.timeout = function(){
        console.log("Le service n'a pas répondu à temps : nouvel essai dans 5 sec");
        setTimeout("getCours", 5000);
    }
}

console.log(getCours());