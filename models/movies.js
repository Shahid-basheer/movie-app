const mongoose = require ('mongoose')

const moviesSchema = mongoose.Schema({
MovieName:{
    type:String,
    required:true
},
ActorName:{
 type:String,
 required:true
},

ProducerName:{
 type :String,
 required:true
},

ReleaseDate:{
    type:Number,
    required:true
},
Des:{
    type:String,
    required:true
},
images:{
    type:String,
},
movies:{
    type:String,
}

})

const movies = mongoose.model('movies',moviesSchema)
module.exports = movies