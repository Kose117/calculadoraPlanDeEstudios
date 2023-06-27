
import { agregar_fila } from "../helpers/functions.js";
import { putClase } from "../helpers/requests.js";

window.addEventListener("load", async() => {
/*---------------------------------crear tarjetas---------------------------------*/ 
    let btnAnadir = document.querySelector("#boton-tarjeta");
    let btnCubo= document.querySelector("#boton-cubo");
    btnAnadir.addEventListener("click", crearTarjetas);
    btnCubo.addEventListener("click", creacion);
    
    const templateCubo=document.querySelector("#cubo-template").content;
    let containerGeneral=document.querySelector(".container-general");
    let containerCardPapa=document.querySelector(".containerCard-papa");
    let containerCard=document.querySelector(".containerCard");
    
    let contadorContainer=0;
    let contadorCubos=0;
    
    let btnMostrarcartas=document.getElementsByClassName("botonCubo");
    
    function creacion()
    {
        if(contadorCubos<3)
        {
            let containerCubos=document.getElementById(`${contadorContainer}`);
            crearCubo(containerCubos);
            contadorCubos=contadorCubos+1;
        }
        else{
            contadorCubos=0;
            contadorContainer++;
            crearContainer(contadorContainer);
            let containerCubos=document.getElementById(`${contadorContainer}`);
            crearCubo(containerCubos);
            contadorCubos=contadorCubos+1;
        }
    }
    function crearContainer(contador)
    {
        let seccion=document.createElement("section");
        containerGeneral.appendChild(seccion);

        let contenedor=document.createElement("div");
        contenedor.classList.add("container-cubo")
        contenedor.setAttribute('id',`${contador}`);
        
        seccion.appendChild(contenedor);
    }
    
    function crearCubo(containerCubos) {
        const fragmente=document.createDocumentFragment();
        const clone=templateCubo.cloneNode(true);
        fragmente.appendChild(clone);
        containerCubos?.appendChild(fragmente);
        for (let index = 0; index < btnMostrarcartas.length; index++) {
            btnMostrarcartas[index].addEventListener('click', function(){
                containerCardPapa.classList.add('active');
                containerGeneral.classList.add("active");
            });
        }
       
    }
    
    function crearTarjetas() {
                        
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
        nombreClase.innerText="Calculo integral";
        bodyCardFront.appendChild(nombreClase);

        let cardBack=document.createElement("div");
        cardBack.classList.add("card-back");
        // cardBack.style.backgroundImage= "url('../images/')";
        card.appendChild(cardBack);

        let bodyCardBack=document.createElement("div");
        bodyCardBack.classList.add("body-card-back");
        cardBack.append(bodyCardBack);

        let clase=document.createElement("h1");
        clase.classList.add("alejate");
        clase.innerText="Clase";
        bodyCardBack.appendChild(clase);

        let nota=document.createElement("h2");
        nota.classList.add("alejate");
        nota.innerText="Nota:";
        bodyCardBack.appendChild(nota);

        let profesor=document.createElement("h2");
        profesor.classList.add("alejate");
        profesor.innerText="Profesor:";
        bodyCardBack.appendChild(profesor);

        let btn=document.createElement("button");
        btn.classList.add("btn",'btn-abrir-popup');
        bodyCardBack.appendChild(btn);

        let span=document.createElement("span");
        span.innerText="Cálculo Diferencial";
        btn.appendChild(span);
           
        let btnAbrirPopup = document.getElementsByClassName('btn-abrir-popup'),
            overlay = document.querySelector(".overlay");
    
        for (let index = 0; index < btnAbrirPopup.length; index++) {
            btnAbrirPopup[index].addEventListener('click', function(){
                overlay.classList.add('active');
	            document.getElementsByClassName("popup-father")[0].classList.add("active")
            });
        }
    }

    let bodyPopupFront=document.querySelector(".body-popup-front");
    let bodyPopupRight=document.querySelector(".body-popup-right");
    let btnsCerrar = document.getElementsByClassName("btn-cerrar-popup");
    let btnIzquierda= document.getElementById("regresar");
    
    btnsCerrar[0].addEventListener("click", function(){
        overlay.classList.remove("active");
        this.classList.remove("active");
        document.getElementsByClassName("popup-father")[0].classList.remove("active");
       
    });
    
    btnsCerrar[1].addEventListener("click", function(){
        overlay.classList.remove("active");
        this.classList.remove("active");
        popup.classList.remove("active");
        document.getElementsByClassName("popup-father")[0].classList.remove("active");
        bodyPopupFront.classList.remove("active");
        bodyPopupRight.classList.remove("active");
       
    });
    btnsCerrar[2].addEventListener("click", function(){
        containerCardPapa.classList.remove('active');
        containerGeneral.classList.remove("active");
    });
    btnIzquierda.addEventListener("click",function()
    {
        popup.classList.remove("active");
        bodyPopupRight.classList.remove("active");
        bodyPopupFront.classList.remove("active");
        document.getElementsByClassName("popup-father")[0].classList.add("active") 
        tables[1].rows[rIndex].style.backgroundColor = "white";
        rIndex = -1;
    })       
    
    /*---------------------------------Agregar filas a la tabla---------------------------------*/ 
    const tables = [document.querySelector("#tabla-materias"), document.querySelector("#tabla-materias2")];
    let rIndexs = [-1, -1];

    const hasFocus = element => (element === document.activeElement);


    const updateLastRowEvents = (i, index = tables[i].rows.length - 1) => {
        const row = tables[i].rows[index];
      
        row.addEventListener("click", () => {
          
            if (hasFocus(document.getElementById('definitiva'))) {
                return;
            }
            const row_tmp = tables[i].rows[rIndexs[i]];
            if (row_tmp) {
                row_tmp.style.backgroundColor = "white";
            }
            rIndexs[i] = row.rowIndex;
            row.style.backgroundColor = "lightblue";
        });
    };
      

    const addDefinitiva = (table, nota) => {
        const definitiva = document.createElement('td');
        definitiva.contentEditable = 'true';
        definitiva.id = 'definitiva';
        definitiva.rowSpan = '100%';
        definitiva.textContent = nota !== undefined ? nota : '0';
        table.rows[1].appendChild(definitiva);
    }

    const actualizarPorcentajes = (table) => {
        const rowCount = table.rows.length - 1; // Excluir la fila de encabezado
      
        let totalPorcentaje = 0;
        for (let i = 1; i < table.rows.length; i++) {
            const row = table.rows[i];
            const porcentajeCell = row.cells[1]; // Índice 1 corresponde a la columna de porcentajes
            const porcentaje = (100 / rowCount).toFixed(2);
            porcentajeCell.textContent = porcentaje;
            totalPorcentaje += parseFloat(porcentaje);
        }
      };
      
      const agregarFila = (table, cellContent, cellValues) => {
        const row = table.insertRow(-1);
        for (let i = 0; i < cellValues.length; i++) {
            const cell = row.insertCell(i);
            cell.setAttribute('contenteditable', 'true');
            cell.innerHTML = cellContent;
            cell.textContent = cellValues[i];
        }
        actualizarPorcentajes(table);
    };

    const btnAgregar = document.querySelector("#btnAgregar");
    const btnEliminar = document.querySelector("#btnEliminar");
    const btnAgregar2 = document.querySelector("#btnAgregar2");
    const btnEliminar2 = document.querySelector("#btnEliminar2");

    btnAgregar.addEventListener("click", () => {
        const table = tables[0];
        agregarFila(table, 'td contenteditable="true"', ['', '', '0']);

        if (table.rows.length == 2) addDefinitiva(table);

        updateLastRowEvents(0);
    });

    btnEliminar.addEventListener("click", () => {
        const table = tables[0];
        if (table.rows.length <= 1)
            return;
        if (rIndexs[0] == 1) {
            const notaDefinitiva = document.querySelector('#definitiva').textContent;
            table.deleteRow(rIndexs[0]);
            addDefinitiva(table, notaDefinitiva);
        } else {
            table.deleteRow(rIndexs[0]);
        }
        rIndexs[0] = -1;
    });

    btnAgregar2.addEventListener("click", () => {
        const table = tables[1];
        agregarFila(table, 'td contenteditable="true"', ['', '', '0']);

        if (table.rows.length == 2) addDefinitiva(table);

        updateLastRowEvents(1);
    });

    btnEliminar2.addEventListener("click", () => {
        const table = tables[1];
        if (table.rows.length <= 1)
            return;
        if (rIndexs[1] == 1) {
            const notaDefinitiva = document.querySelector('#definitiva').textContent;
            table.deleteRow(rIndexs[1]);
            addDefinitiva(table, notaDefinitiva);
        } else {
            table.deleteRow(rIndexs[1]);
        }
        rIndexs[1] = -1;
    });
    
    btnAgregarGrande.addEventListener("click", () => {
        
        agregar_fila(tables[0], 'td contenteditable="true"', ['', '',
            `<button class="btn btnNotas btn-animacion"><span class="spanNotas">0</span></button>`]
        );

        if (tables[0].rows.length == 2) addDefinitiva(tables[0]);
        
        const btns = document.getElementsByClassName('btn btnNotas btn-animacion');
        btns[btns.length-1].addEventListener('click', girar);
        
        updateLastRowEvents(0);
        actualizarPorcentajes(tables[0]);
    });

    const girar = () => {
        popup.classList.add('active');
        bodyPopupFront.classList.add('active');
        bodyPopupRight.classList.add('active');
        tables[0].rows[rIndexs[0]].style.backgroundColor = 'white';
        rIndexs[0] = -1;
    }
    /*---------------------------------Calculos tabla---------------------------------*/ 
    const calcularNotas = (table) => {
        const rowCount = table.rows.length;
        let acumulador = 0;
      
        for (let i = 1; i < rowCount; i++) {
          const row = table.rows[i];
          const notasCell = parseFloat(row.cells[1].textContent); // Índice 1 corresponde a la columna de notas
          const porcentajeCell = parseFloat(row.cells[2].textContent); // Índice 2 corresponde a la columna de porcentaje
      
          const notaCalculada = (notasCell / 100) * porcentajeCell;
          acumulador += notaCalculada;
          console.log("acumula:"+acumulador);
        }
      
        addDefinitiva(table, acumulador.toFixed(2));
      };
      
      calcularNotas(tables[0]);
      
});
  