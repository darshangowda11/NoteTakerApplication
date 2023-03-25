const express = require("express")
const router = express.Router()
const userModel = require("../models/users")
const bcrypt = require("bcrypt")



router.use(express.json())
router.use(express.urlencoded())


router.post("/register", async(req, res)=>{
    try{
        const {email, password} = req.body
        console.log(req.body)
        const isData = await userModel.findOne({email:email})
        
        if(isData!=null){
            return res.status(409).json({
                message:"User already exist"
            })
        }
        bcrypt.hash(password, 10, (err, encr)=>{
            if(err){
                return res.status(500).json({
                    message:"Internal issue"
                })
            }
           const data = userModel.create({
            email:email,
            password:encr
           })
           res.status(201).json({
            message:"register Successfully"
           })
        })
    }
    catch(e){
        res.status(500).json({
            message:"Internal issue"
        })
    }
   

    
})

module.exports = router