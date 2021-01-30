const express =  require ('express');
const app = express();
const exphbs= require ('express-handlebars');
const morgan = require ('morgan');
const path = require ('path');


//constantes para inicio de sesion
const mongoose = require ( 'mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const cookieParser = require ('cookie-parser');
const bodyParser = require ('body-parser');
const session = require ('express-session');
 
const uuid = require('uuidv4');
//const { v4: uuidv4 } = require('uuid');
//import { v4 as uuidv4 } from 'uuid';
const { url } = require ('./config/database');
const multer = require('multer');


/* mongoose.createConnection(url,  {
    useNewUrlParser: true,
    useUnifiedTopology:true
  //  useMongoClient:true
}) */


// para la contraseña
require('./config/passport')(passport);



//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join( __dirname , 'views'));
//set para inicio pintar ejs en html
app.set('view engine', 'ejs');
//****---------**** */
app.engine('.hbs', exphbs({
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    defaultLayout: 'main',
    extname:'.hbs',
    helpers: require('./libs/handlebars')
}))
app.set('view engine','.hbs');



//middlewares

app.use(morgan('dev'));
//app.use(express.json());
//app.use(express.urlencoded({extended: false}));
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({    
    limit: '25mb',
    extended:false
}));
//middlewares para inicio de sesion
app.use(cookieParser());
app.use( bodyParser.json({limit: '50mb'}) );
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit:50000
}));
//app.use(bodyParser.json({limit: '25mb'}));
//app.use(bodyParser.urlencoded({extended: false}));
//app.use(bodyParser.urlencoded({extended: true}));
//app.use(bodyParser.json());
app.use(session({
    secret:'iniciodesesionnode',
    resave: false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//middlewares para el storage

//routes
require('./app/routes') (app,passport);

app.use(require('./routes/index.routes'));


//static files 
app.use(express.static('/public/'));

app.use(express.static(path.join(__dirname, '/public')))





module.exports = app;