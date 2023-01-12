
const mainGet = (req, res) => {
    res.render('plan-de-estudios');
}

const planEstudiosGet = (req, res) => {
    res.render('plan-de-estudios');
}

const calculadoraPromedioGet = (req, res) => {
    res.render('calculadora-promedio');
}

module.exports = {
    mainGet,
    planEstudiosGet,
    calculadoraPromedioGet
}