const config = require ('../config');
const client = require('twilio')(config.accountSid, config.authToken);

/**
 * Send a SMS message
 * @param {string} body  - sms body
 * @param {string} phone -phone number
 */

async function sendMessage (body, phone){
    try {
        const message = await client.messages.create({
             to: phone,
            from: '+12138949764',
            body
        })
       //console.log(message)
        return message;
        
    } catch (error) {
        console.log(error);
        
    }
    
}
module.exports = {sendMessage};