const config = require ('../config');
//const client = require('twilio')('AC875307f64b4ca7ff113574240fd32e1a', 'e10b0722faf5682ef79293eb51185332');
//const client = require('twilio')('AC875307f64b4ca7ff113574240fd32e1a', '913a083d6a9307888ce913ffa0d8648f');
//const client = require('twilio')(config.accountSid, config.authToken);
const client = require('twilio')('AC875307f64b4ca7ff113574240fd32e1a', '3f2dcebafd7a123299f97e3ef95e3fef');


/**
 * Send a SMS message
 * @param {string} body  - sms body
 * @param {string} phone -phone number
 */

async function sendMessage (body, phone){
    try {
        const message = await client.messages.create({
             to: phone,
            from: '+19403504552',
            //from: '+12138949764',
            body,
        })
       //console.log(message)
        return message;
        
    } catch (error) {
        console.log( "aqui es el error" + error );
        console.log("credenciales" + " " + client.username + client.password);
    }
   console.log(message.from);

    
}
module.exports = {sendMessage};
