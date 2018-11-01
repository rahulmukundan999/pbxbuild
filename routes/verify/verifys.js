class Extension {

    extension(req,res,next) {
        const header =  req.headers['authorization'];
        if(typeof header!=='undefined') {
            const bearer = header.split(' ');
            const token = bearer[1];
            req.token = token;
            next();
        } else {
        console.log('hello');
        res.sendStatus(403);
        }
    }
}
module.exports = Extension;