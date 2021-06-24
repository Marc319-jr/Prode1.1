const express = require('express');
const router = express.Router();
const controller = require('../controller/user');


router.get('/login' , controller.login);
router.get('/register', controller.register);
router.get('/reglas', controller.reglas);
router.get('/create', controller.create);
router.get('/logout' , controller.logout);



router.post('/guardar' ,controller.save);
router.post('/guardar/resultadosUser' , controller.saveUserResult);
router.post('/login' , controller.processLogin);



module.exports = router;