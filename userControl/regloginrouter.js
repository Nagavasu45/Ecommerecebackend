
const auther = require("../authee/auther");
const auth = require("../authee/auther");
const {  dumy } = require("../model/dataadding");
const { reg } = require("../model/registermodel");

const bcrypt = require("bcrypt");
// const auth = require("../authee/auther");
const jwt=require("jsonwebtoken")

const router1=require("express").Router();
const stripe=require("stripe")("sk_test_51OMERySJb30zHYKXRtntVAOMPx8ClokJnGOlIPN1IBbaP06OUAf0e4jFlBPAnUsEPy6uK7zORnT48RFKNRH14DC2002ZAtE6HX")
const saltround=10;
const secretkey="Nagava"

router1.post("/register",async (req,res)=>{
    const user=req.body;
    try{
    const samemail=await reg.findOne({email:{$eq:user.email}})// console.log(samemail.length)
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
            // console.log({msg:"email already exists"}) 
    
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

//const stripe = require('stripe')('your_stripe_secret_key'); // Replace with your actual Stripe secret key

router1.post("/createcheckout", async (req, res) => {
  const { products } = req.body;
  console.log(products);

  const lineItems = products.map((prod) => ({
    
    price_data: {
      currency: "inr",
      product_data: {
        name: prod.modelname,
      },
      unit_amount: prod.price * 100,
    },
    quantity: prod.quantity
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: "payment",
      success_url: "https://ecombackend-82yd.onrender.com/Success",
      cancel_url: "https://ecombackend-82yd.onrender.com/Cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router1.get("/Success",(req,res)=>{
    return res.send("<div><h1> payment successfull</h1>    <button> continue</button></div>")
})
router1.get("/Cancel",(req,res)=>{
    return res.send({msg:"cancel"})
})
// router1.post("/createcheckout",async(req,res)=>{
//     const {products}=req.body;
//     console.log(products)
//     const lineItems=products.map((prod)=>({
//         price_data:{
//             currency:"inr",
//             product_data:{
//                 name:prod.dish,
//             },
//             unit_amount:prod.price*100,
//         }, 
//         quantity:prod.quantity 
//     }));
//     const session=await stripe.checkout.sessions.create({
//         payment_method_types:['card'],
//         line_items:lineItems,
//         mode:"payment",
//         success_url:"http://localhost:3000/success",
//         cancel_url:"http://localhost:3000/cancel",

//     });
//     res.json({id:session.id})
// })

module.exports=router1

