const mongoose = require("mongoose")

const userSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
    },

   
    amount: {
        type: String,
        required: true,

    },

    phone: {
        type: String,
        required:true,
    },

  

    created: {
        type:Date, default: Date.now
    }

})

const User = new mongoose.model("User", userSchema)
module.exports= User;