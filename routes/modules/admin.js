

function admin(router) {

    router.post('/api/admin',(req,res,next)=>{
        var table = req.body.table;
        console.log(table);
        require('../models/'+table).find({},function(err,data) {
            console.log(data);
            res.json(data);
        })
    });

}
module.exports = admin;
