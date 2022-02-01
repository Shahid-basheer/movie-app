const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    videoId:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true
    }
},
{timestamps:true}
)

const comments = mongoose.model('comments',commentSchema)
module.exports =  comments