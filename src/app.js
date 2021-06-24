const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session')
app.use(express.static('public'));



//uso de ssesiones para los usuarios logeados
app.use(session({secret: 'Shh, Its a secret',
                 resave: false,
                 saveUninitialized: false}));


app.use(express.static(path.resolve(__dirname, '../public')));

//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({ extended: false }));

//Declaraciones necesarias para PUT Y DELETE
const methodOverrider = require('method-override');
app.use(methodOverrider("_method"));

//motor de EJS
app.set('view engine', 'ejs');


//middlewares
const userLoggedMiddleWare = require('./middlewares/userLogged');

app.use(userLoggedMiddleWare);


//rutas
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const prodeRouter = require('./routes/prode');
 

app.use('/' , indexRouter)
app.use('/user', userRouter);
app.use('/prode' , prodeRouter);




//Levantamos servidor y por si nos dan un puerto
//Levantamos servidor y por si nos dan un puerto
const port = process.env.PORT || 3000;
app.listen(port , () => {
    console.log("running on server " + port);
})



