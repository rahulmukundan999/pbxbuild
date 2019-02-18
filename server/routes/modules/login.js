module.exports = login;

function login(router,jwt,passport,User) {

    
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
}