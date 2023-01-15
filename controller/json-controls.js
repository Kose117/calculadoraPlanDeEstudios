
const fs = require('fs');


const saveDB = (path, data) => fs.writeFileSync(path, JSON.stringify(data));

const readDB = (path) => {
    if (!fs.existsSync(path))
        return {};
    const objeto = fs.readFileSync(path, {encoding: "utf-8"}); 
    return (objeto === '')? {} :JSON.parse(objeto);
}

const clasesJsonGet = (req, res) => {
    res.json(readDB('./public/json/clases.json'));
}

const clasesJsonPut = (req, res) => {
    const { codigo, semestre, profesor, nota } = req.body;
    const clases = readDB('./public/json/clases.json');

    clases[codigo].semestre = semestre;
    clases[codigo].profesor = profesor;
    clases[codigo].nota = nota;

    saveDB('./public/json/clases.json', clases);
    res.json({msg: 'La información de su clase se guardo correctamente'});
}

const materiasJsonGet = (req, res) => {
    res.json(readDB('./public/json/mi-carrera.json'));
}

const materiasJsonPut = (req, res) => {

}

const materiasRespaldoJsonGet = (req, res) => {
    res.json(readDB('./database/clases-respaldo.json'));
}


module.exports = {
    clasesJsonGet,
    clasesJsonPut,
    materiasJsonGet,
    materiasJsonPut,
    materiasRespaldoJsonGet
};