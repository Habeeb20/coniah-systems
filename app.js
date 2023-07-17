const connectdb = require('./dbconnection/dbconnect');
connectdb();
const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
const PORT= (process.env.port || 25000)




app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"));
app.use(express.json())
const customer_route = require("./routes/routes");

app.use('/', customer_route)

// app.use(
//     session({
//         secret:"my secret key",
//         saveUninitialized: true,
//         resave: false,
//     })
// );


// app.use(( req, res, next) => {
//     res.locals.message = req.session.message;
//     delete req.session.message;
//     next();
// });








app.listen(PORT, () => {
    console.log("Server is listening on port " + PORT)
})


