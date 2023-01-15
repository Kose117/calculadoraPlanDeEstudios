
const { Router } = require('express');
const { check } = require('express-validator')

const {
    clasesJsonGet, clasesJsonPut,
    materiasJsonGet, materiasJsonPut,
    materiasRespaldoJsonGet
} = require('../controller/json-controls');
const { validate_params } = require('../middlewares/validate-params');


const router = Router();

router.get('/clases', clasesJsonGet);

router.put('/clases', [
    check('codigo', 'El código de materia es obligatorio').not().isEmpty(),
    validate_params
], clasesJsonPut);

router.get('/materias', materiasJsonGet);

router.put('/materias', materiasJsonPut);

router.get('/materias-respaldo', materiasRespaldoJsonGet);


module.exports = router;