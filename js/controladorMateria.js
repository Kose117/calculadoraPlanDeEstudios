"using strict"

window.addEventListener("load", function(){

    var btnsMaterias = this.document.getElementsByClassName("btn-materias")
        overlay = this.document.querySelector(".overlay"),
        btnCerrar = this.document.querySelector("#cerrar");
        for(var i = 0; i < btnsMaterias.length; i++){
            btnsMaterias.item(i).addEventListener("click", function(){
                btnCerrar.classList.add("active");
                overlay.classList.add("active");
            });
        }
        

    btnCerrar.addEventListener("click", function(){
        overlay.classList.remove("active");
        btnCerrar.classList.remove("active");
    });
});