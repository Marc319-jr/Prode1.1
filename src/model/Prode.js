const fs = require('fs');
const User = require('./User');

const Prode = {
    filename: './src/data/prodes.JSON',
    getData: function(){
        return JSON.parse(fs.readFileSync(this.filename , {encoding: 'utf-8'}));
    },

    findAll: function(){
        return this.getData();
    },
    
    save: function(prodes){
        fs.writeFileSync(this.filename ,JSON.stringify(prodes, null,' '))
        return true
    },

    generateId: function(){
        let allProdes = this.findAll();
        let lastProde = allProdes.pop();
        if(lastProde)
        {
            return lastProde.id + 1;
        }
        else
        return 1;

    },
    teamsCreate: function(number){
        let array = [];
        for(let i =0;i<number;i++)
        {
            array.push({
                id: i+1,
                nombre: '',
                bandera:''
            })
        }
        return array
    },


    gruposCreate: function(numeroGr, numeroTe){
        let array = [];
        for(let i = 0;i<numeroGr;i++)
        {
            array.push({
                id: i+1,
                cantequipos: numeroTe/numeroGr,
                equipos: this.teamsCreate(numeroTe/numeroGr),
                partidos: []

            })
        }
        return array
    },

    create: function(prode){
        let allProdes = this.findAll();
        let newProde = {
            id: this.generateId(),
            nombre:prode.nombre,
            cantequipos: prode.teamnum,
            cantgrupos: prode.groupnum, 
            grupos: this.gruposCreate(prode.groupnum, prode.teamnum)
        }
        allProdes.push(newProde);
        fs.writeFileSync(this.filename ,JSON.stringify(allProdes, null,' '))
        return newProde
    },

    createTeams: function(equipo,prode,grupo,numero){
        let allProdes = this.findAll();
        equipo.id = numero
        allProdes[prode-1].grupos[grupo-1].equipos[numero-1] = equipo
        fs.writeFileSync(this.filename ,JSON.stringify(allProdes, null,' '))
        return  allProdes[prode-1]
    },

    resultado: function(info){
    let allProdes = this.findAll();
    let prode = allProdes[info.prodeId];
    let resultadoPartido = [info.local,info.visitante];
    console.log(resultadoPartido);
    prode.grupos[info.grupoId].partidos[info.partidoId].resultado = resultadoPartido;
    allProdes[info.prodeId] = prode;
    fs.writeFileSync(this.filename ,JSON.stringify(allProdes, null,' '))
    return prode
    }
}



module.exports = Prode;