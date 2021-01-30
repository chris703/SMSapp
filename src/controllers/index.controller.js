const MessagingResponse = require ('twilio').twiml.MessagingResponse;
const {sendMessage}= require('../twilio/send-sms')
const SMS = require('../models/sms');
const user = require("../app/models/user");
const File = require ("../app/models/file");
//necessary files for bulksms
const config = require ('../config.js');
const client = require('twilio')(config.accountSid, config.authToken,config.notifyServiceSid);

//const upload = multer({storage:storage});

const fs = require("fs");

const { twiml } = require('twilio');
const { file } = require('../app/routes');

const {getSocket} = require ('../sockets')

const {isLoggedIn}= require('../app/routes');

const indexController = async (req,res) =>{
    const messages = await SMS.find().sort('-createdAt').lean();
    //messages.forEach(m=> console.log(m.Body));
     

    if (req.isAuthenticated()) {
		res.render('console', {messages});
	}else{

    res.redirect('/');
}
    res.render('console', {messages});
    //console.log ("estoy en el indexcontroller"); 
    

}
   

const sendBulksms = async(req,res) =>{
        console.log(config.notifyServiceSid);
        console.log(config.authToken);
        const nuevo  = req.body.contenido;
        const nuevo2 = JSON.parse(nuevo)
        //console.log(nuevo2);
        var numbers;
        for(var i=0;i<nuevo2.length;i++){
            var numbers=JSON.stringify(nuevo2[i].Number1);
            var address = nuevo2[i].Address;
            var names = nuevo2[i].FirstName;
            var city = nuevo2[i].City;
           
            
            var mensaje = "Hi " + names +  " I'm a local investor here in "+ city + ". I purchased a property nearby and saw your house at " + address + ". Have you considered selling recently?";  
            console.log( numbers + mensaje);

            //sending function
            function sendBulkMessages(messageBody, numberList) 
            { 
            var numbers = []; 
            for(i = 0; i < numberList.length; i++) 
             { 
            numbers.push(JSON.stringify({  
            binding_type: 'sms', address: numberList[i]})) 
            } 
   
    const notificationOpts = { 
      toBinding: numbers, 
      body: messageBody, 
      

        }; 

    client.notify 
    .services(config.notifyServiceSid)
    
    //.services(NOTIFY_SERVICES_SID) 
    
    .notifications.create(notificationOpts) 
    .then(notification => console.log(notification.sid)) 
    .catch(error => console.log(error)); 

    } 
      
    }
    sendBulkMessages(mensaje,[numbers]); 
    
    
    res.send('mensaje mandado');
}

const postMessage = async(req,res) =>{
    const {message,phone} = req.body;
    if(!message || !phone) return res.json('Missing message or phone');


    const result = await sendMessage(req.body.message, req.body.phone)
    
    console.log(result.sid)
    //15304268027‬
    await SMS.create({Body:req.body.message,To:req.body.phone })
    res.redirect('console')
    //console.log(response.sid)
    //res.send('received')
}

const receiveMessage = async (req,res)=>{
    console.log(req.body.Body);

    const savedSMS = await SMS.create({
        Body: req.body.Body,
        From: req.body.From
    })

    getSocket().emit('new message', savedSMS);

    const twiml = new MessagingResponse ();
    // this line is for response from twilio
    //twiml.message('this is the response'); 
        
    res.send(twiml.toString());
    //res.send('received')

}

module.exports = {
    indexController,
    postMessage,
    receiveMessage,
    sendBulksms

}