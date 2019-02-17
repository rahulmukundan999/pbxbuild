const express = require('express');
const router = express.Router();
const Contact = require('./models/contacts');
const Extension = require('./models/extension');
const Lextension = require('./models/lextension');
const Trunk = require('./models/trunk');
const Extension1 = require('./models/extension');
const Inbound = require('./models/inbound');
const Outbound = require('./models/outbound');
const Transaction = require('./models/transaction');
const Ring = require('./models/ring');
const mongoose = require('mongoose');
const Wav = require('./models/wav');
const Receptionist = require('./models/receptionist');
var builder = require('xmlbuilder');
var fs = require('fs');
var multer = require('multer');
var User = require('./models/user');
const jwt = require('jsonwebtoken');
var a =  require('./verify/verifys.js');
var verify = new a();
var b = require('./verify/mail.js');
const paypal = require('paypal-rest-sdk');
var mail = new b();
var c = require('./message/mailSend.js');
var invoice = new c();
//const keyPublishable = process.env.PUBLISHABLE_KEY;
//const keySecret = process.env.SECRET_KEY;
const stripe = require("stripe")('sk_test_mjlCuBBzkf4cfBU3arpajjDU');
//console.log(b.check());



paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AeKIfAx7QGuQpdHYiomDZJ6yZbq4v4IDNbIhz4Io9S9WxRwyeWfIcv582AEmaEKF7m2QvRj_-6PMAo7E',
    'client_secret': 'EOkPIUsTZ_Fuf0DXVCcPiVUsmHvLob4HaIPVWkZFucrUajeU21p-3ZJLbNHytOJV5yb55PmgNkCDMyus'
  });



module.exports = function(router, passport) {  


router.get("/api/lextension", function(req, res) {
console.log(req.headers['limit']);
    Lextension.findOne({userid:req.headers['userid']},function(err,user){
        if(user) {
    //res.json(500);
    console.log('found',user);
    var user=user;
    Lextension.findByIdAndUpdate(user._id,{$set:{limit:req.headers['limit']}},{new:true}, (err, todo) => {
        console.log(todo);
        // Handle any possible database errors
            if (err) {
            res.json({msg:'error'});
            }
            //alert('Mail Verified Successfully');
            res.json({msg:"Updated"});

        });
        }
        else {
            res.json({msg:'failed'});
        }
    });
}); //retrive limit
    router.get('/api/limit',verify.common,(req,res,next)=>{
        jwt.verify(req.token, 'secretkey',(err,authData)=>{
            if(err) {
                res.sendStatus(403);
            } else {
    Lextension.find({userid: req.headers['user']},function(err,limit){
        res.json(limit);
    });
            } 
        });
    });
 
require('./modules/admin')(router);    
require('./modules/login')(router,jwt,passport,User);
require('./modules/confirm')(router,User);
require('./modules/extension')(router,jwt,builder,Extension,fs,verify);
require('./modules/contacts')(router,verify,jwt,Contact);
require('./modules/outbound')(router,jwt,verify,Outbound,builder,fs);
require('./modules/inbound')(router,verify,jwt,fs,builder,Inbound);
require('./modules/trunks')(router,jwt,verify,Trunk,builder,fs);
require('./modules/rings')(router,verify,jwt,builder,Ring,fs);
require('./modules/receptionist')(router,jwt,verify,Receptionist,builder,fs,Wav,multer);

//Retrive extensions 



    


























// Add User


router.post('/api/user',(req,res,next)=>{

    var usercheck = req.body.name;
console.log(usercheck);
    User.findOne({username:usercheck},function(err,user){
            if(user) {
        res.json(500);
        console.log('found',user);
            } else {
    console.log('not',user);
    var newUser = new User();
    var newUser = new User({
        username: req.body.name.toLowerCase(),
        email: req.body.email,
        phone: req.body.phone,
        password: newUser.generateHash(req.body.password)
    })
    

    newUser.save((err,user)=>{
        req.login(user, function(err) {
            if (err) {
              return next(err);
            }
            mail.check(user);
            res.json(100);
          });
    })  
}
    });
});
































    











    















router.put('/api/contact/:id',function(req,res){
console.log('update a vdeo');
Contact.findByIdAndUpdate(req.params._id,
{
    $set: { firstname:req.params.firstname, 
        lastname: req.params.lastname, 
        company: req.body.company,
        mob: req.body.mob,
        mob2: req.body.mob2,
        home: req.body.home,
        home2: req.body.home2,
        business: req.body.business,
        business2: req.body.business2,
        email: req.body.email,
        other: req.body.other,
        bfax: req.body.bfax,
        hfax: req.body.hfax,
        ofax: req.body.ofax}

},
{
    new:true
},
function(err,updatedcontact){
    if(err)
    {
        res.send('error');
    }
    else{
        res.json(updatedcontact);
    }
}
);

});
router.post("/api/charge", (req, res) => {
        let index = req.body.index;
        var id = req.body.id;
        let extension = req.body.extension;
        let amount = req.body.amount;
        var email;
        User.findOne({_id: id},function(err,user){
            if(err) {

            } else {
                email = user.email;
            }
        });
        console.log(email);
        // 500 cents means $5 
        if(index === 1) {
         console.log(req.body.token);
        // create a customer 
        stripe.customers.create({
            email: 'rahulmukundan999@gmail.com', // customer email, which user need to enter while making payment
            source: req.body.token // token for the given card 
        })
        .then(customer =>{
            console.log(customer);
            stripe.charges.create({ // charge the customer
            amount,
            description: "Sample Charge",
                currency: "usd",
                customer: customer.id
            },function(err,charge) {
                if(err) {
                    res.json({msg:err,status:400});
                } else {
                    console.log(charge);
                    User.findByIdAndUpdate(id,{$set:{paid:true}},{new:true}, (err, todo) => {
                        // Handle any possible database errors
                            if (err) {
                            return res.status(500).send(err);
                            }
                            //console.log(user);
                            //console.log(user._id);
            var a = new Lextension({
                userid:id,
                limit:extension
            });
            console.log(a);
            a.save((err,lextension)=>{
                if(err)
                {    //res.json({msg:'Failed to add extension limit'});
                }
                else{              
                   //res.json({msg:'Limit added'})
                }
            });
            var transactionData = new Transaction({
                userid:id,
                type:'Stripe',
                amount:amount,
                paymentId:charge.id,
                status:'paid',
                created: charge.created,
                localDate:Math.floor(Date.now() / 1000)
            });
            transactionData.save((err,transaction)=>{
                if(err) {

                } else {

                }
            });
                            //alert('Mail Verified Successfully');
                            invoice.sendInvoice({
                            amount:amount,
                            paymentId:charge.id,
                            type:'Credit/Debit card',
                            email:email
                        });
                            res.json({msg:charge,status:200});
                        });
                }
            })
        })
 // render the charge view: views/charge.pug
    } else if(index === 2) {
        var pid = req.body.paymentId;
            User.findByIdAndUpdate(id,{$set:{paid:true}},{new:true}, (err, todo) => {
                // Handle any possible database errors
                    if (err) {
                    return res.status(500).send(err);
                    }
                    //console.log(user);
                    //console.log(user._id);
    var a = new Lextension({
        userid:id,
        limit:extension
    });
    console.log(a);
    a.save((err,lextension)=>{
        if(err)
        {
            //res.json({msg:'Failed to add extension limit'});
        }
        else{
            
           //res.json({msg:'Limit added'});

        }
    })
    var transactionData = new Transaction({
        userid:id,
        type:'Paypal',
        amount:amount,
        paymentId:pid,
        status:'paid',
        created: Math.floor(Date.now() / 1000),
        localDate: Math.floor(Date.now() / 1000)
    });
    transactionData.save((err,transaction)=>{
        if(err) {

        } else {

        }
    });
                    //alert('Mail Verified Successfully');
                    invoice.sendInvoice({
                        amount:amount,
                        paymentId:pid,
                        type:'Paypal',
                        email:email
                    });
                    res.json({msg:'paid',status:200});
                });
        }
    });
    
    

router.get('/api/paypal',(req,res)=> res.sendfile('./views/index.html'));
router.get('/api/success',(req,res)=>{
const payerId = req.query.PayerID;
const paymentId = req.query.paymentId;
console.log('payer',payerId);
console.log('payment',paymentId);
const paymentjson = {
    "payer_id":payerId,
    "transactions":[{
        "amount":{
            "currency":"USD",
            "total":"25"
        }
    }]
};
paypal.payment.execute(paymentId,paymentjson,function (error,payment){
    if(error) {
        console.log(error.response);
        throw error;
    } else {
        console.log(JSON.stringify(payment));
        res.redirect('/#/login')
        res.json({status:200,message:'Success'});
    }
})
});
router.get('/api/paymentsuccess',(req,res)=>{
var a = req.query.source;
console.log('a',a); 
stripe.charges.create({
    amount: 1099,
    currency: "eur",
    source: a,
  }, function(err, charge) {
      if(err) {
      console.log(err);
      res.json({msg:'Sorry Payment Not Succedded'});
      } else {
      console.log('charge',charge.succeeded);  
    res.json({msg:"Success",status:charge.status});
      }
    // asynchronously called
  });
});

}