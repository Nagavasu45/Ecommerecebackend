const express=require("express");
const dotenv=require("dotenv")
const cors=require("cors");
const router1 = require("./userControl/regloginrouter");
const { Connection } = require("./config/db");
// const rapi = require("./dummydata");

// const { Mobile } = require("./dummydata");
dotenv.config()
const port=process.env.PORT;
const app=express();
app.use(express.json())
app.use(cors({
    origin:"*"
}))
app.get("/",(req,res)=>{
    return res.send("homepage")
})
// app.use(rapi)
app.use(router1)
app.listen(port,async ()=>{
    try{
        await Connection();
        console.log("server is running with",port)
    }
    catch(error){
        console.log(error)
    }
})