"using strict"

import { getClases, putClase, delClase,  } from "../helpers/requests.js";
import { agregar_fila } from "../helpers/functions.js";
import { error_alerta,correctamente } from "./sweetAlert.js";
import { getCarrera } from "../helpers/requests.js";


window.addEventListener("load", async() => {
    
    const clases = await getClases();
    
    var btnsMaterias = document.getElementsByClassName("btn-materias");
    var overlay = document.querySelector(".overlay");
    var btnCerrar = document.querySelector("#cerrar");
    var nombre_materia = document.querySelector("#nombre-materia");
    var codigo = document.querySelector("#codigo");
    var creditos = document.querySelector("#creditos");
    var tipo = document.querySelector("#tipo");
    var tabla_requisitos = document.querySelector("#preRequi");
    var nota = document.querySelector("#nota");
    var profe = document.querySelector("#profesor");
    var semestre = document.querySelector("#semestre");
    var btnAgregar = document.querySelector("#bt2");
    var btnEliminar = document.querySelector("#bt1");
    
    async function cambiarColorFondo() {
        const carrera = await getCarrera();
        const botones = document.querySelectorAll('.btn-materias');
        
        botones.forEach(boton => {
            if (carrera.semestres.some(semestre => semestre.materias.some(materia => materia.id === boton.id))) {
                boton.style.backgroundColor = '#AFF0BD';
            } else {
                boton.style.backgroundColor = '';
            }
        });
    }
    cambiarColorFondo();
    
    const guardarMateria = async(codigo, num_semestre, profesor, mi_nota) => {
        if (num_semestre === '') num_semestre = 0;

        if (mi_nota === '') mi_nota = 0;
        
        semestre.setAttribute('readonly','true');
        profe.setAttribute('readonly','true');
        nota.setAttribute('readonly','true');

        clases[codigo].nota=mi_nota;
        clases[codigo].profesor=profesor;
        clases[codigo].semestre=num_semestre;
        clases[codigo].registro = true;
        console.log(await putClase(codigo, num_semestre, profesor));
        correctamente.fire({ 
            icon: 'success',
            title: 'Se agregó correctamente'
          });
        cambiarColorFondo();
    }
    
    const editarMateria = () => {
        semestre.removeAttribute('readonly');
        profe.removeAttribute('readonly');
    }

    const eliminarMateria = async(codigo, num_semestre) => {
        semestre.setAttribute('readonly','true');
        profe.setAttribute('readonly','true');
        nota.setAttribute('readonly','true');

        semestre.value = '';
        profe.value = '';
        nota.value = 0;

        clases[codigo].nota = 0;
        clases[codigo].profesor = "";
        clases[codigo].semestre = 0;
        clases[codigo].registro = false;
        console.log(await delClase(codigo, num_semestre));
        correctamente.fire({ 
            icon: 'error',
            title: 'Se eliminó  correctamente'
        });
        cambiarColorFondo();
    }

    for (var i = 0; i < btnsMaterias.length; i++){
        const btn = btnsMaterias.item(i);
        btn.addEventListener("click", () => {
            document.getElementsByClassName("popup")[0].classList.add("active")
            btnCerrar.classList.add("active");
            overlay.classList.add("active");
            abrir_materia(btn.id, clases);
        });
    }
    
    btnCerrar.addEventListener("click", () => {
        document.getElementsByClassName("popup")[0].classList.remove("active")
        overlay.classList.remove("active");
        btnCerrar.classList.remove("active");
        while (tabla_requisitos.rows.length!=0){
            tabla_requisitos.rows[0].remove();
        }
    });

    //funciones
    function abrir_materia(id, clases){
        const materia = clases[id];
        nombre_materia.value = materia.nombre;
        codigo.value = id;
        creditos.value = materia.creditos;
        tipo.value = materia.tipo;
        nota.value=materia.nota;
        profe.value=materia.profesor;
        semestre.value=materia.semestre;
        agregar_lista_requisitos("pre-requisitos", materia.pre_requisitos);
        agregar_lista_requisitos("co-requisitos", materia.co_requisitos);
        if (materia.pre_requisitos == 0 && materia.co_requisitos == 0){
            agregar_fila(tabla_requisitos, "td", ["Esta materia no tiene requisitos"]);
        }
        if(materia.semestre == 0){
            semestre.value = '';
        }
        if(materia.registro){
            btnAgregar.textContent = "Editar";
            btnEliminar.textContent = "Eliminar";
        } else {
            btnAgregar.textContent = "Agregar";
            btnEliminar.textContent = "Editar";
        }
    }
    
    btnAgregar.addEventListener("click", () => {

        try {
            if (btnAgregar.textContent == "Editar") {
                editarMateria();
    
                btnAgregar.textContent = "Guardar";
    
            } else {
                if (semestre.value === '')
                    semestre.value = '1';

                semestre.value = parseInt(semestre.value);
                nota.value = parseInt(nota.value);

                if (semestre.value === 'NaN' || parseInt(semestre.value) <= 0)
                    throw new Error("El semestre debe ser positivio y mayor a 0");
                else if (nota.value === 'NaN' || parseInt(nota.value) < 0 || parseInt(nota.value) > 5)
                    throw new Error("La nota debe ser positiva y menor a 5");

                guardarMateria(codigo.value, semestre.value, profe.value, nota.value);
                if (btnAgregar.textContent == "Agregar")
                    btnEliminar.textContent = "Eliminar";
                
                btnAgregar.textContent = "Editar";

            } 
            
        } catch (error) {
            error_alerta(error);
        }
       
    });

    btnEliminar.addEventListener("click", () => {
        if (btnEliminar.textContent === "Editar") {
            editarMateria();

            btnEliminar.textContent = "Guardar";

        } else if(btnEliminar.textContent === "Eliminar") {
            eliminarMateria(codigo.value, semestre.value);
            
            btnAgregar.textContent = "Agregar";
            btnEliminar.textContent = "Editar";

        } else if(btnEliminar.textContent === "Guardar") {
            try {
                if (semestre.value === '')
                    semestre.value = 1;

                semestre.value = parseInt(semestre.value);
                nota.value = parseInt(nota.value);

                if (semestre.value === 'NaN' || parseInt(semestre.value) <= 0)
                    throw new Error("El semestre debe ser positivio y mayor a 0");
                else if (nota.value === 'NaN' || parseInt(nota.value) < 0 || parseInt(nota.value) > 5)
                    throw new Error("La nota debe ser positiva y menor a 5");

                guardarMateria(codigo.value, semestre.value, profe.value, nota.value);
                
                btnAgregar.textContent = "Editar";
                btnEliminar.textContent = "Eliminar";
            } catch (error) {
                error_alerta(error);
            }
            
        }
    });

    function agregar_lista_requisitos(header, codigos){
        if (codigos.length != 0){
            agregar_fila(tabla_requisitos, "th", [header, "Codigo"]);
            codigos.forEach(codigo => {
                agregar_fila(tabla_requisitos, "td", [clases[codigo].nombre, codigo]);
            });
        }
    }
});