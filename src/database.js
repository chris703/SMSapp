const mongoose = require ('mongoose');

console.log(process.env.MONGODB_URI)
 mongoose.connect('mongodb+srv://chrisx703:pipejefe1409@cluster0.fpp67.mongodb.net/smsdb?retryWrites=true&w=majority', {
    useNewUrlParser:true,
    useUnifiedTopology:true

}) 
/* mongoose.connect('mongodb://localhost/smsdb', {
    useNewUrlParser:true,
    useUnifiedTopology:true

}) */
 
.then (db => console.log('SMS db is connected'))
.catch(err => console.log(err))