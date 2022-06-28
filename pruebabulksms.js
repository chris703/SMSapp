
const client = require('twilio')(ACCOUNT_SID, AUTH_TOKEN);
const nuevo = require('./src/public/file/test.json');
console.log ('imprime algo' +nuevo);

// User-defined function to send bulk SMS to desired
// numbers bypassing numbers list as parameter

  console.log('este es el config ssid '+ SERVICE_SID);
  
  //const nuevo2 = JSON.parse(nuevo);
  //
  var numeros;

 
  function enviar(){
      // bucle para recorrer el array de los datos JSON
      for (var j = 0 ; j< nuevo.length; j++){
          numeros=JSON.stringify(nuevo[j].Number1);
          var direccion = nuevo[j].Address;
          var nombre = nuevo[j].FirstName;
          var ciudad = nuevo[j].City;
          console.log('NUMEROS ' + numeros);
          //console.log(nombre);
      
          var mensaje= "Hi " + nombre +  " I work with a group of investor who buys property in "+ ciudad+ ". We purchased a property nearby and saw your house at " + direccion + ". Have you considered selling it recently for all cash?" 
         // var mensaje = "Hi " + nombre +  " I'm a local investor here in "+ ciudad + ". I purchased a property nearby and saw your house at " + direccion + ". Have you considered selling recently?"; 
          console.log( mensaje);
      
      
      //console.log(numeros);
      
      }
      }
      enviar(); 
      
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
          .services(SERVICE_SID)
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
      sendBulkMessages('mensaje','+12134650736') // Example +919999999999 
      
      
      
      
     
      
res.send('DONE!');


