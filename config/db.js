require('dotenv').config({path:'./config/config.env'})
const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/Movies';
const passargument={
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useCreateIndex:true
}


 const connectDb = ()=>{
    try{
    mongoose.connect(process.env.MONGOOSEURL ,passargument).then(res=> console.log('Database connected...')).catch((e)=>{
        console.log(e+' Database Connection faild...')
    })
    } catch (err){
    console.log(err+'Database Connection something went wrong...')
    }
 
 }

module.exports = connectDb