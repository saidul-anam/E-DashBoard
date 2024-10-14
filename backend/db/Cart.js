const mongoose=require('mongoose');

const cartSchema=new mongoose.Schema({
    name:String,
    price :String,
    catagory:String,
    productId:String,
    userId:String,
    company:String,
    Quantity:String,
    OrderStatus:{
        type:String,
        default:"not confirm"
    },
    Confirm_level:{
        type:String,
        default:"not yet"
    }
});

module.exports=mongoose.model("carts",cartSchema);