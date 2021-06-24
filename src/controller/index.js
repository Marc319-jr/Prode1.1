const Prode = require('../model/Prode')
const User = require('../model/User');
const controller = { 

    index: (req,res) => {
        let prodes = Prode.findAll();
        let users = User.findAll()
        let prode  = prodes[0];
        res.render('../src/views/index' , {'prode' : prode , 'users': users});
    }
}


module.exports = controller;