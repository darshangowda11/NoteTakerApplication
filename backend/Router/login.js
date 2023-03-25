const express = require("express")
const router = express.Router()
const userModel = require("../models/users")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
router.use(express.json())
router.use(express.urlencoded())


router.post("/login", async(req, res)=>{
    const {email, password} = req.body
    const isData = await userModel.findOne({email:email})
    
    if(!isData){
        return res.status(401).json({
            error:"Email no registerd"
        })
    }
    bcrypt.compare(password, isData.password, (err, result)=>{
        if(result){
            const token=jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: isData._id
              }, 'secret');
              res.status(200).json({
                token:token,
                message:"log in success"
              })
        }
    })



    
    
})
module.exports =router