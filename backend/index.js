const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")

const register = require("./Router/register")
const login = require("./Router/login")

const dotEnv = require("dotenv")
dotEnv.config()

const main = async()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URL)
        console.log("database connected to data base")
    }catch(e){
        console.log(e)
    }
}
    
main()
app.use(cors())

app.use("/v1", register)
app.use("/v1", login)
app.get("/v1", (req, res)=>{
    res.send("comming")
})

app.listen(process.env.PORT, (err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("data base Connect to the ", process.env.PORT)
    }
})