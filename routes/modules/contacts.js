module.exports = contacts;

function contacts(router,verify,jwt,Contact) {
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

 //add contacts
 router.post('/api/contact',(req,res,next)=>{
    console.log(req.body);
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
    console.log(newContact);
    

    newContact.save((err,contact)=>{
        if(err) {
            res.json({msg:'Failed to add contact'});
        } else{
            res.json({msg:'added succcessfully'});;
        }
     })
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
}