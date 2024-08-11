require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const methodOverride = require('method-override');

const connectDB = require('./servers/config/db');

const session = require(`express-session`);
const passport = require('passport');

const MongoStore= require('connect-mongo');



const app = express();

const port = 5000 || process.env.PORT;

app.use(session({
   secret:'Keyboard cat',
   resave:false,
   saveUninitialized:true,
     store:MongoStore.create({
      mongoUrl:process.env.MONGODB_URI
     }),
     
   //   cookie: { maxAge: new Date (Date.now()  + (3600000))}
}));




app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({extened:true}));
app.use(express.json());

app.use(methodOverride("_method"));

connectDB();


// static files
app.use(express.static('public'));

//templating engine
app.use(expressLayouts);
app.set('layout','./layouts/main');
app.set('view engine','ejs');


//routes
app.use('/',require('./servers/routes/auth'));

app.use('/',require('./servers/routes/index'));

app.use('/',require('./servers/routes/dashboard'));


// handle 404
app.get('*',function(req,res){
res.status(404).send('404 Page Not Found');
});



app.listen(port,()=>{
   console.log(`app is listening on port ${port}`); 
});
