
const fs = require('fs');


const saveDB = (path, data) => fs.writeFileSync(path, JSON.stringify(data));

const readDB = (path) => {
    if (!fs.existsSync(path))
        return {};
    const objeto = fs.readFileSync(path, {encoding: "utf-8"}); 
    return (objeto === '')? {} :JSON.parse(objeto);
}

const clasesJsonGet = (req, res) => res.json(readDB('./public/json/clases.json'));

const clasesJsonPut = (req, res) => {
    const { codigo, semestre, profesor, nota } = req.body;
    const clases = readDB('./public/json/clases.json');

    clases[codigo].semestre = semestre;
    clases[codigo].profesor = profesor;
    clases[codigo].nota = nota;
    clases[codigo].registro = true;

    saveDB('./public/json/clases.json', clases);
    res.json({msg: 'La información de su clase se guardo correctamente'});
}

const clasesJsonDelete = (req, res) => {
    const { codigo } = req.body;
    const clases = readDB('./public/json/clases.json');

    clases[codigo].semestre = 0;
    clases[codigo].profesor = '';
    clases[codigo].nota = 0;
    clases[codigo].registro = false;

    saveDB('./public/json/clases.json', clases);
    res.json({msg: 'La información de su clase se eliminó correctamente'});
} 

const carreraJsonGet = (req, res) => res.json(readDB('./public/json/mi-carrera.json'));

const carreraJsonPut = (req, res) => {
    const { codigo, semestre, nota } = req.body;
    const clases = readDB('./public/json/clases.json');
    const clase = clases[codigo];
    
    clase.id = codigo;
    clase.nota = nota;
    clase.aprobada = nota >= 3.0;
    
    const carrera = readDB('./public/json/mi-carrera.json');

    if (semestre != '0') {
        if (!carrera.semestres[semestre]) {
            carrera.semestres[semestre] = [clase];
        } else {
            const index = carrera.semestres[semestre].findIndex(element => codigo == element.id);
            (index == -1)
                ? carrera.semestres[semestre].push(clase)
                : carrera.semestres[semestre][index] = clase;
        }
        saveDB('./public/json/mi-carrera.json', carrera);
        res.json({msg: 'La información de su clase se guardo correctamente'});
    } else {
        res.status(400).json({errors: ['El semestre ingresado es inválido']});
    }
}

const carreraJsonDelete = (req, res) => {
    const { codigo, semestre } = req.body;
    
    const carrera = readDB('./public/json/mi-carrera.json');
    if (carrera.semestres[semestre] !== undefined){
        const index = carrera.semestres[semestre].findIndex(element => codigo == element.id);
        carrera.semestres[semestre].splice(index);
        saveDB('./public/json/mi-carrera.json', carrera);
        res.json({msg: 'La información de su clase se eliminó correctamente'});
    } else {
        res.status(400).json({errors: ['El código de clase no existe en el semestre ingresado']});
    }
} 

const clasesRespaldoJsonGet = (req, res) => res.json(readDB('./database/clases-respaldo.json'));


module.exports = {
    clasesJsonGet,
    clasesJsonPut,
    clasesJsonDelete,
    carreraJsonGet,
    carreraJsonPut,
    carreraJsonDelete,
    clasesRespaldoJsonGet
};