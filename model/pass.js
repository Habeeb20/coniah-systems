const mongoose = require("mongoose")

const passSchema = new mongoose.Schema ({
 
    email: {
        type: String,
        required: true,
    },
 
    password: {
        type: String,
        required:true,
    },

  

   
})

const Pass = new mongoose.model("Pass", passSchema)
module.exports= Pass;