
const { Router } = require('express');

const {
    clasesJsonGet, clasesJsonPut,
    materiasJsonGet, materiasJsonPut,
    materiasRespaldoJsonGet
} = require('../controller/json-controls');


const router = Router();

router.get('/clases', clasesJsonGet);

router.put('/clases', clasesJsonPut);

router.get('/materias', materiasJsonGet);

router.put('/materias', materiasJsonPut);

router.get('/materias-respaldo', materiasRespaldoJsonGet);


module.exports = router;