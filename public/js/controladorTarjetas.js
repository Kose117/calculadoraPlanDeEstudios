
import { agregar_fila } from "../helpers/functions.js";
import { getCarrera } from "../helpers/requests.js";


window.addEventListener("load", async() => {
/*---------------------------------crear tarjetas---------------------------------*/
    const carrera = await getCarrera();

    let btnAnadir = document.querySelector("#boton-tarjeta");
    let btnCubo= document.querySelector("#boton-cubo");
    btnAnadir.addEventListener("click", crearTarjetas);
    btnCubo.addEventListener("click", creacionCubos);
    
    
    let templateCubo=document.querySelector("#cubo-template").content;
    let templateTarjeta=document.querySelector("#tarjeta-template").content;
    let containerGeneral=document.querySelector(".container-general");
    let containerCardPapa=document.querySelector(".containerCard-papa");
    let containerCard=document.querySelector(".containerCard");
    let btnCreate = document.getElementsByClassName('btnCreate');
    let fromCenter = document.getElementsByClassName('from-center');
    
    
    let contadorContainerCubos=0;
    let contadorCubos=0;
    let contadorSemestres=0;
    
    const btnMostrarcartas=document.getElementsByClassName("botonCubo");
    
    function creacionCubos() {
        if (contadorCubos<3) {
            let containerCubos=document.getElementById(`${contadorContainerCubos}`);
            crearCubo(containerCubos);
            contadorCubos=contadorCubos+1;

        } else {
            contadorCubos=0;
            contadorContainerCubos++;
            crearContainerCubo(contadorContainerCubos);
            let containerCubos=document.getElementById(`${contadorContainerCubos}`);
            crearCubo(containerCubos);
            contadorCubos=contadorCubos+1;
        }
    }

    function crearContainerCubo(contador) {
        let seccion=document.createElement("section");
        containerGeneral.appendChild(seccion);

        let contenedor=document.createElement("div");
        contenedor.classList.add("container-cubo")
        contenedor.setAttribute('id',`${contador}`);
        console.log("a");
        seccion.appendChild(contenedor);
    }
    
    function crearCubo(containerCubos) {
        contadorSemestres=contadorSemestres+1;
        const fragmente=document.createDocumentFragment();
        const clone=templateCubo.cloneNode(true);
        const carasCubo = clone.querySelectorAll('.caras');
        carasCubo.forEach((cara) => {
            cara.textContent = "Semestre "+(contadorSemestres);
        });
        fragmente.appendChild(clone);
        containerCubos?.appendChild(fragmente);
        for (let index = 0; index < btnMostrarcartas.length; index++) {
            btnMostrarcartas[index].addEventListener('click', () => {
                containerCardPapa.classList.add('active');
                containerGeneral.classList.add("active");
                btnCreate[0].textContent="Semestre "+(index+1);
                btnCreate[0].classList.add('active');
                fromCenter[0].classList.add('active');
                
            });
        }
    }
    
    function crearTarjetas(valorNombre, valorNota, valorProfesor) {
                        
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
        nombreClase.innerText = valorNombre;
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
        nota.innerText=`Nota: ${valorNota}`;
        bodyCardBack.appendChild(nota);

        let profesor=document.createElement("h2");
        profesor.classList.add("alejate");
        profesor.innerText=`Profesor: ${valorProfesor}`;
        bodyCardBack.appendChild(profesor);

        let btn=document.createElement("button");
        btn.classList.add("btn",'btn-abrir-popup');
        bodyCardBack.appendChild(btn);

        let span = document.createElement("span");
        span.innerText = valorNombre;
        btn.appendChild(span);
           
        let btnAbrirPopup = document.getElementsByClassName('btn-abrir-popup'),
            overlay = document.querySelector(".overlay");
    
        for (let index = 0; index < btnAbrirPopup.length; index++) {
            btnAbrirPopup[index].addEventListener('click', () => {
                overlay.classList.add('active');
	            document.getElementsByClassName("popup-father")[0].classList.add("active")
            });
        }
    }

    let bodyPopupFront=document.querySelector(".body-popup-front");
    let bodyPopupRight=document.querySelector(".body-popup-right");
    let btnsCerrar = document.getElementsByClassName("btn-cerrar-popup");
    let btnIzquierda= document.getElementById("regresar");
    
    btnsCerrar[0].addEventListener("click", () => {
        overlay.classList.remove("active");
        this.classList.remove("active");
        document.getElementsByClassName("popup-father")[0].classList.remove("active");
        
        console.log(tables[0].rows[0].cells[0].textContent)
       
    });
    
    btnsCerrar[1].addEventListener("click", () => {
        overlay.classList.remove("active");
        this.classList.remove("active");
        popup.classList.remove("active");
        document.getElementsByClassName("popup-father")[0].classList.remove("active");
        bodyPopupFront.classList.remove("active");
        bodyPopupRight.classList.remove("active");
       
    });

    btnsCerrar[2].addEventListener("click", () => {
        containerCardPapa.classList.remove('active');
        containerGeneral.classList.remove("active");
        btnCreate[0].classList.remove('active');
        fromCenter[0].classList.remove('active');
        btnCreate[0].textContent="Crear Semestre";
    });

    btnIzquierda.addEventListener("click", () => {
        popup.classList.remove("active");
        bodyPopupRight.classList.remove("active");
        bodyPopupFront.classList.remove("active");
        document.getElementsByClassName("popup-father")[0].classList.add("active");
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
        if (table.rows.length > 1) {
            const definitiva = table.rows[1].querySelector('#definitiva');
            if (definitiva) {
                if (nota !== undefined) {
                    definitiva.textContent = nota;
                }
            } else {
                const newDefinitiva = document.createElement('td');
                newDefinitiva.contentEditable = 'true';
                newDefinitiva.id = 'definitiva';
                newDefinitiva.rowSpan = '100%';
                newDefinitiva.textContent = nota !== undefined ? nota : '0';
                table.rows[1].appendChild(newDefinitiva);
            }
        } else {
            console.error('La tabla o la fila no están definidas correctamente.');
        }   
    }
      

    const actualizarPorcentajes = (table) => {
        const rowCount = table.rows.length - 1; // Excluir la fila de encabezado
      
        let totalPorcentaje = 0;
        for (let i = 1; i < table.rows.length; i++) {
            const row = table.rows[i];
            const porcentajeCell = row.cells[1]; // Índice 1 corresponde a la columna de porcentajes
            const porcentaje = (100 / rowCount).toFixed(0);
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

        if (table.rows.length >= 2) calcularNotas(table);

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

        if (table.rows.length >= 2) calcularNotas(table);

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

        if (tables[0].rows.length == 2)
            addDefinitiva(tables[0]);
        
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
        if (table.rows.length > 0) {
            const rowCount = table.rows.length;
            let acumulador = 0;
            for (let i = 1; i < rowCount; i++) {
                const row = table.rows[i];
                if (row.cells.length >= 3) {
                    const notasCell = parseFloat(row.cells[2].textContent); // Índice 1 corresponde a la columna de notas
                    const porcentajeCell = parseFloat(row.cells[1].textContent); // Índice 2 corresponde a la columna de porcentaje
                
                    const notaCalculada = (notasCell / 100) * porcentajeCell;
                    acumulador += notaCalculada;
                    console.log("acumula:"+acumulador);
                } else {
                    console.error('La fila no tiene suficientes celdas.');
                }
            }
        
            addDefinitiva(table, acumulador.toFixed(2));
        } else {
            console.error('La tabla no está definida o no tiene suficientes filas.');
        }
    }

    for (const table of tables) {
        table.addEventListener('input', (event) => {
            const target = event.target;
            const cellIndex = target.cellIndex;
        
            // Verificar si la celda pertenece a la columna 2
            if (cellIndex === 2 || cellIndex === 1) {
                calcularNotas(table);
            }
        });
    } 
    
});
  