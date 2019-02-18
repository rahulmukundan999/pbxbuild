const mongoose = require('mongoose');



const LextensionSchema = mongoose.Schema({
    userid:{
        type:String,
        required: true
    },
    limit:{
        type:Number,
        required: true
    }
});

const Lextension = module.exports = mongoose.model('Lextension',LextensionSchema);