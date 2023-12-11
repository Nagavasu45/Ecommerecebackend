
const auther = require("../authee/auther");
const auth = require("../authee/auther");
const {  dumy } = require("../model/dataadding");
const { reg } = require("../model/registermodel");

const bcrypt = require("bcrypt");
// const auth = require("../authee/auther");
const jwt=require("jsonwebtoken")

const router1=require("express").Router();
const saltround=10;
const secretkey="Nagava"

router1.post("/register",async (req,res)=>{
    const user=req.body;
    try{
    const samemail=await reg.findOne({email:{$eq:user.email}})
         
    
    // console.log(samemail.length)
    if(samemail){
        console.log({msg:"email already exists"})
        return res.send({msg:"email already exists"})
    }
    else{
        // const gen=bcrypt.genSaltSync(saltround)
        user.password=bcrypt.hashSync(user.password,saltround)
        console.log(user.password)
        const dbres1=await reg.create(user)
        console.log(dbres1)
        const token= jwt.sign({user:user.email},secretkey,{expiresIn:'300000'})
        console.log(token)
        // arr.push(user)
        
        return res.send({msg:"user successfully registered",jwttoken:token})
    }
    // const registerdetails=req.body;
    // console.log(registerdetails)
    // const dbres1=await reg.create(registerdetails)
    // console.log(dbres1)
    // return res.send({msg:"registered successfully"})
}
catch(error){
    console.log(error)
}
})
router1.post("/login",async (req,res)=>{
    const logindetails=req.body;
    try{    
        console.log(logindetails)
        const validmaildetails= await reg.findOne({email:{$eq:logindetails.email}})
        console.log(validmaildetails)
        if(validmaildetails){
            console.log({msg:"email already exists"}) 
    
            const comparedetails= bcrypt.compareSync(logindetails.password,validmaildetails.password)
        
            console.log(comparedetails)
            if(comparedetails)

                {
                    const token = jwt.sign({ useremail: logindetails.email }, secretkey, { expiresIn: "360000" });
                    console.log("token:", token);
                    return res.send({ msg: "your login successfully", token: token, userdetail: validmaildetails });
        
            // return res.send({msg:"your login successfully"})
                }
            else{
                return res.send({msg:"your password is wrong"})
            }
        }
    
        else{
            return res.send({msg:"first you have to register or check your credentials"})

        }
}
catch(error){
    return res.send({msg:error})
} 
})

// const dotenv=require('dotenv')
// dotenv.config();
// const secretkey='Nagava'
// const cors=require("cors")
// const auther=(req,res,next)=>{
//     const BToken=req.headers['authorization'];
//     console.log(BToken)
    
//     if(BToken){
//         const token=BToken.split(" ")[1];
//         console.log(token)
//         try{
//         const validuser=jwt.verify(token,secretkey)
//         console.log(validuser)
//         if(validuser){
//             req.user=validuser;
//             console.log(req.user)
//             next();
//         }
//     else{
//         console.log({msg:"Not Authorized"})
//     }
//     }
//     catch(error){
//         console.log({msg:error})
//     }
// }
// else{
//     console.log("user not allowed")
// }

// }
module.exports=auth;
router1.get("/auth",auther,async (req, res) => {
    const user = req.user;
    console.log(user);
    if (user && user.useremail) {
        try {
            const userinfo = await reg.findOne({ email: user.useremail });
            if (userinfo) {
                res.send({ msg: "User Authorized", userdata: userinfo })
            }
            else {
                res.status(404).send("User not found");
            }
        }
        catch (err) {
            console.log("Error fetching user detail from db:", err);
        }
    }
   console.log("user authorized")
   
})


router1.get("/mobdata",async (req,res)=>{
    
   
    const dbres4=await dumy.find({})
    console.log(dbres4)
    
    return res.send(dbres4)
})

module.exports=router1

