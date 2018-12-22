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
});

const Transaction = module.exports = mongoose.model('Transaction',TransactionSchema);