"using strict"

import { getJson, putClase } from "../helpers/requests.js";
import { agregar_fila } from "../helpers/functions.js";


export const materias = new Map();

window.addEventListener("load", async() => {
    
    const clases = await getJson('/json/clases');
    // await getJson('/json/carrera') para leer el archivo carrera

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
    
    const guardarMateria = async(codigo, num_semestre, profesor, mi_nota) => {
        if (num_semestre==='') num_semestre=0;
        if (mi_nota==='') mi_nota=0;
        semestre.setAttribute('readonly','true');
        profe.setAttribute('readonly','true');
        nota.setAttribute('readonly','true');

        clases[codigo].nota=mi_nota;
        clases[codigo].profesor=profesor;
        clases[codigo].semestre=num_semestre;

        materias.set(codigo, clases[codigo]);
        console.log(await putClase(codigo, num_semestre, profesor, mi_nota));
    }

    const editarMateria = () => {
        semestre.removeAttribute('readonly');
        profe.removeAttribute('readonly');
        nota.removeAttribute('readonly');
    }

    const eliminarMateira = async(codigo) => {
        semestre.setAttribute('readonly','true');
        profe.setAttribute('readonly','true');
        nota.setAttribute('readonly','true');

        clases[codigo].nota=0;
        clases[codigo].profesor="";
        clases[codigo].semestre=0;

        await putClase(codigo);
        materias.delete(codigo, clases[codigo]);
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
        if(materia.semestre==0){
            semestre.value = '';
        }
        if(!materias.has(codigo.value)){
            btnAgregar.textContent = "Agregar";
            btnEliminar.textContent = "Editar";
            
        }
        //Impresion
        // console.log(materias)
    }
    
    btnAgregar.addEventListener("click", () => {
       
        if(btnAgregar.textContent == "Agregar"){
            guardarMateria(codigo.value, semestre.value, profe.value, nota.value);
            
            btnAgregar.textContent = "Editar";
            btnEliminar.textContent = "Eliminar";

        }else if(btnAgregar.textContent=="Editar"){
            editarMateria();

            btnAgregar.textContent="Guardar";

        } else if(btnAgregar.textContent=="Guardar"){
            guardarMateria(codigo.value, semestre.value, profe.value, nota.value);

            btnAgregar.textContent="Editar";
        }
    });

    btnEliminar.addEventListener("click", () => {
        if(btnEliminar.textContent=="Editar"){
            editarMateria();

            btnEliminar.textContent="Guardar";

        }else if(btnEliminar.textContent=="Eliminar"){
            materias.delete(codigo.value,clases[codigo.value]);
            
            btnAgregar.textContent="Agregar";
            btnEliminar.textContent="Editar";

            semestre.setAttribute('readonly','true');
            profe.setAttribute('readonly','true');
            nota.setAttribute('readonly','true');

        }else if(btnEliminar.textContent=="Guardar"){
            guardarMateria(codigo.value, semestre.value, profe.value, nota.value);
            
            btnAgregar.textContent="Editar";
            btnEliminar.textContent="Eliminar";
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