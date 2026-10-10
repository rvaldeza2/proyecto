const { Router } = require('express');
const controller = require('../controllers/reporte.controller');

const router = Router();

router.get('/lineas', controller.lineas);
router.get('/estaciones', controller.estaciones);
router.get('/buses', controller.buses);

module.exports = router;
