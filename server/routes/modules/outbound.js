module.exports = outbound;

function outbound(router,jwt,verify,Outbound,builder,fs) {

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
            if(outbounds[i].dialpattern!='') {
            var tempPattern = outbounds[i].dialpattern.split('');
            var temp = '';
            for(var h = 0;i < tempPattern.length;h++) {
              if(tempPattern[h]==='x')
              {
                temp+='[0-9]';
              } else {
                temp+=tempPattern[h];
              }
            }
        }
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
        group.ele('action',{'application':'bridge','data':'sofia/gateway/'+outbounds[j].trunk+'/'+temp}).up();
        }else
        if(outbounds[j].dialpattern=='')
        {
        group.ele('action',{'application':'bridge','data':'sofia/gateway/'+outbounds[j].trunk+'/'+outbounds[j].dial+'$1'}).up();
        }
        else
        {
            group.ele('action',{'application':'bridge','data':'sofia/gateway/'+outbounds[j].trunk+'/'+outbounds[j].dial+temp}).up();

        }
        group.up()
        .up();
        }        
         xml.end({pretty:true});

               
        fs.writeFile('/home/rahulmukundan_999/outbound.xml',xml,function(err){
        });


        res.json(outbounds);
    });
    }
    }) ;
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
}