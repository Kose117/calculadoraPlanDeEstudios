
const { Router } = require('express');
const { check } = require('express-validator')

const {
    clasesJsonGet, clasesJsonPut, clasesJsonDelete,
    carreraJsonGet, carreraJsonPut, carreraJsonDelete,
    clasesRespaldoJsonGet, carreraJsonPost, modificarDefinitivaSemestre
} = require('../controller/json-controls');
const { validate_params } = require('../middlewares/validate-params');


const router = Router();

router.get('/clases', clasesJsonGet);

router.put('/clases', [
    check('codigo', 'El código de materia es obligatorio').notEmpty(),
    check('semestre', 'El semestre tiene que ser un entero positivo').notEmpty().isInt({min:0}),
    check('nota', 'La nota debe ser un numero entre 0 y 5').notEmpty().isFloat({min:0, max:5}),
    validate_params
], clasesJsonPut);

router.delete('/clases', [
    check('codigo', 'El código de materia es obligatorio').notEmpty(),
    validate_params
], clasesJsonDelete);

router.get('/carrera', carreraJsonGet);

router.put('/carrera', [
    check('codigo', 'El código de materia es obligatorio').notEmpty(),
    check('semestre', 'El semestre tiene que ser un entero positivo').notEmpty().isInt({min:0}),
    check('nota', 'La nota debe tener una definitiva').notEmpty().isObject(),
    check('nota.definitiva', 'La nota debe ser un numero entre 0 y 5').notEmpty().isFloat({min:0, max:5}),
    check('nota.notas', 'La nota debe tener notas parciales').isArray(),
    validate_params
], carreraJsonPut);

router.post('/carrera', [
    check('codigo', 'El código de materia es obligatorio').notEmpty(),
    check('semestre', 'El semestre tiene que ser un entero positivo').notEmpty().isInt({min:0}),
    check('definitiva', 'La nota debe ser un numero entre 0 y 5').notEmpty().isFloat({min:0, max:5}),
    check('tipo').notEmpty(),
    check('creditos').notEmpty().isInt({min:0}),
    check('nombre').notEmpty(),
    validate_params
],carreraJsonPost);

router.delete('/carrera', [
    check('codigo', 'El código de materia es obligatorio').notEmpty(),
    check('semestre', 'El semestre tiene que ser un entero positivo').notEmpty().isInt({min:0}),
    validate_params
], carreraJsonDelete);

router.get('/clases-respaldo', clasesRespaldoJsonGet);

router.put('/carrera/definitiva', [check('definitiva', 'La nota debe ser un numero entre 0 y 5').notEmpty().isFloat({min:0, max:5})]
,modificarDefinitivaSemestre);


module.exports = router;