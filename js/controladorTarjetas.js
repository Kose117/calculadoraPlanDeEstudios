
// import './controladorMateria';


// console.log({materias});

window.addEventListener("load", function(){

    let btnAnadir = document.querySelector("#boton");
    btnAnadir.addEventListener("click", crearTarjetas);

    function crearTarjetas()
    {
        let containerCard=document.querySelector(".container-card");
                        
        let cardFather=document.createElement("div");
        cardFather.classList.add("card-father");
        containerCard.appendChild(cardFather);
        
        let card=document.createElement("div");
        card.classList.add("card");
        cardFather.appendChild(card);
        
        let cardFront=document.createElement("div");
        cardFront.classList.add("card-front");
        cardFront.style.backgroundImage= "url('../imagenes/mapu.jpg')";;
        card.appendChild(cardFront);

        let bg=document.createElement("div");
        bg.classList.add("bg");
        cardFront.append(bg);

        let bodyCardFront=document.createElement("div");
        bodyCardFront.classList.add("body-card-front");
        cardFront.append(bodyCardFront);

        let nombreClase=document.createElement("h1");
        nombreClase.setAttribute('id',"Nombreclase");
        nombreClase.innerText="Calculo integral";
        bodyCardFront.appendChild(nombreClase);

        let cardBack=document.createElement("div");
        cardBack.classList.add("card-back");
        cardBack.style.backgroundImage= "url('../imagenes/sorpresa.jpg')";;
        card.appendChild(cardBack);

        let bodyCardBack=document.createElement("div");
        bodyCardBack.classList.add("body-card-back");
        cardBack.append(bodyCardBack);

        let clase=document.createElement("h1");
        clase.classList.add("alejate");
        clase.setAttribute('id',"clase");
        clase.innerText="Clase";
        bodyCardBack.appendChild(clase);

        let nota=document.createElement("h2");
        nota.classList.add("alejate");
        nota.setAttribute('id',"nota");
        nota.innerText="Nota:";
        bodyCardBack.appendChild(nota);

        let profesor=document.createElement("h2");
        profesor.classList.add("alejate");
        profesor.setAttribute('id',"profesor");
        profesor.innerText="Profesor:";
        bodyCardBack.appendChild(profesor);

        let btn=document.createElement("button");
        btn.classList.add("btn",'btn-abrir-popup');
        // btn.setAttribute('id','btn-abrir-popup');
        bodyCardBack.appendChild(btn);

        let span=document.createElement("span");
        span.innerText="Cálculo Diferencial";
        btn.appendChild(span);
        
        // console.log(containerCard);    
        let btnAbrirPopup = document.getElementsByClassName('btn-abrir-popup'),
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
 