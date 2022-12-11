"using strict"

window.addEventListener("load", function(){

    var overlay = this.document.querySelector(".overlay"),
        btnAbrir = this.document.querySelector("#abrir");
        btnCerrar = this.document.querySelector("#cerrar")

    btnAbrir.addEventListener("click", function(){
        btnCerrar.classList.add("active");
        overlay.classList.add("active");
    });

    btnCerrar.addEventListener("click", function(){
        overlay.classList.remove("active");
        btnCerrar.classList.remove("active");
    });
});