const fs = require('fs');
const User = require('./User');
const Prode = require('./Prode');

const Resultado = {
    allProdes : Prode.findAll(),
    allUsers : User.findAll(),
    puntosPartido : function(resultadoUser, resultadoCopa){
        let resultadoOriginal = resultadoCopa[0] - resultadoCopa[1];  // [2,0]
        let resultadoOriginalUser = resultadoUser[0] - resultadoUser[1]; // [3,3]
        let puntos;
        if(resultadoCopa == resultadoUser)
        {
            puntos = 3;
        }
        else if(resultadoOriginal == resultadoOriginalUser){
            puntos = 1 
        } else if(resultado > 0){
            stringResultado = "Local"
        }else if(resultado < 0){
            stringResultado = "Visita"
        }
        return stringResultado
    }    
}