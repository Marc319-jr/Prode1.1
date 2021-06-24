const Prode = require('../model/Prode');
const User = require('../model/User')

const controller = {
    prode: (req,res) => {
        let prodes = Prode.findAll();
        res.render('../src/views/admin/creacion', {'prodes':prodes});
    },
    crear: (req,res) => {
        let prodeToCreate = Prode.create(req.body)
        console.log("El prode que cree: ");
        console.log(prodeToCreate);
        res.render('../src/views/admin/addteams' , { 'prode' :prodeToCreate});
    },

    crearEquipos: (req,res) => { 
        let id = req.query.id;
        console.log("estoy creando un equipo en el porde numero: " + id);
        let grupNum = req.query.numeroDeGrupo;
        let teamNum = req.query.numeroDeEquipo;
        console.log("El equipo pertenece al prode: " + id + " y al grupo: " + grupNum + " y su numero es: " + teamNum)
        let equipo = {
            ...req.body,
            bandera: req.file ? req.file.filename : 'default',
        }
        console.log("cree A:");
        console.log(equipo);
        let prode = Prode.createTeams(equipo, id, grupNum,teamNum)
        res.render('../src/views/admin/addteams' , { 'prode' :prode});
    },

    administrar: (req,res) => {
        let prodes = Prode.findAll();
        let prode = prodes[req.query.prodeId]
        res.render('../src/views/admin/partidos' , {'prode' : prode})
    },

    crearPartido: (req,res) => {
        let numeroProde = (req.query.prode-1);
        let numeroGrupo = (req.query.grupo-1);
        let numeroPartido = (req.query.partido-1);
        let partido = {
            numeroGrupo,
            numeroPartido,
            numeroProde,
            resultado: [0,0],
            ...req.body
        }
        console.log("creando en el prode: " + (numeroProde+1) + " en el grupo: " + (numeroGrupo+1) + " el partido: " + (numeroPartido+1));
        let prodes = Prode.findAll();
        let prode = prodes[numeroProde];
        prode.grupos[numeroGrupo].partidos.push(partido)
        prodes[numeroProde] = prode;
        Prode.save(prodes)
        let nuevoProdes = Prode.findAll()
        let prodeAmandar = nuevoProdes[numeroProde]
        res.render('../src/views/admin/partidos' , {'prode' : prodeAmandar})
    },

    resultado: (req,res) => {
        let info = {
            prodeId: (req.params.prodeId-1),
            grupoId: req.params.grupoId,
            partidoId: req.params.partidoId,
            ...req.body
        }
        console.log("Voy a crear editar un prode con la siguiente info:")
        console.log(info);
        let prode = Prode.resultado(info);
        User.puntosYposiciones(prode)
        console.log("Edite un prode");
        res.redirect('/')    
    }

}



module.exports = controller;