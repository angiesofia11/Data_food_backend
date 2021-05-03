const express = require('express'); //importar express
const morgan = require('morgan');
const router = require('./routes');
const bodyPArser = require('body-parser');
const cors = require('cors');

const app = express(); //Instancia de Expres, la app hecha en express
app.use(cors());

//middleware morgan para detectar peticiones
app.use(morgan('dev'));

app.use(bodyPArser.json());
app.use(bodyPArser.urlencoded({ extended: true }));


//manejador de rutas 
app.use('/api', router);



app.set('PORT', process.env.PORT || 3000);


app.listen(app.get('PORT'), ()=>{
    console.log('Server up'); 
});



module.exports = app;

/*app.use('/api', router);

app.set('port', process.env.PORT || 3000);



if (process.env.NODE_ENV !== 'test') {
    app.listen(app.get('port'), () => {
        console.log('Server on port ' + app.get('port') + ' on dev');
    });
}

module.exports = app;*/