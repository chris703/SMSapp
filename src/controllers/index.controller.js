const MessagingResponse = require ('twilio').twiml.MessagingResponse;
const {sendMessage}= require('../twilio/send-sms')
const SMS = require ('../models/sms');
const { twiml } = require('twilio');

const {getSocket} = require ('../sockets')

const indexController = async (req,res) =>{
    const messages = await SMS.find().sort('-createdAt').lean();
    //messages.forEach(m=> console.log(m.Body));
    res.render('index', {messages})
} 

const postMessage = async(req,res) =>{
    const {message,phone} = req.body;
    if(!message || !phone) return res.json('Missing message or phone');


    const result = await sendMessage(req.body.message, req.body.phone)
    
    console.log(result.sid)

    await SMS.create({Body:req.body.message,To:req.body.phone })
    res.redirect('/')
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
    twiml.message('this is the response'); 
        
    res.send(twiml.toString());
    //res.send('received')

}

module.exports = {
    indexController,
    postMessage,
    receiveMessage

}