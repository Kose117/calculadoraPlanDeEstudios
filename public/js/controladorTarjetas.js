
import { agregar_fila } from "../helpers/functions.js";
import { getCarrera, putClase } from "../helpers/requests.js";


window.addEventListener("load", async() => {
/*---------------------------------crear tarjetas---------------------------------*/
    const carrera = await getCarrera();
    const ponderado = document.getElementById("ponderado");
    calcularPonderado(carrera, ponderado);

    let semestreActual = null;
    let idMateriaActual = null;
    let notaActual = null;
   
    let btnCubo = document.querySelector("#boton-cubo");

    btnCubo.addEventListener("click", () => {
        creacionCubos();
        carrera.semestres[btnMostrarcartas.length] = [];
    });
    
    
    let templateCubo = document.querySelector("#cubo-template").content;
    // let templateTarjeta = document.querySelector("#tarjeta-template").content;
    let containerGeneral = document.querySelector(".container-general");
    let containerCardPapa = document.querySelector(".containerCard-papa");
    let containerCard = document.querySelector(".containerCard");
    let btnCreate = document.getElementsByClassName('btnCreate');
    let fromCenter = document.getElementsByClassName('from-center');
    
    
    let contadorContainerCubos = 0;
    let contadorCubos = 0;
    let contadorSemestres = 0;
    
    const btnMostrarcartas = document.getElementsByClassName("botonCubo");

    for (const _ in carrera.semestres) {
        creacionCubos();
    }

    
    function creacionCubos() {
        if (contadorCubos<3) {
            let containerCubos = document.getElementById(`${contadorContainerCubos}`);
            crearCubo(containerCubos);
            contadorCubos = contadorCubos+1;

        } else {
            contadorCubos = 0;
            contadorContainerCubos++;
            crearContainerCubo(contadorContainerCubos);
            let containerCubos = document.getElementById(`${contadorContainerCubos}`);
            crearCubo(containerCubos);
            contadorCubos = contadorCubos+1;
        }
    }

    function crearContainerCubo(contador) {
        let seccion = document.createElement("section");
        containerGeneral.appendChild(seccion);

        let contenedor = document.createElement("div");
        contenedor.classList.add("container-cubo")
        contenedor.setAttribute('id',`${contador}`);
        // console.log("a");
        seccion.appendChild(contenedor);
    }
    
    function crearCubo(containerCubos) {
        contadorSemestres = contadorSemestres + 1;
        const fragmente = document.createDocumentFragment();
        const clone = templateCubo.cloneNode(true);
       
        const carasCubo = clone.querySelectorAll('.caras');
        carasCubo.forEach((cara) => {
            cara.textContent = "Semestre " + (contadorSemestres);
        });
      
        fragmente.appendChild(clone);
        containerCubos?.appendChild(fragmente);

        for (let index = 0; index < btnMostrarcartas.length; index++) {
            btnMostrarcartas[index].addEventListener('click', () => {
                containerCardPapa.classList.add('active');
                containerGeneral.classList.add("active");
                btnCreate[0].textContent = "Semestre " + (index + 1);
                btnCreate[0].classList.add('active');
                fromCenter[0].classList.add('active');
                calcularPromedioSemestre(carrera, index, ponderado);
                borrarTarjetas();
                crearTarjetas(carrera, index);
                semestreActual = index;
            });
        }
    }
    
    function crearTarjeta(valorNombre, valorNota, valorProfesor, id, departamento) {
                        
        let cardFather = document.createElement("div");
        cardFather.classList.add("card-father");
        containerCard.appendChild(cardFather);
        
        let card = document.createElement("div");
        card.classList.add("card");
        cardFather.appendChild(card);
        
        let cardFront = document.createElement("div");
            cardFront.classList.add("card-front");
        if (departamento === "Matemáticas" || departamento === "Física") {
            cardFront.style.backgroundImage = "url('../images/formula.png')";
        } else if (departamento === "Filosofía" || departamento === "Centro de formación teológica" || departamento === "Derecho") {
            cardFront.style.backgroundImage = "url('../images/filo.png')";
        } else if (departamento === "Sistemas" || departamento === "Industrial" || departamento === "Electrónica") {
            cardFront.style.backgroundImage = "url('../images/sistemas.jpeg')";
        } else {
            cardFront.style.backgroundImage = "url('../images/nose.jpg')";
        }
        card.appendChild(cardFront);

        const bg = document.createElement("div");
        bg.classList.add("bg");
        cardFront.append(bg);

        const bodyCardFront = document.createElement("div");
        bodyCardFront.classList.add("body-card-front");
        cardFront.append(bodyCardFront);

        const nombreClase = document.createElement("h1");
        nombreClase.innerText = valorNombre;
        bodyCardFront.appendChild(nombreClase);

        const cardBack = document.createElement("div");
        cardBack.classList.add("card-back");
        // cardBack.style.backgroundImage= "url('../images/')";
        card.appendChild(cardBack);

        const bodyCardBack = document.createElement("div");
        bodyCardBack.classList.add("body-card-back");
        cardBack.append(bodyCardBack);

        const clase = document.createElement("h1");
        clase.classList.add("alejate");
        clase.innerText = `Clase: ${id}`;
        bodyCardBack.appendChild(clase);

        const nota = document.createElement("h2");
        nota.classList.add("alejate");
        nota.innerText = `Nota: ${valorNota}`;
        bodyCardBack.appendChild(nota);

        const profesor = document.createElement("h2");
        profesor.classList.add("alejate");
        profesor.innerText = `Profesor: ${valorProfesor}`;
        bodyCardBack.appendChild(profesor);

        const btn = document.createElement("button");
        btn.setAttribute("id", id);
        btn.classList.add("btn",'btn-abrir-popup');
        bodyCardBack.appendChild(btn);

        const span = document.createElement("span");
        span.innerText = valorNombre;
        btn.appendChild(span);
        
        btn.addEventListener('click', abrirNotas);
    }

    const abrirNotas = (event) => {
        const overlay = document.querySelector(".overlay");
        overlay.classList.add('active');

        tables[0].innerHTML = `<tr>
            <th>Nombre</th>
            <th>%</th>
            <th>Notas</th>
            <th>Definitiva</th>
        </tr>`;
        
        const btn = event.target.tagName === 'BUTTON'
            ? event.target
            : event.target.parentElement;
        
        idMateriaActual = btn.id;

        tables[0].setAttribute('id_materia', idMateriaActual);

        const materia = carrera.semestres[semestreActual].materias.find(
            (materia) => materia.id === idMateriaActual
        );
        
        const nota = materia.nota;
        
        document.getElementsByClassName("popup-father")[0].classList.add("active");

        let i = 1;
        nota.notas.forEach((nota) => {
            if (nota.subNotas) {
                agregar_fila(tables[0], 'td contenteditable="true"', [
                    nota.nombre,
                    nota.porcentaje,
                    `<button class="btn btnNotas btn-animacion">
                        <span class="spanNotas">${nota.nota}</span>
                    </button>`
                ]);

                const btns = document.getElementsByClassName('btn btnNotas btn-animacion');
                const btn = btns[btns.length - 1];
                btn.addEventListener('click', girar);
                
            } else {
                agregar_fila(tables[0], 'td contenteditable="true"', [nota.nombre, nota.porcentaje, nota.nota]);
            }
            updateLastRowEvents(0, i);
            i++;
        });

        if (nota.notas.length > 0) {
            addDefinitiva(tables[0], nota.definitiva);
            updateLastRowEvents(0);
        }
    }

    const crearTarjetas = (carrera, semestre) => {
        const { materias } = carrera.semestres[semestre];
        for (const clase in materias) {
            crearTarjeta(
                materias[clase].nombre,
                materias[clase].nota.definitiva,
                materias[clase].profesor,
                materias[clase].id,
                materias[clase].departamento
            );
        }
    }

    const borrarTarjetas = () => {
        while (containerCard.firstChild) {
            containerCard.removeChild(containerCard.firstChild);
        }
    }


    let bodyPopupFront = document.querySelector(".body-popup-front");
    let bodyPopupRight = document.querySelector(".body-popup-right");
    let btnsCerrar = document.getElementsByClassName("btn-cerrar-popup");
    let btnIzquierda = document.getElementById("regresar");
    
    btnsCerrar[0].addEventListener("click", async function() {
        overlay.classList.remove("active");
        this.classList.remove("active");
        document.getElementsByClassName("popup-father")[0].classList.remove("active");

        const materia = carrera.semestres[semestreActual].materias.find(
            (materia) => materia.id === idMateriaActual
        );
        
        console.log(await putClase(materia.id, materia.semestre, materia.profesor, materia.nota));
    });
    
    btnsCerrar[1].addEventListener("click", async function() {
        overlay.classList.remove("active");
        this.classList.remove("active");
        popup.classList.remove("active");
        document.getElementsByClassName("popup-father")[0].classList.remove("active");
        bodyPopupFront.classList.remove("active");
        bodyPopupRight.classList.remove("active");

        const { rows } = tables[1];

        let subNotas = [];
        
        for (let i = 1; i < rows.length; i++) {
            const [ nombre, porcentaje, valorNota ] = rows[i].cells;
            subNotas.push({
                nombre: nombre.textContent,
                porcentaje: porcentaje.textContent,
                nota: valorNota.textContent
            });
        }

        let nota = 0;
        if (rows.length > 1) {
            nota = rows[1].cells[3].textContent;
        }

        const materia = carrera.semestres[semestreActual].materias.find(
            (materia) => materia.id === idMateriaActual
        );

        materia.nota.notas[notaActual].nota = nota;
        materia.nota.notas[notaActual].subNotas = subNotas;

        console.log(await putClase(materia.id, materia.semestre, materia.profesor, materia.nota));

        tables[1].innerHTML = `<tr>
            <th>Nombre</th>
            <th>%</th>
            <th>Notas</th>
            <th>Definitiva</th>
        </tr>`;
    });

    btnsCerrar[2].addEventListener("click", function() {
        containerCardPapa.classList.remove('active');
        containerGeneral.classList.remove("active");
        btnCreate[0].classList.remove('active');
        fromCenter[0].classList.remove('active');
        btnCreate[0].textContent = "Crear Semestre";
        calcularPonderado(carrera,ponderado);
    });

    btnIzquierda.addEventListener("click", () => {
        popup.classList.remove("active");
        bodyPopupRight.classList.remove("active");
        bodyPopupFront.classList.remove("active");
        document.getElementsByClassName("popup-father")[0].classList.add("active");

        const { rows } = tables[1];

        let subNotas = [];
        
        for (let i = 1; i < rows.length; i++) {
            const [ nombre, porcentaje, valorNota ] = rows[i].cells;
            subNotas.push({
                nombre: nombre.textContent,
                porcentaje: porcentaje.textContent,
                nota: valorNota.textContent
            });
        }

        let nota = 0;
        if (rows.length > 1) {
            nota = rows[1].cells[3].textContent;
        }

        const materia = carrera.semestres[semestreActual].materias.find(
            (materia) => materia.id === idMateriaActual
        );

        tables[0].rows[parseInt(notaActual) + 1].cells[2].firstChild.childNodes[1].textContent = nota;

        materia.nota.notas[notaActual].nota = nota;
        materia.nota.notas[notaActual].subNotas = subNotas;

        tables[1].innerHTML = `<tr>
            <th>Nombre</th>
            <th>%</th>
            <th>Notas</th>
            <th>Definitiva</th>
        </tr>`;
    });     
    
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

    const btnAgregar = document.querySelector("#btnAgregar");
    const btnEliminar = document.querySelector("#btnEliminar");
    const btnAgregar2 = document.querySelector("#btnAgregar2");
    const btnEliminar2 = document.querySelector("#btnEliminar2");

    btnAgregar.addEventListener("click", () => {
        const table = tables[0];
        agregar_fila(table, 'td contenteditable="true"', ['', '', '0']);

        if (table.rows.length === 2)
            addDefinitiva(table);
        
        updateLastRowEvents(0);
        actualizarPorcentajes(table);

        calcularNotas(table);

        const materia = carrera.semestres[semestreActual].materias.find(
            (materia) => materia.id === idMateriaActual
        );

        const [ nombre, porcentaje, nota ] = table.rows[table.rows.length - 1].cells;
        materia.nota.notas.push({
            nombre: nombre.textContent,
            porcentaje: porcentaje.textContent,
            nota: nota.textContent
        });

        materia.nota.definitiva = table.rows[1].cells[3].textContent;
    });

    btnEliminar.addEventListener("click", () => {
        const table = tables[0];
        
        if (table.rows.length <= 1)
            return;
        
        const materia = carrera.semestres[semestreActual].materias.find(
            (materia) => materia.id === idMateriaActual
        );

        table.deleteRow(rIndexs[0]);
        materia.nota.notas.splice(rIndexs[0] - 1, 1);
        if (table.rows.length >= 2) {
            calcularNotas(table);
            materia.nota.definitiva = table.rows[1].cells[3].textContent;
        } else {
            materia.nota.definitiva = '0';
        }
        
        rIndexs[0] = -1;
    });

    btnAgregar2.addEventListener("click", () => {
        const table = tables[1];
        agregar_fila(table, 'td contenteditable="true"', ['', '', '0']);

        if (table.rows.length == 2)
            addDefinitiva(table);
        
        updateLastRowEvents(1);
        actualizarPorcentajes(table);

        if (table.rows.length >= 2) calcularNotas(table);
    });

    btnEliminar2.addEventListener("click", () => {
        const table = tables[1];

        if (table.rows.length <= 1)
            return;
        table.deleteRow(rIndexs[1]);
        if (table.rows.length >= 2) {
            calcularNotas(table);
        }

        rIndexs[1] = -1;
    });
    
    btnAgregarGrande.addEventListener("click", () => {
        const table = tables[0];
        
        agregar_fila(table, 'td contenteditable="true"', ['', '',
            `<button class="btn btnNotas btn-animacion"><span class="spanNotas">0</span></button>`]
        );

        if (table.rows.length == 2)
            addDefinitiva(table);
        
        const btns = document.getElementsByClassName('btn btnNotas btn-animacion');
        const btn = btns[btns.length - 1];

        let id_btn;
        if (btns.length === 1) {
            id_btn = 0;
        } else {
            id_btn = parseInt(btns[btns.length - 2].id) + 1;
        }

        btn.id = id_btn;

        btn.addEventListener('click', girar);
        
        updateLastRowEvents(1);
        actualizarPorcentajes(table);

        calcularNotas(table);

        const materia = carrera.semestres[semestreActual].materias.find(
            (materia) => materia.id === idMateriaActual
        );

        const [ nombre, porcentaje, nota ] = table.rows[table.rows.length - 1].cells;
        materia.nota.notas.push({
            nombre: nombre.textContent,
            porcentaje: porcentaje.textContent,
            nota: nota.textContent,
            subNotas: []
        });

        materia.nota.definitiva = table.rows[1].cells[3].textContent;
    });
    
    const girar = (event) => {
        popup.classList.add('active');
        bodyPopupFront.classList.add('active');
        bodyPopupRight.classList.add('active');
        
        const table = tables[1];

        const row = event.target.tagName === 'BUTTON'
            ? event.target.parentElement.parentElement
            : event.target.parentElement.parentElement.parentElement;

        notaActual = row.rowIndex - 1;

        const materia = carrera.semestres[semestreActual].materias.find((materia) => materia.id === idMateriaActual);

        const nota = materia.nota.notas[notaActual];

        nota.subNotas.forEach((subNota) => {
            agregar_fila(table, 'td contenteditable="true"', [
                subNota.nombre, subNota.porcentaje, subNota.nota
            ]);

            updateLastRowEvents(1);
        });

        if (table.rows.length >= 2)
            addDefinitiva(table, nota.nota);
    }
    
    /*---------------------------------Calculos tabla---------------------------------*/ 
    const calcularNotas = (table) => {
        if (table.rows.length > 0) {
            let acumulador = 0;
            
            for (let i = 1; i < table.rows.length; i++) {
                const row = table.rows[i];
                if (row.cells.length >= 3) {
                    const notasCell = parseFloat(row.cells[2].textContent); // Índice 1 corresponde a la columna de notas
                    const porcentajeCell = parseFloat(row.cells[1].textContent); // Índice 2 corresponde a la columna de porcentaje
                
                    const notaCalculada = (notasCell / 100) * porcentajeCell;
                    acumulador += notaCalculada;
                    // console.log("acumula:"+acumulador);
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
    
    /*---------------------------------Calculos Definitiva Semestre---------------------------------*/ 
    function calcularPromedioSemestre(clases, semestre, ponderado) {
        let totalCreditos = 0;
        let sumaPonderada = 0;
      
       
        for (const materia of clases.semestres[semestre].materias) {
            const creditos = materia.creditos;
            const definitiva = materia.nota.definitiva;
        
            totalCreditos += creditos;
            sumaPonderada += creditos * definitiva;
        }
        
        const promedio = (sumaPonderada / totalCreditos).toFixed(3);
        ponderado.textContent=promedio;
    }
    
    function calcularPonderado (clases, ponderado) {
        let sumaPonderada = 0;
        let totalSemestres = 0;
      
        for (const semestre of clases.semestres) {
          const definitivaSemestre = semestre.definitiva;
      
          sumaPonderada += definitivaSemestre;
          totalSemestres++;
        }
        // console.log(sumaPonderada);
        const promedioPonderado = (sumaPonderada / totalSemestres).toFixed(3);
        ponderado.textContent = promedioPonderado;  
    }
      
});