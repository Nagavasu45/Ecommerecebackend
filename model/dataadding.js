const mongoose=require("mongoose");
// "id":30,
// "catageory":"access",
// "subcatageory":"charger",
// "modelname":"spincart 3 in 1 Screen Cleaning Set for PC",
// "imgstore":"https://rukminim2.flixcart.com/image/416/416/ki3gknk0/cleaning-kit/n/g/u/3-in-1-screen-cleaning-set-for-pc-laptops-monitors-mobiles-lcd-original-imafxyp2htc3jg6s.jpeg?q=70",
// "des":"Laptops, Monitors, Mobiles, LCD, LED, TV/Professional Quality 100ml with Micro Fibre Cloth and Brush for Computers, Laptops, Mobiles  (klc-1005)",
// "ratting":4,
// "price":1000,
const addingSchema=new mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    catageory:{
        type:String,
        required:true
            },
    subcatageory:{
        type:String,
        required:true

    },
    modelname:{
        type:String,
        required:true
    },
    imgstore:{
        type:String,
        required:true
    },
    des:{
        type:String,
        required:true
    },
    ratting:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})
const dumy=mongoose.model('dummy',addingSchema);
module.exports={dumy}