const MessagingResponse = require ('twilio').twiml.MessagingResponse;
const {sendMessage}= require('../twilio/send-sms')
const SMS = require('../models/sms');
const user = require("../app/models/user");
const File = require ("../app/models/file");
//necessary files for bulksms
const config = require ('../config.js');
const NOTIFY_SERVICES_SID = 'IScc3c571a9e67e9887f0d0d48f32d8cd3';
//const NOTIFY_SERVICES_SID = 'MG73a78b94bc027397982ce98c785246d2';
const accountSid = 'AC875307f64b4ca7ff113574240fd32e1a';
const authToken = '913a083d6a9307888ce913ffa0d8648f';


const client = require ('twilio')(accountSid, authToken,NOTIFY_SERVICES_SID);
//const client = require('twilio')(config.accountSid, config.authToken,config.notifyServiceSid);
//const upload = multer({storage:storage});

const fs = require("fs");

const { twiml } = require('twilio');
//const { file } = require('../app/routes');

const {getSocket} = require ('../sockets')

//const {isLoggedIn}= require('../app/routes');

const indexController = async (req,res) =>{
    const messages = await SMS.find().sort('-createdAt').lean();
    //messages.forEach(m=> console.log(m.Body));
     

    if (req.isAuthenticated()) {
		return res.render('console', {messages});
	}else{

    return res.redirect('/');
}
    res.render('console', {messages});
    //console.log ("estoy en el indexcontroller"); 
    

}
   
//fragmento de codigo no funciona
/*const sendBulksms = async(req,res) =>{
        console.log('este es el config ssid '+ NOTIFY_SERVICES_SID);
        //console.log(config.authToken);
        const nuevo  = req.body.contenido;
        const nuevo2 = JSON.parse(nuevo);
        //
        var numeros;

       
        function enviar(){
            // bucle para recorrer el array de los datos JSON
            for (var j = 0 ; j< nuevo2.length; j++){
                numeros=JSON.stringify(nuevo2[j].Number1);
                var direccion = nuevo2[j].Address;
                var nombre = nuevo2[j].FirstName;
                var ciudad = nuevo2[j].City;
                console.log('NUMEROS ' + numeros);
                //console.log(nombre);
            
                var mensaje= "Hi " + nombre +  " I work with a group of investor who buys property in "+ ciudad+ ". We purchased a property nearby and saw your house at " + direccion + ". Have you considered selling it recently for all cash?" 
               // var mensaje = "Hi " + nombre +  " I'm a local investor here in "+ ciudad + ". I purchased a property nearby and saw your house at " + direccion + ". Have you considered selling recently?"; 
                console.log( mensaje);
            
            
            //console.log(numeros);
            
            
            
            
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
                .services(NOTIFY_SERVICES_SID)
                //.services('IScc3c571a9e67e9887f0d0d48f32d8cd3')
                console.log('esto esta antes del notifications')
                .notifications.create(notificationOpts)
                //.notifications.create(notificationOpts)
                //.notifications.create(notificationOpts) 
                .then(notification => console.log(notification.sid)) 
                .catch(error => console.log(error)); 
            
            } 
            
                 
            // Sending our custom message to all numbers 
            // mentioned in array. 
            sendBulkMessages(mensaje,[numeros]) // Example +919999999999 
            
            }
            }
            enviar();
    
    res.send('DONE!');
}*/
const sendBulksms = async(req,res) =>{
    const nuevo  = req.body.contenido;
    const nuevo2 = JSON.parse(nuevo);
    //
    var numeros;
    function enviar(){
    // bucle para recorrer el array de los datos JSON
    for (var j = 0 ; j< nuevo2.length; j++){
        numeros=JSON.stringify(nuevo2[j].Number1);
        var direccion = nuevo2[j].Address;
        var nombre = nuevo2[j].FirstName;
        var ciudad = nuevo2[j].City;
        console.log('NUMEROS ' + numeros);
        //console.log(nombre);
    
        //MENSAJE 2024
       //var mensaje = "This is a test"
       var mensaje = "Hi sorry for the random call my name is Ivan I'm a Local Buyer i saw your property in " + direccion
         + "and i wonder if you have considered sell the property or at least receive an offer i can pay cash";
       // var mensaje = "Hi " + nombre + " my name is ivan I'm a Buyer.. I was driving and saw your house in " + direccion +" have you consider receiving some offer? ..If u are interesting please let me.know we can can discuss here or make an appointment to talk about it personally have a good day I will be pending of your answer";
       //var mensaje = "Hi " + nombre + " my name is ivan I'm a local real estate investor I was driving and saw your house in " + direccion +" have you considered receiving some cash offer? ..If u are interesting please let me.know we can can discuss here or make an appointment to talk about it personally have a good day I will be pending of your answer"
        //var mensaje ="Hi " +nombre+ ", I’m Paul and a local investor. I just bought a house near yours at " +direccion+ "Have you thought about selling recently?" 
        //var mensaje= "Hi " + nombre +  " I work with a group of investor who buys property in "+ ciudad+ ". We purchased a property nearby and saw your house at " + direccion + ". Have you considered selling it recently for all cash?" 
       //var mensaje = "Hi, Sorry to text you out of blue. Is this"+" "+ nombre +"?" ; 
       //var mensaje = "Hi " + nombre +  " I work with a group of investor who buys property in "+ ciudad + ". We purchased a property nearby and saw your house at " + direccion + ". Have you considered selling it recently"
       console.log( mensaje);
       const timer = 1000;
    setTimeout(() => {
        console.log("tiempo de espera"  )
      }, timer);
// User-defined function to send bulk SMS to desired
// numbers bypassing numbers list as parameter
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
   
    //client.notify
    client.notify.v1.services(NOTIFY_SERVICES_SID)
    //.services('IScc3c571a9e67e9887f0d0d48f32d8cd3')
    .notifications.create(notificationOpts)
    .then(notification => console.log(notification.sid))
    .catch(error => console.log(error));
    
}
sendBulkMessages(mensaje,
    [numeros])
}

}
enviar();
res.send('DONE!');

}

//enviar mensajes de texto individuales
const postMessage = async(req,res) =>{
    const {message,phone} = req.body;
    if(!message || !phone) return res.json('Missing message or phone');


    const result = await sendMessage(req.body.message, req.body.phone)

    console.log(result.sid)
    //15304268027‬
    await SMS.create({Body:req.body.message,To:req.body.phone })
    res.redirect('/console')
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
