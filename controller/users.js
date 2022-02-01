const users = require('../models/user')
const comments = require('../models/comment')
const bcrypt = require('bcrypt')

const register = async (req, res) => {
    console.log(req.body)
    try {
        const hashPassword = await bcrypt.hash(req.body.password,10)
        const userD ={
            userName:req.body.userName,
            email:req.body.email,
            phone:req.body.phone,
            password:hashPassword,
        }
        const data = await users(userD)
        const response = await data.save()
        res.status(200).json(response)

    } catch (e) {
        res.status(500).json(e+' please try again...')
        console.log(e)
    }
}


const checkName = async (req, res) => {
    try {
        const data = await users.findOne({ userName: req.params.id })
        res.status(200).json(data)
    } catch (e) {
        res.status(404).json(e)
    }

}




const checkEmail = async (req, res) => {
    try {
        console.log(req.params.id)
        const data = await users.findOne({ email: req.params.id })
        res.status(200).json(data)
    } catch (e) {
        res.status(404).json(e)
    }

}


const checkNumber = async (req, res) => {
    try {
        console.log(req.params.id)
        const data = await users.findOne({ phone: req.params.id })
        res.status(200).json(data)
    } catch (e) {
        res.status(404).json(e)
    }

}


const login = async (req, res) => {
    console.log(req.body)

    try {

        const userDetails = await users.findOne({ email: req.body.email })
        if(userDetails){
              const userPassword = await bcrypt.compare(req.body.password,userDetails.password)
              if(!userPassword){
                res.status(404).json('oops!!! password not found')

              }else{

                  res.status(200).json(userDetails)
              }
        }else{
            res.status(404).send('email not found please register')
        }

    } catch (e) {
        
        res.status(404).json('something went wrong!!!')
    }
}



const commentPost = async (req, res) => {
    console.log(req.body)
    try {
       
        const commentD ={
            videoId:req.body.videoId,
            userName:req.body.userName,
            email:req.body.email,
            comment:req.body.comment
        }
        const data = await comments(commentD)
        const response = await data.save()
        res.status(200).json(response)

    } catch (e) {
        res.status(500).json(e+' please try again...')
        console.log(e)
    }
}

const getComment = async (req, res) => {
   const id = req.params.id
    try {
       
        const data = await comments.find({videoId:id})
        res.status(200).json(data)

    } catch (e) {
        res.status(500).json(e+' please try again...')
        console.log(e)
    }
}


module.exports = { register, checkName, checkEmail, checkNumber, login,commentPost,getComment }