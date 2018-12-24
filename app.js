var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');
var passport = require('passport');
var session = require('express-session');
require('./config/passport')(passport);
const LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');




var app = express();

mongoose.connect('mongodb://10.1.1.224:27017/contactlist1');
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyparser.json());
app.use(cookieParser('foo'));	
//app.use(cors());


const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyparser.json());
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname,'./angular/dist')));
// passport config
app.use(session({secret: 'foo',
					saveUninitialized: true,
					resave: true}));

app.use(passport.initialize());
app.use(passport.session());
mongoose.connection.on('connected',()=>{
    console.log('Connected');
});

mongoose.connection.on('error',(err)=>{
    if(err)
    {
    console.log('error');
    }

});
const route = require('./routes/route')(app,passport);


app.get('/',(req,res)=>{
    res.send('Connection Established');
});

app.listen(port,()=>{
    console.log('server started');
});
