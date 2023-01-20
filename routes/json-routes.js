
const { Router } = require('express');
const { check } = require('express-validator')

const {
    clasesJsonGet, clasesJsonPut, clasesJsonDelete,
    carreraJsonGet, carreraJsonPut, carreraJsonDelete,
    clasesRespaldoJsonGet
} = require('../controller/json-controls');
const { validate_params } = require('../middlewares/validate-params');


const router = Router();

router.get('/clases', clasesJsonGet);

router.put('/clases', [
    check('codigo', 'El código de materia es obligatorio').not().isEmpty(),
    check('semestre', 'El semestre tiene que ser un entero positivo').notEmpty().isInt({min:0}),
    check('nota', 'La nota debe ser un numero entre 0 y 5').notEmpty().isFloat({min:0, max:5}),
    validate_params
], clasesJsonPut);

router.delete('/clases', [
    check('codigo', 'El código de materia es obligatorio').not().isEmpty(),
    validate_params
], clasesJsonDelete);

router.get('/carrera', carreraJsonGet);

router.put('/carrera', [
    check('codigo', 'El código de materia es obligatorio').not().isEmpty(),
    check('semestre', 'El semestre tiene que ser un entero positivo').notEmpty().isInt({min:0}),
    validate_params
], carreraJsonPut);

router.delete('/carrera', [
    check('codigo', 'El código de materia es obligatorio').not().isEmpty(),
    check('semestre', 'El semestre tiene que ser un entero positivo').notEmpty().isInt({min:0}),
    validate_params
], carreraJsonDelete);

router.get('/clases-respaldo', clasesRespaldoJsonGet);


module.exports = router;