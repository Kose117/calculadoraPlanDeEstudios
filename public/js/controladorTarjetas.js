
// import './controladorMateria';


// console.log({materias});

window.addEventListener("load", function(){
/*---------------------------------crear tarjetas---------------------------------*/ 
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
        cardFront.style.backgroundImage= "url('../images/formula.png')";;
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
        cardBack.style.backgroundImage= "url('../images/')";;
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
            popup = document.querySelector(".popup-father");
    
        // btnAbrirPopup?.addEventListener('click', function(){
        //     overlay.classList.add('active');
        //     popup.classList.add('active');
        //     console.log(overlay);
        // });
    
        for (let index = 0; index < btnAbrirPopup.length; index++) {
            btnAbrirPopup[index].addEventListener('click', function(){
                overlay.classList.add('active');
	            popup.classList.add('active');
            });
        }
    }
    let bodyPopupFront=document.querySelector(".body-popup-front");
    let bodyPopupRight=document.querySelector(".body-popup-right");
    let btnsCerrar = this.document.getElementsByClassName("btn-cerrar-popup");
    btnsCerrar[0].addEventListener("click", function(){
        
        overlay.classList.remove("active");
        this.classList.remove("active");
        
    });
    btnsCerrar[1].addEventListener("click", function(){
        overlay.classList.remove("active");
        this.classList.remove("active");
        popup.classList.remove("active");
        bodyPopupFront.classList.remove("active");
        bodyPopupRight.classList.remove("active");
    });
    
    /*---------------------------------Agregar filas a la tabla---------------------------------*/ 
    let contenido=document.querySelector(".contenido");
    let btnAgregarGrande=this.document.querySelector("#btnAgregarGrande");
    let btnAgregar=this.document.querySelector("#btnAgregar");
    let btnEliminar=this.document.querySelector("#btnEliminar");
    btnEliminar.addEventListener("click",EliminarFilas);
    btnAgregarGrande.addEventListener("click",crearFilasConBoton);
    btnAgregar.addEventListener("click",crearFilas);
    
    function crearFilasConBoton()
    {
        let casilla=document.createElement("div");
        casilla.classList.add("conte");
        casilla.setAttribute('contentEditable',"true");
        contenido.appendChild(casilla);
        
        let casilla1=document.createElement("div");
        casilla1.classList.add("conte");
        casilla1.setAttribute('contentEditable',"true");
        contenido.appendChild(casilla1);
        
        let casilla2=document.createElement("div");
        casilla2.classList.add("conte");
        contenido.appendChild(casilla2);
        
        let botonNotas=document.createElement("button");
        botonNotas.classList.add("btn","btnNotas","btn-animacion");
        casilla2.appendChild(botonNotas);

        let spanbotonNotas=document.createElement("span");
        spanbotonNotas.classList.add("spanNotas");
        spanbotonNotas.innerText="4.5";
        botonNotas.appendChild(spanbotonNotas);
        botonNotas.addEventListener("click",girar);
        
        let tamañoDefinitiva=document.querySelector(".definitiv");
        let estilodefinitiva = window.getComputedStyle(tamañoDefinitiva);
        let tamdefinitiva = parseInt(estilodefinitiva.getPropertyValue('height'));  
        tamañoDefinitiva.style.height=tamdefinitiva+50+"px";
    }
    function crearFilas()
    {
        let casilla=document.createElement("div");
        casilla.classList.add("conte");
        casilla.setAttribute('contentEditable',"true");
        contenido.appendChild(casilla);
        
        let casilla1=document.createElement("div");
        casilla1.classList.add("conte");
        casilla1.setAttribute('contentEditable',"true");
        contenido.appendChild(casilla1);
        
        let casilla2=document.createElement("div");
        casilla2.classList.add("conte");
        casilla2.setAttribute('contentEditable',"true");
        contenido.appendChild(casilla2);
        
        let spanbotonNotas=document.createElement("span");
        spanbotonNotas.classList.add("spanNotas");
        spanbotonNotas.innerText="4.5";
        casilla2.appendChild(spanbotonNotas);
        
        let tamañoDefinitiva=document.querySelector(".definitiv");
        let estilodefinitiva = window.getComputedStyle(tamañoDefinitiva);
        let tamdefinitiva = parseInt(estilodefinitiva.getPropertyValue('height'));  
        tamañoDefinitiva.style.height=tamdefinitiva+50+"px";  
    }
    /*santi si vez esto solo se me ocurre una forma de eliminar las filas, y es hacer un contador general, y el numero que salga ponerselo de id
    a las casillas, y eliminar los ultimos 3 id de las casillas y asi, no se si creas que hay una mejor manera*/
    function EliminarFilas()
    {
        let tamañoDefinitiva=document.querySelector(".definitiv");
        let estilodefinitiva = window.getComputedStyle(tamañoDefinitiva);
        let tamdefinitiva = parseInt(estilodefinitiva.getPropertyValue('height'));  
        if(tamdefinitiva>50)
        {
            tamañoDefinitiva.style.height=tamdefinitiva-50+"px"; 
        }
    }
    function girar()
    {
        popup.classList.add('active');
        bodyPopupFront.classList.add('active');
        bodyPopupRight.classList.add('active');
    }
});
