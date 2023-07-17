const express = require("express");
const customer_route = express();
const bodyParser = require("body-parser");
customer_route.use(bodyParser.json());
const clientController = require("../controller/clientController");
customer_route.use(bodyParser.urlencoded({extended:true}));
const config = require("../config/config");


const session = require("express-session");

customer_route.use(session({secret:config.sessionSecret,
    resave:true,
    saveUninitialized:true
    }));


const authentication = require("../middleware/authentication")
customer_route.set('view engine', 'ejs');

customer_route.use(express.static('public'));
customer_route.get('/add', clientController.add)
customer_route.get('/editpost/:id', clientController.geteditpost);
customer_route.post('/editpost/:id', clientController.loadedit);
customer_route.get('/deletepost/:id', clientController.deletePost)
customer_route.post('/add', clientController.loadadd)
customer_route.get('/profile', clientController.profile);
customer_route.get('/invoice/:id', clientController.getinvoice);
customer_route.post('/invoice/:id', clientController.loadinvoice)
customer_route.get('/login',authentication.isloggedout, clientController.loadlogin);
customer_route.post('/login',clientController.Loginverified);
customer_route.get('/welcome', clientController.welcome);



module.exports= customer_route;