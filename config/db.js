const mongoose=require("mongoose")
mongoose.set("strictQuery",true);
const mongocloudUrl="mongodb+srv://nagavasu:nagavasu123@cluster0.p6wuqfb.mongodb.net/?retryWrites=true&w=majority"
const Connection=async ()=>{
    try{
        await mongoose.connect(mongocloudUrl);
        console.log("Connected Successfully");

    }
    catch(err){
        console.log("something wrong in connection process:",err)
    }
}
module.exports={Connection}