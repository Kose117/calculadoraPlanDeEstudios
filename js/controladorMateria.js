"using strict"

window.addEventListener("load", function(){

    var overlay = this.document.querySelector(".overlay");

    var botonPresiona = this.document.querySelector("#presiona");

    botonPresiona.addEventListener("click", function(){
        overlay.style.visibility = "visible";
    });
});