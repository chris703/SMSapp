const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
    local: {
        name: String,
        email: String,
        password: String
    },
    
    facebook: {
        email:String,
        password:String,
        id:String,
        token:String
    },
    twitter: {
        email:String,
        password:String,
        id:String,
        token:String
    },
    google: {
        email:String,
        password:String,
        id:String,
        token:String
    },
    
});

//funcion para cifrar contraseña
userSchema.methods.generateHash = function (password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null );
        
};

//validar contraseña de la base de datos con la del input
userSchema.methods.validPassword= function (password){
    return bcrypt.compareSync(password, this.local.password);

};

module.exports = mongoose.model('User',userSchema);