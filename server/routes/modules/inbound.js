module.exports = inbound;

function inbound(router,verify,jwt,fs,builder,Inbound) {

        //retrive inbound
router.get('/api/inbounds',verify.common,(req,res,next)=>{
    jwt.verify(req.token, 'secretkey',(err,authData)=>{
        if(err) {
            res.sendStatus(403);
        } else {

        Inbound.find({userid: req.headers['user']},function(err,inbounds){
        var xml1 = builder.create('include');

        for(var i=0; i<inbounds.length; i++)
        {
         var a = xml1.ele('extension',{'name':inbounds[i].name})
        var b = a.ele('condition',{'field':'context','expression':'public'}).up()
        var c = b.ele('condition',{'field':'destination_number','expression':'^('+inbounds[i].didnumber+')$'}).up()
        var d = c.ele('action',{'application':'answer'}).up();
        if(inbounds[i].didnumber && inbounds[i].didnumber!=undefined && inbounds[i].playback!=undefined) {
            d.ele('action',{'application':'playback',data:'/usr/local/freeswitch/recordings/'+inbounds[i].playback}).up();
        }
        d.ele('action',{'application':'transfer',data:inbounds[i].forext+' XML Default'}).up();
        if(inbounds[i].ringgroup && inbounds[i].ringgroup!=undefined) {
            d.ele('action',{'application':'transfer',data:inbounds[i].ringgroup+' XML Default'}).up();
        } if(inbounds[i].formob && inbounds[i].formob!=undefined) {
            d.ele('action',{'application':'transfer',data:inbounds[i].formob+' XML Default'}).up();
        }
}
        xml1.end({ pretty: true});
        // fs.writeFile("/etc/freeswitch/dialplan/public/"+inbounds[i].name+".xml,xml1,function(err){

        //  });
        console.log('hello');
        fs.writeFile("/home/rahulmukundan_999/gateway1.xml",xml1,function(err){
            if(err) {
                console.log(err);
            } else {
                console.log('demo');
            }
        });
        res.json(inbounds);
    });
}
    }); 
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
    
    

}