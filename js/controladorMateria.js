"using strict"

var clases
fetch('../archivos/clases.json')
    .then(response => response.json())
    .then(data =>{
        clases = data;
    });

window.addEventListener("load", function(){

    var btnsMaterias = this.document.getElementsByClassName("btn-materias");
    var overlay = this.document.querySelector(".overlay");
    var btnCerrar = this.document.querySelector("#cerrar");
    var materia = this.document.querySelector("#nombre-materia");
    var codigo = this.document.querySelector("#codigo");
    var creditos = this.document.querySelector("#creditos");
    var tipo = this.document.querySelector("#tipo");

    for (var i = 0; i < btnsMaterias.length; i++){
        btnsMaterias.item(i).addEventListener("click", function(){
            btnCerrar.classList.add("active");
            overlay.classList.add("active");
            materia.value = clases[this.id].nombre;
            codigo.value = this.id;
            creditos.value = clases[this.id].creditos;
            tipo.value = clases[this.id].tipo;
        });
    }
    
    btnCerrar.addEventListener("click", function(){
        overlay.classList.remove("active");
        btnCerrar.classList.remove("active");
    });
});