// const { mobdata } = require("../dummydata");
// const { mobdata } = require("../dummydata");
// const { dum } = require("../model/dataadding");
const {  dumy } = require("../model/dataadding");
const { reg } = require("../model/registermodel");

const router1=require("express").Router();
// router1.get("/dummys", async (req,res)=>{  
    
//     let dbres3=await dum.create(mobdata)
    
//     return res.send({msg:"registered successfully"})
// })
router1.post("/register",async (req,res)=>{
    const registerdetails=req.body;
    console.log(registerdetails)
    const dbres1=await reg.create(registerdetails)
    console.log(dbres1)
    return res.send({msg:"registered successfully"})
})
router1.post("/login",async (req,res)=>{
    const logindetails=req.body;
    console.log(logindetails)
    const dbres2=await reg.find({email:{$eq:logindetails.email},password:{$eq:logindetails.password}})
    console.log(dbres2)
    if(dbres2.length)
    {
        return res.send({msg:"your login successfully"})
    }
    else{
        return res.send({msg:"your login is not successfully"})
    }
    
})
router1.get("/mobdata",async (req,res)=>{
    
   
    const dbres4=await dumy.find({})
    console.log(dbres4)
    
    return res.send(dbres4)
})
module.exports=router1