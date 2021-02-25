const mongoose = require ('mongoose');

console.log(process.env.MONGODB_URI)
/* mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser:true,
    useUnifiedTopology:true

}) */
 mongoose.connect('mongodb://localhost/smsdb', {
    useNewUrlParser:true,
    useUnifiedTopology:true

}) 

.then (db => console.log('SMS db is connected'))
.catch(err => console.log(err))