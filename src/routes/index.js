const express = require('express');
let router = express.Router();
let controller = require('../controller/index')


router.get('/' , controller.index);



module.exports = router
