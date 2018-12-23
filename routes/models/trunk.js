const mongoose = require('mongoose');



const TrunkSchema = mongoose.Schema({
    userid:{
        type: String,
        required: true
    },
    trunkname:{
        type: String,
        required: true,
        default:''
    },
    username1:{
        type: String,
        default:''
    },
    password:{
        type: String,
        default:''
    },
    trunkip:{
        type: String,
        default:''
    },
    register:{
        type: Boolean,
        default:false
    },
});

const Trunk = module.exports = mongoose.model('Trunk',TrunkSchema);