
const { Router } = require('express');

const { mainGet, planEstudiosGet, calculadoraPromedioGet, cubeGet } = require('../controller/main-controls');


const router = Router();

router.get('/', mainGet);

router.get('/plan-de-estudios', planEstudiosGet);

router.get('/calculadora-promedio', calculadoraPromedioGet);

router.get('/cubo', cubeGet);


module.exports = router;