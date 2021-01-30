const bodyParser = require("body-parser");
const { indexController, sendBulksms } = require("../controllers/index.controller");
const user = require("./models/user");
require('dotenv').config();
//const client = require('twilio')(config.accountSid, config.authToken);



const path = require ('path');


const fs = require("fs");
const uuid = require('uuid');
const File = require ("../app/models/file");
//const servidor = require("../server");
const { sendMessage } = require("../twilio/send-sms");
 const multer = require('multer');

 const storage = multer.diskStorage({
	destination: function(req,file,cb){
		cb(null,'src/public/file')
	},
	filename:function (req,file,cb){
		cb(null,file.originalname)
		//console.log(file);
	}
});   
const maxSize = 5000000;

const upload = multer({storage:storage,  limits: { fileSize: maxSize }, 
	fileFilter: function (req, file, cb) {

		         var filetypes = /json/;
		         var mimetype = filetypes.test(file.mimetype);
		         var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

		         if (mimetype && extname) {
		             return cb(null, true);
		         }
		         cb("Error: File upload only supports the following filetypes - " + filetypes);
		     },
});

//require('../datafile');

			

	
	

	module.exports = (app, passport,) => {
	const express = require("express");
	//const router = express.Router();
	




	
	// index routes
	app.get('/', (req, res) => {
		res.render('index.ejs');
	});
	
	//login view
	app.get('/login', (req, res) => {
		res.render('login.ejs', {
			message: req.flash('loginMessage')
		});
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/menu',
		failureRedirect: '/login',
		failureFlash: true
	}));

	// signup view
	app.get('/signup', (req, res) => {
		res.render('signup.ejs', {
			message: req.flash('signupMessage')
		});
	});
	//menu view
	app.get('/menu',isLoggedIn, (req,res)=>{
		res.render('menu.ejs');
	});

	app.post('/console', indexController,  (req,res)=>{
		res.render('console.hbs')
	});

	app.post('/upload', (req,res)=>{
		res.render('upload.hbs');
	});

	//upload view
	app.get('/upload',isLoggedIn, (req, res) => {
		
		res.render('upload.hbs');
	});
	
	app.post('/bulksms', upload.single('File'), async(req,res)=>{
		const file = new File();
		
		//console.log(file)
		//console.log(req.file);
		file.filename = req.file.filename;
		file.path= '/public/file/' + req.file.filename;
		file.originalname= req.file.originalname;
		file.mimetype = req.file.mimetype;
		file.size = req.file.size; 
		const lectura = 'src/' + file.path;
		const validator = true;
		file.content = 	 fs.readFileSync(lectura,'utf8'); 

		//file.content = 	await JSON.parse(fs.readFileSync(lectura,'utf8')); 
		const contenido = file.content
		console.log(file.content);
		try {
		await file.save();
		console.log(file); 
		//console.log(file.content);
			
		
	} catch(e) {
		console.log(e.message)
	   }	
	
	   const files = await File.find().sort({$natural:-1});;
		
	   //console.log (files);
	   //console.log (files.content);
	   const files2 = await File.findOne();
	   
	   
	   
	   res.render('bulksms.ejs',{ files });
});



//bulksms view
	app.get('/bulksms' ,  async (req,res)=> {
		console.log(req.body.contenido);
		
		const files = await File.find().sort({$natural:-1});;;
		//console.log (files);

		res.render('bulksms.ejs',{ files });

	});
	
 	app.post('/loadList', sendBulksms, (req,res) =>{
		//console.log("presione el boton")
		//console.log(req.file);
		//console.log(req.file.filename);
		//res.send('mensajes mandados');

	}); 
	
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/login',
		failureRedirect: '/signup.ejs',
		failureFlash: true // allow flash messages
	}));

	//menu view
	app.get('/menu', (req,res)=>{
		res.render('menu.ejs', {
			user:req.user
		});
	});	

	//profile view
	
	app.get('/console',indexController,(req, res) => {
		isLoggedIn();
		res.render('console', {
			user:req.user
		});
		/* res.render('index.hbs', {
			user:req.user
		}) */
		
	}); 

	// logout
	app.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/login');
	});
};

function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect('/');
}


