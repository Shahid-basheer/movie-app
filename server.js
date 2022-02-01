const path = require("path");
require('dotenv').config({path:'./config/config.env'})
const express = require('express')
const app = express();
const adminRouter = require('./routers/admin')
const userRouter = require('./routers/user')
const connectDb = require('./config/db')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const morgan = require('morgan')
const fileupload = require('express-fileupload')

const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: "dyaqiakqz",
    api_key: "618983747324517",
    api_secret: "cC2-rJrQDqqCoB9ZuTaDvMkAvzQ",
})
connectDb()



app.use(express.json())
app.use(morgan('dev'))

app.use(cors())
//app.use(fileUpload())
app.use(express.static(path.join(__dirname, "client", "build")))
app.use(fileupload())


// handle router 
app.use('/admin',adminRouter)
app.use('/',userRouter)
 

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })


app.get("*", (req, res) => {
 res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })





const port = process.env.PORT ||5000
app.listen(port,()=> console.log(`Server is running port ${port}`));