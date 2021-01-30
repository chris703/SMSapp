const { Schema, model } = require("mongoose");

const fileSchema = new Schema({
    filename: {type: String},
    path: {type:String},
    originalname: { type:String },
    mimetype: {type:String},
    size: {type:Number},
    content: {type:Object},
    mensaje: {type:String},
    created_at: {type:Date, default:Date.now() } 
});

module.exports = model('File',fileSchema);