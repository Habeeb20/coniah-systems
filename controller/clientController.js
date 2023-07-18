const bcrypt = require('bcrypt')
const config = require('../config/config')
const express = require("express");
const Pass = require('../model/pass')
const User = require("../model/model");
var ObjectID = require("mongodb").ObjectId


const securePassword =(async(password) => {
    try {
        const passwordHash = await bcrypt.hash(password,10)

        return passwordHash;
        
    } catch (error) {
        console.log(error)
        
    }

});

const loadlogin = (async(req, res)=>{
    try {
        res.render('login')
    } catch (error) {
        console.log(error)
        
    }
});


const signup = (async(req, res)=>{
    try {
        res.render('signup')
    } catch (error) {
        console.log(error)
        
    }
});
  



const loadadd = (async(req, res) => {
    try {
        const name = req.body.name;
        const amount = req.body.amount;
        const phone = req.body.phone;

        const details = new User({
            name:name,
            amount:amount,
            phone:phone
        });
        const detaildata = await details.save();
        if(detaildata){
            const detaildata = await User.find()
            res.render('profile', {
                
                _id: req.params.id,
                name:req.body.name,
                amount : req.body.amount,
                phone :req.body.phone,


                detaildata:detaildata,
                name:name,
                amount:amount,
                phone:phone
            })
        } else {

        }
    } catch (error) {
        console.log(error)
        
    }
});



const profile = (async(req, res) => {
    const prof = await User.find();
    if(prof.length)
    console.log(prof)
    try {             
        res.render('profile', { 
            _id: req.params.id, 
            
            name:req.body.name,
            phone:req.body.phone,
            amount:req.body.amount,

            detaildata:prof
   
          
         })
            
        
        
       
    } catch (error) {
        console.log(error)
        
    }
});



const logout = (async(req, res)=> {
    try {
        req.session.destroy();
        res.redirect('/login')
        
    } catch (error) {
        console.log(error)
        
    }
});

const add = async(req, res) => {
    try {
        const email= req.body.email;
        res.render('add', { email:email})
    } catch (error) {
        console.log(error)
    }
};







const Loginverified = (async(req, res) =>{
    try {
        const email = req.body.email;
        const password = req.body.password;

        const passData = await Pass.findOne({email: email})

        if (passData) {
            console.log(passData)
            const passwordMatch = await bcrypt.compare(password, passData.password)


            if (passwordMatch) {
                req.session.user_id = passData._id;
                req.session.is_admin = passData.is_admin;


                if(passData.is_admin = 1){
                    res.render('welcome', {
                        email:req.body.email,
                        email:email
                    })
                }else {
                    res.redirect('/login', {message: "login details does not match,create an account instead"})
                }
                
            } else {
                res.redirect("/login")
                console.log("incorrect password")
             
                
            }
            
        } else {

            if (!passData) {
                const email = req.body.email;
                const  password = await securePassword (req.body.password);

                const newpass = new Pass({
            
                    email:email,
                    password:password,
                    
                });
        
                const passDat = await newpass.save()
                if(passDat){
                    res.render('welcome',{email:email})
                }
                
            } else {
                console.log(err2)
                
            }

            // res.status(500).json({mesaage:"error"})
            
        }
    } catch (error) {
        console.log(error)
        
    }
});





const welcome =(async(req, res)=> {
    try {
        res.render('welcome')
    } catch (error) {
        console.log(error)
        
    }
});

const getinvoice= (async(req, res) => {

    try {
        let id = req.params.id;
        var invoicedata = await User.findById(id);
        res.render('invoice', {
                detaildata:invoicedata
    
                })
         
      
        
    } catch (error) {
        console.log(error)
        
    }
});



const loadinvoice = (async(req, res) => {
    let id = req.params.id;
    const invoice = await User.findById(id,{
        name: req.body.name,
        amount: req.body.amount,
        phone: req.body.phone,

    })
    try {
        await invoice.save()
        if(invoice){
            res.render('invoice', {
                
                _id: req.params.id,
                name:req.body.name,
                amount : req.body.amount,
                phone :req.body.phone,


                detaildata:invoice
               
            });
            console.log('successful')
        } else {
            console.log('error occured')

        }
    } catch (error) {
        console.log(error)
        
    }
});



















const deletePost = (async(req, res) => {
  
  
    try {
        let id = req.params.id;
        const delet = await User.findByIdAndRemove(id.trim());
          
        if(delet) {
            res.redirect('/profile')
            console.log("successful")
          
        } else {
            console.log("error")

        }
    } catch (error) {
        console.log(error)
        
    }
});

const geteditpost = (async(req,res) => {
    try {
        let id = req.params.id;
        var admindata = await User.findById(id);
        
            res.render('edit',{
                _id:req.params.id,
            
                
                detaildata:admindata
            });
    
        
    } catch (error) {
        console.log(error)
        
    }
})


const loadedit =(async(req, res)=> {
    let id = req.params.id;
    const editdetails = await User.findByIdAndUpdate(id, {
        name: req.body.name,
        amount: req.body.amount,
        phone: req.body.phone,
    });
    try {
        await editdetails.save()
       
         
        if (editdetails){
            res.redirect('/profile')
            console.log('successful')
            
        } else {
            console.log('error')
        }
        

            
    
    } catch (error) {
        console.log(error)
        
    }
});




























 








module.exports= {
    loadlogin,
    signup,
    profile,
    loadadd,
    welcome,
    Loginverified,
    logout,
    loadedit,
    geteditpost,
    add,
    deletePost,
    getinvoice,
    loadinvoice
    
   
}