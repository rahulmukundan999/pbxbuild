module.exports = extension;
function extension(router,jwt,builder,Extension,fs,verify) {

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
                
                var a = '/etc/freeswitch/directory/default/'+extensions[i].extensionno+'.xml';
                
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
                        console.log(err);
                    });
                    
                      
                   }
               }); 
        }
          
            res.json(extensions);
        });
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

//delete extension
router.delete('/api/extension/:id/:extensionno',(req,res,next)=>{
    ext=req.params.id;
    name=req.params.extensionno;
    fs.unlink('/etc/freeswitch/directory/default/'+name+'.xml', function (err) {
        
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

}