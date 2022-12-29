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

var btnAnadir = this.document.querySelector("#boton");
btnAnadir.addEventListener("click",crearTarjetas)
{

}

boton.add
function crearTarjetas()
{
    var containerCard=document.querySelector(".container-card");
                    
    var cardFather=document.createElement("div");
    cardFather.innerHTML="<div class='card-father'></div>";
    var card=document.createElement("div");
    card.innerHTML=" <div class='card'></div>"
    var cardFront=document.createElement("div");
    //cardFront.innerHTML="<div class='card-front' style='background-image: url(../imagenes/mapu.jpg);'</div>";
    var bg=document.createElement("div");
    bg.innerHTML="<div class='bg'></div>";
    var bodyCardFront=document.createElement("div");
    bodyCardFront.innerHTML="<div class='body-card-front'>";
    var Nombreclase=document.createElement("h1");
    Nombreclase.innerHTML="<h1 id='Nombreclase'>Calculo Integral</h1>";
    var cardBack=document.createElement("div");
    var bodyCardBack=document.createElement("div");
    var clase=document.createElement("h1");
    var nota=document.createElement("h2");
    var profesor=document.createElement("h2"); 
    var btn=document.createElement("button"); 
    //bodyCardFront.appendChild(Nombreclase)
    //cardFront.appendChild(bodyCardFront);
    //cardFront.appendChild(bg);
    card.appendChild(cardFront);
    cardFather.appendChild(card);
    containerCard.appendChild(cardFather);
}
});
