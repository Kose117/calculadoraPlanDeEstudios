
import './controladorMateria';

// console.log({materias});

/*  

var containerCard=document.querySelector(".container-card");
var cardFather=document.querySelector(".card-father");
var card=document.querySelector(".card");
var cardFront=document.querySelector(".card-front");
var bg=document.querySelector(".bg");
var bodyCardFront=document.querySelector(".body-card-front");
var cardBack=document.querySelector(".card-back");
var bodyCardBack=document.querySelector(".body-card-back");
var clase=document.querySelector("#clase");
var nota=document.querySelector("#nota");  
var profesor=document.querySelector("#profesor");  
var btn=document.querySelector(".btn"); 
*/

window.addEventListener("load", function(){

    var btnAnadir = document.querySelector("#boton");
    btnAnadir.addEventListener("click", crearTarjetas);

    function crearTarjetas()
    {
        var containerCard=document.querySelector(".container-card");
                        
        var cardFather=document.createElement("div");
        cardFather.classList.add("card-father");
        containerCard.appendChild(cardFather);
        
        var card=document.createElement("div");
        card.classList.add("card");
        cardFather.appendChild(card);
        
        var cardFront=document.createElement("div");
        cardFront.classList.add("card-front");
        cardFront.style.backgroundImage= "url('../imagenes/mapu.jpg')";;
        card.appendChild(cardFront);

        var bg=document.createElement("div");
        bg.classList.add("bg");
        cardFront.append(bg);

        var bodyCardFront=document.createElement("div");
        bodyCardFront.classList.add("body-card-front");
        cardFront.append(bodyCardFront);

        var nombreClase=document.createElement("h1");
        nombreClase.setAttribute('id',"Nombreclase");
        nombreClase.innerText="Calculo integral";
        bodyCardFront.appendChild(nombreClase);

        var cardBack=document.createElement("div");
        cardBack.classList.add("card-back");
        cardBack.style.backgroundImage= "url('../imagenes/sorpresa.jpg')";;
        card.appendChild(cardBack);

        var bodyCardBack=document.createElement("div");
        bodyCardBack.classList.add("body-card-back");
        cardBack.append(bodyCardBack);

        var clase=document.createElement("h1");
        clase.classList.add("alejate");
        clase.setAttribute('id',"clase");
        clase.innerText="Clase";
        bodyCardBack.appendChild(clase);

        var nota=document.createElement("h2");
        nota.classList.add("alejate");
        nota.setAttribute('id',"nota");
        nota.innerText="Nota:";
        bodyCardBack.appendChild(nota);

        var profesor=document.createElement("h2");
        profesor.classList.add("alejate");
        profesor.setAttribute('id',"profesor");
        profesor.innerText="Profesor:";
        bodyCardBack.appendChild(profesor);

        var btn=document.createElement("button");
        btn.classList.add("btn",'btn-abrir-popup');
        // btn.setAttribute('id','btn-abrir-popup');
        bodyCardBack.appendChild(btn);

        var span=document.createElement("span");
        span.innerText="Cálculo Diferencial";
        btn.appendChild(span);
        
        // console.log(containerCard);    
        var btnAbrirPopup = document.getElementsByClassName('btn-abrir-popup'),
            overlay = document.querySelector(".overlay"),
            popup = document.querySelector(".popup"),
            btnCerrarPopup = document.getElementsByClassName('btn-cerrar-popup');
    
        // btnAbrirPopup?.addEventListener('click', function(){
        //     overlay.classList.add('active');
        //     popup.classList.add('active');
        //     console.log(overlay);
        // });
    
        for (let index = 0; index < btnAbrirPopup.length; index++) {
            btnAbrirPopup[index].addEventListener('click', function(){
                overlay.classList.add('active');
                console.log(popup);
            });
        }
    }

    /* TODO: SANTI MIERDAAAA NO ENTIENDO NADAAAA */
});
 