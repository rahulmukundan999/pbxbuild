module.exports = confirm;

function confirm(router,User) {

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
}