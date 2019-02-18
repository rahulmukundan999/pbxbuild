const mongoose = require('mongoose');



const TransactionSchema = mongoose.Schema({
    userid:{
        type:String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    amount:{
        type: String,
        default:''
    },
    paymentId:{
        type: String,
    },
    status:{
        type: String,
        default:''
    },
    created: {
        type:String,
        required:true
    },
    localDate: {
        type:String,
        required:true
    }
});

const Transaction = module.exports = mongoose.model('Transaction',TransactionSchema);