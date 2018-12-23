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


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'routes/uploads')
    },
    filename: (req, file, cb) => { 
      cb(null,file.originalname + Date.now() );
    }
});
const upload = multer({storage:storage});


module.exports = function(router, passport) {  

// login post
router.post('/api/login', passport.authenticate('local-login',{failureRedirect:'/api/fail'}), function(req, res) {
    if(req.user) {
      //  res.json(req.user);
        jwt.sign({user:req.user},'secretkey',(err,token)=>{
            res.json({
                status:200,
                token:token,
                user:req.user
            });
        });
       
    } else {
        res.json({status:500});
    }
  });
  router.get("/api/fail", function(req, res) {
    res.json({status:500});
  });
    // loggedin
 router.get("/api/loggedin", function(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
      });
 
router.get("/api/confirmation/:token/:check", function(req, res) {
    console.log('token',req.params.token);
    console.log('check',req.params.check);
   // var url = 'http://localhost:3000/api/confiramtion/'+req.params.token+'/'+req.params.check;
    //console.log(url);

    User.findOne({_id:req.params.token},function(err,user){
        if(user) {
    //res.json(500);
    console.log('found',user);
    User.findByIdAndUpdate(req.params.token,{$set:{active:true}},{new:true}, (err, todo) => {
        // Handle any possible database errors
            if (err) {
            return res.status(500).send(err);
            }
            //alert('Mail Verified Successfully');
            return res.redirect('/#/login');

        });
        }
        else {
            res.sendStatus(403);
        }
    });
});
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
});
       // handle logout
 router.post("/api/logout", function(req, res) {
        req.logOut();
        res.send(200);
      })

//retrieve user
router.get('/api/login',(req,res,next)=>{
    console.log(req.query.password);
   var reg = new RegExp(req.query.name, "i")
   query = {description: reg};
    User.findOne({name:req.query.name,
        password:req.query.password}
        ,function(err,user){
            if(err) {
        res.json({msg:100});
            } 
                res.json({msg:200,user:user});
    }) 
    });

//retrive receptionist
router.get('/api/receptionists',(req,res,next)=>{
    Receptionist.find(function(err,receptionists){


       /* var xml= builder.create('include');
        xml.ele('configuration',{'name':'ivr.conf','description':'IVR menus'})
        .ele('menus') 
        .ele('menu',{'name':'demo_ivr','greet-long':'phrase:demo_ivr_main_menu','greet-short':'phrase:demo_ivr_main_menu_short','invalid-sound':'ivr/ivr-that_was_an_invalid_entry.wav','exit-sound':'voicemail/vm-goodbye.wav','timeout':'10000','inter-digit-timeout':'2000','max-failures':'3','digit-len':'4'})
        .ele('entry',{'action':'menu-exec-app','digits':'1','param':'bridge sofia/$${domain}/888@conference.freeswitch.org'}).up()
        .ele('entry',{'action':'menu-exec-app','digits':'2','param':'transfer 9996 XML default'}).up()
        .ele('entry',{'action':'menu-exec-app','digits':'3','param':'transfer 9999 XML default'}).up()
        .ele('entry',{'action':'menu-exec-app','digits':'4','param':'demo_ivr_submenu'}).up()
        .ele('entry',{'action':'menu-exec-app','digits':'5','param':'transfer 1234*256 enum'}).up()
        .up()
        .up()
        .up();

        xml.end({ pretty:true})
        */






        res.json(receptionists);
    }) 
    });






    //retrive contacts
router.get('/api/contacts',verify.common,(req,res,next)=>{
    jwt.verify(req.token, 'secretkey',(err,authData)=>{
        if(err) {
            res.sendStatus(403);
        } else {
Contact.find({userid: req.headers['user']},function(err,contacts){
    res.json(contacts);
});
        } 
    });
});

    //retrive limit
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


//retrive wAVS
router.get('/api/wavs',(req,res,next)=>{
    Wav.find(function(err,wavs){
        res.json(wavs);
    }) 
    });



//retrive rings
router.get('/api/rings',verify.common,(req,res,next)=>{
    jwt.verify(req.token, 'secretkey',(err,authData)=>{
        if(err) {
            res.sendStatus(403);
        } else {
    Ring.find({userid: req.headers['user']},function(err,rings){

        var xml= builder.create('include');
        var domain=xml.ele('domain',{'name':'$${domain}'})
        .ele('params') 
        .ele('param',{'name':'dial-string','value':'{^^:sip_invite_domain=${dialed_domain}:presence_id=${dialed_user}@${dialed_domain}}${sofia_contact(*/${dialed_user}@${dialed_domain})}'}).up()
        .up()
        .ele('variables')
        .ele('variable',{'name':'default_gateway','value':'$${defult_provider}'}).up()
        .up();
        var group = domain.ele('groups');
        for(var i=0; i<rings.length; i++)
        {
        group.ele('group',{'name':rings[i].name})
        .ele('users')
        .ele('X-PRE-PROCESS',{'cmd':'include','data':'default/*.xml'}).up()
        .ele('action',{'application':'set','data':'call_timeout='+rings[i].timeout}).up()
        .ele('user',{'id':rings[i].extension,'type':'pointer'}).up()
        .up()
        .up();``
        }
        xml.end({ pretty: true});
             
             
        fs.writeFile('hello.xml',xml,function(err){




        });
       res.json(rings);
    });
    }
    }); 
    });
    



//retrive outbound
router.get('/api/outbounds',verify.outbound,(req,res,next)=>{
    jwt.verify(req.token, 'secretkey',(err,authData)=>{
        if(err) {
            res.sendStatus(403);
        } else {
    Outbound.find({userid: req.headers['user']},function(err,outbounds){


        var xml= builder.create('include');
        var domain=xml.ele('context',{'name':'sipout'}) ;
        for(var i=0; i<outbounds.length; i++)
        {
            var j=i;
          var domain2= domain.ele('extension',{'name':outbounds[j].name});
        var domain1=domain2.ele('condition',{'field':'${outbound_itsp}','expression':'^voxbeam$','break':'on-false'});
       var group=domain1.ele('action',{'application':'set','data':'effective_caller_id_number=${'+outbounds[j].callerid+'}'}).up();
        if(outbounds[j].dial=='' && outbounds[j].dialpattern=='')
        {
            console.log("hello");
        group.ele('action',{'application':'bridge','data':'sofia/gateway/'+outbounds[j].trunk+'/$1'}).up();
        }else
        if(outbounds[j].dial=='')
        {
        group.ele('action',{'application':'bridge','data':'sofia/gateway/'+outbounds[j].trunk+'/'+outbounds[j].dialpattern}).up();
        }else
        if(outbounds[j].dialpattern=='')
        {
        group.ele('action',{'application':'bridge','data':'sofia/gateway/'+outbounds[j].trunk+'/'+outbounds[j].dial+'$1'}).up();
        }
        else
        {
            group.ele('action',{'application':'bridge','data':'sofia/gateway/'+outbounds[j].trunk+'/'+outbounds[j].dial+outbounds[i].dialpattern}).up();

        }
        group.up()
        .up();
        }        
         xml.end({pretty:true});

               
        fs.writeFile('outbound.xml',xml,function(err){




        });


        res.json(outbounds);
    });
    }
    }) ;
    });
    
    







//Retrive extensions 
router.get('/api/extensions',verify.extension,(req,res,next)=>{
    jwt.verify(req.token, 'secretkey',(err,authData)=>{
if(err) {
    res.sendStatus(403);
} else {
    var xml = builder.create('include');
   // console.log(req.query.userid);
    console.log('1',req.headers['user']);
   // var check = JSON.parse(req.headers['user']);
   // console.log('check',check.userid);
    Extension.find({userid: req.headers['user']}, function(err,extensions){

      console.log(extensions);
        for(var i=0; i<extensions.length; i++){
            
            var a=extensions[i].extensionno+'.xml';
            
       var b=i;
            fs.exists(a,function (exists) {
                
               if(exists)
                {   
                    
                   
               }
               else
               {
                xml.ele('user',{'id':extensions[b].extensionno})
                .ele('params') .ele('param',{'name':'password','value':extensions[b].extensionno}).up().ele('param',{'name':'vm-password','value':extensions[b].extensionno}).up()
                .up()
                .ele('variables')
                .ele('variable',{'name':'toll_allow','value':'domestic,international,local'}).up()
                .ele('variable',{'name':'accountcode','value':extensions[b].extensionno}).up()
                .ele('variable',{'name':'user_context','value':'default'}).up()
                .ele('variable',{'name':'effective_caller_id_name','value':'Extension '+extensions[b].extensionno}).up()
                .ele('variable',{'name':'effective_caller_id_number','value':extensions[b].extensionno}).up()
                .ele('variable',{'name':'outbound_caller_id_name','value':'$${'+extensions[b].displayname+'}'}).up()
                .ele('variable',{'name':'outbound_caller_id_number','value':'$${'+extensions[b].outboundcid+'}'}).up()
                .ele('variable',{'name':'callgroup','value':'techsupport'}).up()
                .end({ pretty: true});
             
             
                fs.writeFile(a,xml,function(err){




                });
                
                  
               }
           });

      
       
    }
      
        res.json(extensions);
    });
}
});
    
});

    



//retrive trunk
router.get('/api/trunks',verify.common,(req,res,next)=>{

    
    jwt.verify(req.token, 'secretkey',(err,authData)=>{
        if(err) {
            res.sendStatus(403);
        } else {

    Trunk.find({userid: req.headers['user']},function(err,trunks){
        
//         var xml1 = builder.create('include');

//         for(var i=0; i<trunks.length; i++)
//         {
//             if(trunks[i].register==true)
//             {
//          xml1.ele('gateway',{'name':trunks[i].trunkname})
//         .ele('param',{'name':'proxy','value':trunks[i].trunkip}).up()
//         .ele('param',{'name':'register','value':trunks[i].register}).up()
//         .ele('param',{'name':'username','value':trunks[i].username1}).up()
//         .ele('param',{'name':'password','value':trunks[i].password}).up()
//         .up();
//             }
//     else
//     {
//         xml1.ele('gateway',{'name':trunks[i].trunkname})
//         .ele('param',{'name':'proxy','value':trunks[i].trunkip}).up()
//         .ele('param',{'name':'register','value':trunks[i].register}).up()
//         .ele('param',{'name':'caller-id-in-from','value':true}).up()
//         .up();

//     }
// }
//         xml1.end({ pretty: true});
//         fs.writeFile("/usr/local/freeswitch/conf/sip_profiles/external/gateway.xml",xml1,function(err){

//          });
         res.json(trunks);
        
        });

        
    }
    });

    });
    





    //retrive inbound
router.get('/api/inbounds',verify.common,(req,res,next)=>{
    jwt.verify(req.token, 'secretkey',(err,authData)=>{
        if(err) {
            res.sendStatus(403);
        } else {

    Inbound.find({userid: req.headers['user']},function(err,inbounds){
        res.json(inbounds);
    });
}
    }); 
    });
    




//add receptionist
router.post('/api/receptionist',(req,res,next)=>{
    var newReceptionist = new Receptionist({
        name: req.body.name,
        extension: req.body.extension,
        wav: req.body.wav,
        zero:req.body.zero,
        one: req.body.one,
        two: req.body.two,
        three: req.body.three,
        four: req.body.four,
        five: req.body.five,
        six: req.body.six,
        seven: req.body.seven,
        eight: req.body.eight,
        nine: req.body.nine
    })
    

    newReceptionist.save((err,receptionist)=>{
        if(err)
        {
            res.json({msg:'Failed to add contact'});
        }
        else{
            res.json({msg:'added succcessfully'});;
            
        }
    })
});



//add wav
router.post('/api/addWav',upload.single('file'),(req,res,next)=>{

if(req.file)
{
    console.log(req.file);
    req.body.photo=req.file.filename;
}
/*
var newItem = new Wav();
newItem.img.data = fs.readFileSync(req.file.path)
newItem.img.contentType = 'image/jpg';
newItem.save();
*/
res.json('File Uploaded')
   
});







//add contacts
router.post('/api/contact',(req,res,next)=>{
    var newContact = new Contact({
        userid: req.body.userid,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
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
        ofax: req.body.ofax
    })
    

    newContact.save((err,contact)=>{
        if(err)
        {
            res.json({msg:'Failed to add contact'});
        }
        else{
            res.json({msg:'added succcessfully'});;
            
        }
    })
});



//add outbound
router.post('/api/outbound',(req,res,next)=>{
    var newOutbound = new Outbound({
        userid:req.body.userid,
        name: req.body.name,
        dial: req.body.dial,
        dialpattern: req.body.dialpattern,
        callerid: req.body.callerid,
        trunk: req.body.trunk
    })
    

    newOutbound.save((err,outbound)=>{
        if(err)
        {
            res.json({msg:'Failed to add outbound'});
        }
        else{
            res.json({msg:'added succcessfully'});;
            
        }
    })
});

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






//add extension
router.post('/api/extension',(req,res,next)=>{
    var newExtension = new Extension({
        userid: req.body.userid,
        extensionno: req.body.extensionno,
        displayname: req.body.displayname,
        outboundcid: req.body.outboundcid,
        password: req.body.password,
        email: req.body.email
    })
    

    newExtension.save((err,extension)=>{
        if(err)
        {
            res.json({msg:'Failed to add extension'});
        }
        else{
            
           res.json({msg:'added'});

        }
    })
});






//add ring
router.post('/api/ring',(req,res,next)=>{
    var newRing = new Ring({
        userid:req.body.userid,
        name: req.body.name,
        extension: req.body.extension,
        timeout: req.body.timeout,
        userid: req.body.userid,

    })
    

    newRing.save((err,ring)=>{
        if(err)
        {
            res.json({msg:'Failed to add ring'});
        }
        else{
            
           res.json({msg:'added'});

        }
    })
});





//add trunk
router.post('/api/trunk',(req,res,next)=>{
    var newTrunk = new Trunk({
        userid:req.body.userid,
        trunkname: req.body.trunkname,
        username1: req.body.username1,
        password: req.body.password,
        trunkip: req.body.trunkip,
        register: req.body.register
    })
    console.log(newTrunk);
    

    newTrunk.save((err,trunk)=>{
        if(err)
        {
            res.json({msg:'Failed to add extension'});
        }
        else{
            
           res.json({msg:'added'});

        }
    })
});




//add inbounds
router.post('/api/inbound',(req,res,next)=>{
    var newInbound = new Inbound({
        name: req.body.name,
        didnumber: req.body.didnumber,
        playback: req.body.playback,
        ringgroup: req.body.ringgroup,
        forext: req.body.forext,
        formob: req.body.formob,
        userid:req.body.userid
    })
    

    newInbound.save((err,inbound)=>{
        if(err)
        {
            res.json({msg:'Failed to add Inbound'});
        }
        else{
            res.json({msg:'added succcessfully'});;
            
        }
    })
});







//delete extension
router.delete('/api/extension/:id/:extensionno',(req,res,next)=>{
    ext=req.params.id;
    name=req.params.extensionno;
    fs.unlink('/usr/local/freeswitch/conf/directory/default/'+name+'.xml', function (err) {
        
      });
    Extension.remove({_id: req.params.id}, function(err, result){
        if(err)
        {
            res.json(err);
        }
        else
        {
          
        res.json(result);

    }
    });
      
});
    



//delete contact
router.delete('/api/contact/:id',(req,res,next)=>{
Contact.remove({_id: req.params.id}, function(err, result){
    if(err)
    {
        res.json(err);
    }
    else
    {
        res.json(result);
    }
});
  
});



//delete contact
router.delete('/api/ring/:id',(req,res,next)=>{
    Ring.remove({_id: req.params.id}, function(err, result){
        if(err)
        {
            res.json(err);
        }
        else
        {
            res.json(result);
        }
    });
      
    });
    



//delete outbound
router.delete('/api/outbound/:id',(req,res,next)=>{
    Outbound.remove({_id: req.params.id}, function(err, result){
        if(err)
        {
            res.json(err);
        }
        else
        {
            res.json(result);
        }
    });
      
    });
    
    
    //delete receptionist
router.delete('/api/receptionist/:id',(req,res,next)=>{
    Receptionist.remove({_id: req.params.id}, function(err, result){
        if(err)
        {
            res.json(err);
        }
        else
        {
            res.json(result);
        }
    });
      
    });
    
    
    






//delete trunk
router.delete('/api/trunk/:id',(req,res,next)=>{
    Trunk.remove({_id: req.params.id}, function(err, result){
        if(err)
        {
            res.json(err);
        }
        else
        {
            res.json(result);
        }
    });
      
    });
    


//delete inbound
    router.delete('/api/inbound/:id',(req,res,next)=>{
        Inbound.remove({_id: req.params.id}, function(err, result){
            if(err)
            {
                res.json(err);
            }
            else
            {
                res.json(result);
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
                status:'paid'
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
        status:'paid'
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