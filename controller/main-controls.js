
const mainGet = (req, res) => {
    res.render('plan-de-estudios');
}

const planEstudiosGet = (req, res) => {
    res.render('plan-de-estudios');
}

const calculadoraPromedioGet = (req, res) => {
    res.render('calculadora-promedio');
}

const administradorGet = (req, res) => {
    res.render('administrador-materias');
}


module.exports = {
    mainGet,
    planEstudiosGet,
    calculadoraPromedioGet,
    administradorGet
}