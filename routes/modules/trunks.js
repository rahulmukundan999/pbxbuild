module.exports = trunks;

function trunks(router,jwt,verify,Trunk,builder,fs) {

    
//retrive trunk
router.get('/api/trunks',verify.common,(req,res,next)=>{

    
    jwt.verify(req.token, 'secretkey',(err,authData)=>{
        if(err) {
            res.sendStatus(403);
        } else {

    Trunk.find({userid: req.headers['user']},function(err,trunks){
        
        var xml1 = builder.create('include');

        for(var i=0; i<trunks.length; i++)
        {
            if(trunks[i].register==true)
            {
         xml1.ele('gateway',{'name':trunks[i].trunkname})
        .ele('param',{'name':'proxy','value':trunks[i].trunkip}).up()
        .ele('param',{'name':'register','value':trunks[i].register}).up()
        .ele('param',{'name':'username','value':trunks[i].username1}).up()
        .ele('param',{'name':'password','value':trunks[i].password}).up()
        .up();
            }
    else
    {
        xml1.ele('gateway',{'name':trunks[i].trunkname})
        .ele('param',{'name':'proxy','value':trunks[i].trunkip}).up()
        .ele('param',{'name':'register','value':trunks[i].register}).up()
        .ele('param',{'name':'caller-id-in-from','value':true}).up()
        .up();

    }
}
        xml1.end({ pretty: true});
        fs.writeFile("/etc/freeswitch/sip_profiles/external/gateway.xml",xml1,function(err){

         });
        // fs.writeFile("./trunk/gateway.xml",xml1,function(err){

        // });
         res.json(trunks);
        
        });

        
    }
    });

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
    
}