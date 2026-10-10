const { Router } = require('express');
const controller = require('../controllers/auth.controller');

const router = Router();

router.post('/login', controller.login);
router.get('/perfil', controller.autenticar, controller.perfil);

module.exports = router;
