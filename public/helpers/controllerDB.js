
import * as fs from "fs";


const archivo = './db/tareas.json';

export const guardarDB = (data) => fs.writeFileSync(archivo, JSON.stringify(data));

export const leerDB = () => {
    if (!fs.existsSync(archivo))
        return [];
    const objeto = fs.readFileSync(archivo, {encoding: "utf-8"}); 
    return (objeto === '')?[] :JSON.parse(objeto);
}