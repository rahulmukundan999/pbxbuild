module.exports = rings;

function rings(router,verify,jwt,builder,Ring,fs) {

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
    

}