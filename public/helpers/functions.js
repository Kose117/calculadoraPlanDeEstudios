
"use strict"

export const agregar_fila = (tabla, tipo, contenido = [], indice = -1) => {
    let fila = "";
    contenido.forEach(element => {
        fila += `<${tipo}>${element}</${tipo}>`;
    });
    tabla.insertRow(indice).innerHTML = fila;
}