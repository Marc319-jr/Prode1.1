const User = require('../model/User')
const Prode = require('../model/Prode')

function userLoggedMiddleWare(req,res,next){
    console.log("Estoy en el middleware de Userlogged");
    let allProdes = Prode.findAll();
    let prode = allProdes[0];
    res.locals.prode = prode;
    if(req.session.userLogged)
    {
        console.log("Hay un usuario logeado");
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged
    }  else {
        console.log("nadie esta logeado");
    };

    next();

};



module.exports = userLoggedMiddleWare