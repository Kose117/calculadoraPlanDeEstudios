
import { agregar_fila } from "../helpers/functions.js";

window.addEventListener("load", function(){
/*---------------------------------crear tarjetas---------------------------------*/ 
    let btnAnadir = document.querySelector("#boton-tarjeta");
    let btnCubo= document.querySelector("#boton-cubo");
    btnAnadir.addEventListener("click", crearTarjetas);
    btnCubo.addEventListener("click", crearCubo);
    
    let containerCard=document.querySelector(".container-card");
    const template=this.document.querySelector("#cubo-template").content;
    const fragmente=this.document.createDocumentFragment();
    function crearCubo()
    {
        const clone=template.cloneNode(true);
        fragmente.appendChild(clone);
        containerCard.appendChild(fragmente);
    }
    function crearTarjetas()
    {
                        
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
        bodyCardBack.appendChild(btn);

        let span=document.createElement("span");
        span.innerText="Cálculo Diferencial";
        btn.appendChild(span);
        
        // console.log(containerCard);    
        let btnAbrirPopup = document.getElementsByClassName('btn-abrir-popup'),
            overlay = document.querySelector(".overlay"),
            popup = document.querySelector(".popup-father");
    
        for (let index = 0; index < btnAbrirPopup.length; index++) {
            btnAbrirPopup[index].addEventListener('click', function(){
                overlay.classList.add('active');
	            document.getElementsByClassName("popup-father")[0].classList.add("active")
            });
        }
    }

    let bodyPopupFront=document.querySelector(".body-popup-front");
    let bodyPopupRight=document.querySelector(".body-popup-right");
    let btnsCerrar = this.document.getElementsByClassName("btn-cerrar-popup");
    
    btnsCerrar[0].addEventListener("click", function(){
        overlay.classList.remove("active");
        this.classList.remove("active");
        document.getElementsByClassName("popup-father")[0].classList.remove("active");
        clearSelection(tabla);
    });

    btnsCerrar[1].addEventListener("click", function(){
        overlay.classList.remove("active");
        this.classList.remove("active");
        popup.classList.remove("active");
        document.getElementsByClassName("popup-father")[0].classList.remove("active");
        bodyPopupFront.classList.remove("active");
        bodyPopupRight.classList.remove("active");
        clearSelection(tabla);
    });
            
    
    /*---------------------------------Agregar filas a la tabla---------------------------------*/ 
    let tabla = document.querySelector("#tabla-materias"),
        rIndex = -1;
    
    const hasFocus = element => (element === document.activeElement);
    
    const clearSelection = (table) => {
        for(var i = 1; i < table.rows.length; i++) {
            table.rows[i].style.backgroundColor = "";
        }
        rIndex = -1;
    }

    const updateLastRowEvents = (table, index=table.rows.length-1) => {
        const row = table.rows[index];
        row.addEventListener("click", () => {
            clearSelection(table);
            if (hasFocus(document.getElementById('definitiva')))
                return
            rIndex = row.rowIndex;

            row.style.backgroundColor = "lightblue";
            
        });
    }

    const btnAgregarGrande=this.document.querySelector("#btnAgregarGrande");
    const btnAgregar=this.document.querySelector("#btnAgregar");
    const btnEliminar=this.document.querySelector("#btnEliminar");

    const addDefinitiva = (table, nota = 0) => {
        const definitiva = this.document.createElement('td');
        definitiva.contentEditable = 'true';
        definitiva.id = 'definitiva';
        definitiva.rowSpan = '100%';
        definitiva.textContent = nota;
        table.rows[1].appendChild(definitiva);
    }

    btnAgregarGrande.addEventListener("click", () => {
        
        agregar_fila(tabla, 'td contenteditable="true"', ['', '',
            `<button class="btn btnNotas btn-animacion"><span class="spanNotas">0</span></button>`]
        );

        if (tabla.rows.length == 2) addDefinitiva(tabla);
        
        const btns = this.document.getElementsByClassName('btn btnNotas btn-animacion');
        btns[btns.length-1].addEventListener('click', girar);
        
        updateLastRowEvents(tabla);
    });
    
    btnAgregar.addEventListener("click", () => {
        agregar_fila(tabla, 'td contenteditable="true"', ['', '', '0']);

        if (tabla.rows.length == 2) addDefinitiva(tabla);
        
        updateLastRowEvents(tabla);
    });
    
    btnEliminar.addEventListener("click", () => {
        if (tabla.rows.length <= 1) 
            return
        if (rIndex == 1){
            const notaDefinitiva = this.document.querySelector('#definitiva').textContent;
            tabla.deleteRow(rIndex);
            addDefinitiva(tabla, notaDefinitiva);
        }
        else tabla.deleteRow(rIndex);
        rIndex = -1;
    });

    const girar = () => {
        popup.classList.add('active');
        bodyPopupFront.classList.add('active');
        bodyPopupRight.classList.add('active');
    }
});
