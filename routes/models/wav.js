const mongoose = require('mongoose');



const WavSchema = mongoose.Schema({
    fileName: {
        type:String,
        required:true
    },
    userid: {
        type:String,
        required:true
    }
});

const Wav = module.exports = mongoose.model('Wav',WavSchema);