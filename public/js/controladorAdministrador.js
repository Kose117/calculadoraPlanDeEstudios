import {correctamente } from "./sweetAlert.js";
import { getCarrera, carreraJsonPost, putClase, delClase, getClases, putCarrera } from "../helpers/requests.js";


let modal = document.getElementById("modal");
let idInput = document.getElementById("idInput");
let nombreInput = document.getElementById("nombreInput");
let tipoSelect = document.getElementById("tipoSelect");
let creditosInput = document.getElementById("creditosInput");
let profesorInput = document.getElementById("profesorInput");
let departamentoInput = document.getElementById("departamentoInput");
let semestreInput = document.getElementById("semestreInput");
let notaInput = document.getElementById("notaInput");
const btnNuevaMateria = document.getElementById("nueva-materia");
const btnGuardar = document.getElementById("guardar");


async function obtenerMaterias() {
    const carrera = await getCarrera();
    const semestres = carrera.semestres;
    const materias = [];
  
    // Recorrer los semestres y las materias
    for (const semestre of semestres) {
        for (const materia of semestre.materias) {
            materias.push(materia);
        }
    }
  
    return materias;
}

function validarCampoVacio(input) {
    if (input.value.trim().length === 0 || (input.id === "tipoSelect" && (input.value === "Opciones" || input.selectedIndex === 0))) {
        input.style.border = "2px solid red";
    } else {
        input.style.border = "1px solid #ced4da"; // Restaurar el estilo del borde original
    }
}
  
  
async function guardaar() {
    if (!idInput.readOnly) {
        let camposCompletos = true; // Variable para controlar si todos los campos están completos
      
        if (semestreInput.value === "") {
            validarCampoVacio(semestreInput);
            camposCompletos = false;
        } else {
            validarCampoVacio(semestreInput);
        }
      
        if (idInput.value === "") {
            validarCampoVacio(idInput);
            camposCompletos = false;
        } else {
            validarCampoVacio(idInput);
        }
      
        if (nombreInput.value === "") {
            validarCampoVacio(nombreInput);
            camposCompletos = false;
        } else {
            validarCampoVacio(nombreInput);
        }
      
        if (tipoSelect.value === "" || tipoSelect.value === "Opciones" || tipoSelect.selectedIndex === 0) {
            validarCampoVacio(tipoSelect);
            camposCompletos = false;
        } else {
            validarCampoVacio(tipoSelect);
        }
      
        if (creditosInput.value === "") {
            validarCampoVacio(creditosInput);
            camposCompletos = false;
        } else {
            validarCampoVacio(creditosInput);
        }
      
        if (departamentoInput.value === "") {
            validarCampoVacio(departamentoInput);
            camposCompletos = false;
        } else {
            validarCampoVacio(departamentoInput);
        }
      
        if (notaInput.value === "") notaInput.value = 0;
        if (profesorInput.value === "") profesorInput.value = "";
        if (camposCompletos) {
            let tipi = tipoSelect.options[tipoSelect.selectedIndex];
            let tipu = tipi.textContent;
            console.log(await carreraJsonPost(
                idInput.value,
                semestreInput.value,
                notaInput.value,
                tipu,
                creditosInput.value,
                nombreInput.value,
                departamentoInput.value,
                profesorInput.value
            ));
            correctamente.fire({ 
                icon: 'success',
                title: 'Se agregó correctamente'
            });
            ocultarModal();
            crearFilasTabla()
        }
    } else {
        const clases = await getClases();
        if (clases[idInput.value]) {
            console.log(await putClase(idInput.value, semestreInput.value, profesorInput.value));
        } else {
            console.log(await putCarrera(idInput.value, semestreInput.value, profesorInput.value));
        }
        ocultarModal();
    }
}
  
  
  
function funcNuevaMateria() {
    modal.classList.toggle("translate");
    idInput.value = '';
    nombreInput.value = '';
    creditosInput.value = '';
    profesorInput.value = '';
    departamentoInput.value = '';
    semestreInput.value = '';
    notaInput.value = '';
    tipoSelect.selectedIndex = 0;
    idInput.removeAttribute('readonly');
    nombreInput.removeAttribute('readonly');
    creditosInput.removeAttribute('readonly');
    departamentoInput.removeAttribute('readonly');
    notaInput.removeAttribute('readonly');
    tipoSelect.disabled = false;
  
    const eliminarButton = document.getElementById('cerrar');
    if (eliminarButton) {
      eliminarButton.remove();
    }
}


btnNuevaMateria.addEventListener("click",funcNuevaMateria);
btnGuardar.addEventListener("click", guardaar);

function mostrarModal() {
    // Obtén el ID de la materia de la fila
    const materiaId = this.closest("tr").cells[0].textContent;
    const fila = this.closest("tr");
  
    // Obtén todas las materias del JSON
    obtenerMaterias().then((materias) => {
        // Busca la materia con el ID correspondiente
        const materia = materias.find((m) => m.id === materiaId);
    
        if (!materia) {
            return; // Salir de la función si la materia no se encuentra
        }
    
        // Autocompletar los campos del formulario con los datos de la materia
        idInput.value = materia.id;
        nombreInput.value = materia.nombre;
        creditosInput.value = materia.creditos;
        profesorInput.value = materia.profesor;
        departamentoInput.value = materia.departamento;
        semestreInput.value = materia.semestre;
        notaInput.value = materia.nota.definitiva;
    
        // Establecer la opción seleccionada del campo "tipo"
        for (let i = 0; i < tipoSelect.options.length; i++) {
            if (tipoSelect.options[i].textContent === materia.tipo) {
            tipoSelect.selectedIndex = i;
            break;
            }
        }
    
        // Verificar si ya existe un botón de eliminar
        var eliminarButton = document.getElementById("cerrar");
        if (!eliminarButton) {
            // Obtén la referencia al div
            var divFour = document.querySelector(".four");
    
            // Crea un nuevo elemento de botón
            eliminarButton = document.createElement("button");
            eliminarButton.classList.add("btn", "btn-danger", "custom-size5");
            eliminarButton.textContent = "Eliminar";
            eliminarButton.id = "cerrar";
            eliminarButton.type = "button";
    
            // Asignar la función de eliminar al botón
            eliminarButton.addEventListener("click", async function () {
                if (materia) {
                    console.log(await delClase(materia.id, materia.semestre))
                    eliminarFila(fila);
                    correctamente.fire({ 
                        icon: 'error',
                        title: 'Se eliminó correctamente'
                    });
                }
                ocultarModal();
                //sleep
                await new Promise(r => setTimeout(r, 1000));
                // reload
                window.location.reload();
            });
    
            // Agrega el botón de eliminar al div
            divFour.appendChild(eliminarButton);
        }
  
        modal.classList.toggle("translate");
    });
}
  
  
function eliminarFila(fila) {
    const table = document.getElementById("table");
    table.deleteRow(fila.rowIndex);
}
  


  
function restablecerEstiloBorde() {
    const campos = document.getElementsByClassName("form-control");
    for (let i = 0; i < campos.length; i++) {
        const campo = campos[i];
        campo.style.border = "1px solid #ced4da";
    }

    // Restablecer los estilos de la ChoiceBox
    tipoSelect.style.border = "1px solid #ced4da"

}
  
  // Remueve la clase CSS "open" del modal para ocultarlo
function ocultarModal() {
    const modal = document.getElementById("modal");
    modal.classList.toggle("translate");
    restablecerEstiloBorde();
    idInput.setAttribute('readonly','true');
    nombreInput.setAttribute('readonly','true');
    creditosInput.setAttribute('readonly','true');
    departamentoInput.setAttribute('readonly','true');
    tipoSelect.disabled = true;
    notaInput.setAttribute('readonly','true');
    
}
  
  // Función para crear las filas de la tabla con los datos del JSON
function crearFilasTabla() {
    const table = $("#table").DataTable({
        language: {
            url: "https://cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json"
        },
        columnDefs: [
            { targets: [4], orderable: false }
        ]
    });

    obtenerMaterias().then((materias) => {
        for (const materia of materias) {
            const existingRow = table.row(`:contains("${materia.id}")`);
    
            if (existingRow.length) {
                continue; // Saltar a la siguiente iteración si la fila ya existe
            }
    
            const rowData = [
                materia.id,
                materia.nombre,
                materia.tipo,
                materia.creditos,
                '<button class="btn btn-warning editar-btn">Editar</button>'
            ];
    
            table.row.add(rowData).draw();
        }
    
        // Maneja el evento de clic en los botones de "Editar"
        $("#table").on("click", ".editar-btn", function () {
            mostrarModal.call(this); // Asegura el contexto correcto al llamar a mostrarModal()
        });
    });

    // Maneja el evento de clic en el botón "Cerrar" del modal
    const cerrarButton = document.querySelector("#modal .close");
    cerrarButton.addEventListener("click", ocultarModal);
}
  
  
  
  

// Manejar el evento de carga de la página
window.addEventListener("DOMContentLoaded", () => {
    crearFilasTabla();
});
