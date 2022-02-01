const mongoose = require('mongoose')

const usersSchema = mongoose.Schema({
    userName:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    phone:{
        type:Number,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
},
{timestamps:true}
)

const users = mongoose.model('users',usersSchema)
module.exports =  users
