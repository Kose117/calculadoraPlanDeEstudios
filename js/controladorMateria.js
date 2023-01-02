"using strict"

var clases
fetch("../archivos/clases.json")
    .then(response => response.json())
    .then(data =>{
        clases = data;
    });
const materias=new Map();

window.addEventListener("load", function(){

    var btnsMaterias = this.document.getElementsByClassName("btn-materias");
    var overlay = this.document.querySelector(".overlay");
    var btnCerrar = this.document.querySelector("#cerrar");
    var nombre_materia = this.document.querySelector("#nombre-materia");
    var codigo = this.document.querySelector("#codigo");
    var creditos = this.document.querySelector("#creditos");
    var tipo = this.document.querySelector("#tipo");
    var tabla_requisitos = this.document.querySelector("#preRequi");
    var nota=this.document.querySelector("#nota");
    var profe=this.document.querySelector("#profesor");
    var semestre=this.document.querySelector("#semestre");
    var btnAgregar=this.document.querySelector("#bt2");
    var btnEliminar=this.document.querySelector("#bt1");
    
    
    
    
    for (var i = 0; i < btnsMaterias.length; i++){
        btnsMaterias.item(i).addEventListener("click", function(){
            document.getElementsByClassName("popup")[0].classList.add("active")
            btnCerrar.classList.add("active");
            overlay.classList.add("active");
            abrir_materia(this.id, clases[this.id]);
        });
    }
    
    btnCerrar.addEventListener("click", function(){
        document.getElementsByClassName("popup")[0].classList.remove("active")
        overlay.classList.remove("active");
        btnCerrar.classList.remove("active");
        while (tabla_requisitos.rows.length!=0){
            tabla_requisitos.rows[0].remove();
        }
    });
    
    function abrir_materia(id, materia){
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
            agregar_fila(tabla_requisitos, "td", "Esta materia no tiene requisitos");
        }
        if(materia.nota=="")
        {
            nota.value=0;
        }
        if(materia.profesor=="")
        {
            profe.value="No asignado";
        }
        if(materia.semestre=="")
        {
            semestre.value="No asignado";
        }
        if(!materias.has(codigo.value))
        {
            btnAgregar.textContent="Agregar";
            btnEliminar.textContent="Editar";
            
        }
        //Impresion
        console.log(materias)
           
        
    }
    
    btnAgregar.addEventListener("click",function (){
        if(btnAgregar.textContent=="Agregar")
        {
            materias.set(codigo.value,clases[codigo.value]);
           
            btnAgregar.textContent="Editar";
            btnEliminar.textContent="Eliminar";
        }
        else if(btnAgregar.textContent=="Editar")
        {
            
        }
    });

    btnEliminar.addEventListener("click",function elimi(){
        if(btnEliminar.textContent=="Editar")
        {
            
        }
        else if(btnEliminar.textContent=="Eliminar")
        {
            materias.delete(codigo.value,clases[codigo.value]);
            
            btnAgregar.textContent="Agregar";
            btnEliminar.textContent="Editar";
        }
    });

    function agregar_lista_requisitos(header, codigos){
        if (codigos.length != 0){
            agregar_fila(tabla_requisitos, "th", header, "Codigo");
            codigos.forEach(codigo => {
                agregar_fila(tabla_requisitos, "td", clases[codigo].nombre, codigo);
            });
        }
    }
    
    function agregar_fila(tabla, tipo, ...contenido){
        var fila = "";
        contenido.forEach(element => {
            fila += `<${tipo}>${element}</${tipo}>`;
        });
        tabla.insertRow(-1).innerHTML = fila;
    }
    
    
});
