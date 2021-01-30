const archivo = require('./ultimatanda260.json');

const client = require('twilio')(ACCOUNT_SID, AUTH_TOKEN); 
var numeros;
// bucle para recorrer el array de los datos JSON
for (var j = 0 ; j< archivo.length; j++){
     numeros=JSON.stringify(archivo[j].Number1);
    var direccion = archivo[j].Address;
    var nombre = archivo[j].FirstName;
    var ciudad = archivo[j].City;
   
    //console.log(nombre);

    var mensaje = "Hi " + nombre +  " I'm a local investor here in "+ ciudad + ". I purchased a property nearby and saw your house at " + direccion + ". Have you considered selling recently?"; 
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
    .notifications.create(notificationOpts) 
    .then(notification => console.log(notification.sid)) 
    .catch(error => console.log(error)); 

} 

     
// Sending our custom message to all numbers 
// mentioned in array. 
sendBulkMessages(mensaje,[numeros]) // Example +919999999999 

}