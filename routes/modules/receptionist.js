module.exports = receptionist;

function receptionist(router,jwt,verify,Receptionist,builder,fs,Wav,multer) {


    //retrive wAVS
router.get('/api/wavs',(req,res,next)=>{
    console.log(req.headers['userid']);
    Wav.find({userid:req.headers['userid']},function(err,wavs){
        console.log('wav file',wavs);
        res.json({status:200,data:wavs});
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
router.post('/api/addWav',(req,res,next)=>{
    var filename;
    var storage = multer.diskStorage({
        destination: (req, file, cb) => {
            console.log('fiels',req.body.id);
            fs.mkdir('./file/'+req.body.id,function(err) {
                if(!err) {
                } else {
                    console.log(err);
                }
            });
            cb(null, './file/'+req.body.id+'/')
        },
        filename: (req, file, cb) => {
          filename = file.originalname; 
          cb(null,file.originalname);
        }
    });
    const upload = multer({storage:storage}).any();
    upload(req,res,function(err) {
        if(err) {
            console.log(err);
            return res.end("Error uploading file.");
        } else {
           console.log(req.body);
           req.files.forEach( function(f) {
             console.log(f);
             // and move file to final destination...
           });
           var a = new Wav({
               userid:req.body.id,
               fileName:filename
           });
           a.save((err,wav)=>{
               if(err) {
                   console.log(err);
               } else {
                   console.log('hello saved');
               }
           });
           res.json({status:200,msg:'File Uploaded Successfully'});
        }
    });

// if(req.file)
// {
//     console.log(req.file);
//     console.log(req.body.id);
//     req.body.photo=req.file.filename;
  
// }
/*
var newItem = new Wav();
newItem.img.data = fs.readFileSync(req.file.path)
newItem.img.contentType = 'image/jpg';
newItem.save();
*/
// res.json('File Uploaded')
   
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
        
        
        
}