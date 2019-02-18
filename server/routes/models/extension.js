const mongoose = require('mongoose');



const ExtensionSchema = mongoose.Schema({
    userid:{
        type:String,
        required: true
    },
    extensionno:{
        type: String,
        required: true
    },
    displayname:{
        type: String
    },
    outboundcid:{
        type: String,
    },
    password:{
        type: String,
        required:true
    },
    email:{
        type: String
    },
});

const Extension = module.exports = mongoose.model('Extension',ExtensionSchema);