
"use strict"

export const agregar_fila = (tabla, tipo, ...contenido) => {
    let fila = "";
    contenido.forEach(element => {
        fila += `<${tipo}>${element}</${tipo}>`;
    });
    tabla.insertRow(-1).innerHTML = fila;
}