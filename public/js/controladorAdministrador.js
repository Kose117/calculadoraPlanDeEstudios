
import { getCarrera, carreraJsonPost, putClase} from "../helpers/requests.js";


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
        // console.log("a");
        if (camposCompletos) {
            console.log(await carreraJsonPost(
                idInput.value,
                semestreInput.value,
                notaInput.value,
                tipoSelect.value,
                creditosInput.value,
                nombreInput.value,
                departamentoInput.value,
                profesorInput.value
            ));
        }
    } else {
        console.log(await putClase(idInput.value, semestreInput.value, profesorInput.value));
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
}

btnNuevaMateria.addEventListener("click",funcNuevaMateria);
btnGuardar.addEventListener("click", guardaar);

function mostrarModal() {
  
    // Obtén el ID de la materia de la fila
    const materiaId = this.closest("tr").cells[0].textContent;
  
    // Obtén todas las materias del JSON
    obtenerMaterias().then((materias) => {
        // Busca la materia con el ID correspondiente
        const materia = materias.find((m) => m.id === materiaId);
    
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
  
      modal.classList.toggle("translate");
    });
}
  
function restablecerEstiloBorde() {
    const campos = document.getElementsByClassName("form-control");

    for (let i = 0; i < campos.length; i++) {
        const campo = campos[i];
        campo.style.border = "1px solid #ced4da";
    }
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
    const table = document.getElementById("table");
    obtenerMaterias().then((materias) => {
        for (const materia of materias) {
            const row = table.insertRow();
            const idCell = row.insertCell();
            const nombreCell = row.insertCell();
            const tipoCell = row.insertCell();
            const creditosCell = row.insertCell();
            const editarCell = row.insertCell();

            idCell.textContent = materia.id;
            nombreCell.textContent = materia.nombre;
            tipoCell.textContent = materia.tipo;
            creditosCell.textContent = materia.creditos;
            creditosCell.className = "col-2 text-center";

            // Agrega el botón de "Editar" con una clase CSS "editar-btn"
            editarCell.innerHTML = '<button class="btn btn-warning editar-btn">Editar</button>';
        }

        // Maneja el evento de clic en los botones de "Editar"
        const editarButtons = document.getElementsByClassName("editar-btn");
        for (const button of editarButtons) {
            button.addEventListener("click", mostrarModal);
        }

        // Maneja el evento de clic en el botón "Cerrar" del modal
        const cerrarButton = document.querySelector("#modal .close");
        cerrarButton.addEventListener("click", ocultarModal);
    });
}

// Manejar el evento de carga de la página
window.addEventListener("DOMContentLoaded", () => {
    crearFilasTabla();
});
