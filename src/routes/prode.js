const express = require('express');
const router = express.Router();
const controller = require('../controller/prode');

//configuracion de multer
const path = require('path');
let multer = require('multer');
let storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,path.join(__dirname, '/../../public/image/equipos/'))
    },
    filename: (req,file,callback) => {
        const newFileName = 'Bandera-' + Date.now() + path.extname(file.originalname);
        callback(null,newFileName);
    }
});
let fileUpload = multer({storage});
//Fin de la configuracion!


router.get('/' , controller.prode)
router.get('/administrar' , controller.administrar);


router.post('/crear' , controller.crear);
router.post('/crearEquipos' ,fileUpload.single('bandera') , controller.crearEquipos);
router.post('/crearPartido' , controller.crearPartido);
router.post('/:grupoId/:partidoId/:prodeId' , controller.resultado);




module.exports = router;