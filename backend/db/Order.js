const mongoose=require('mongoose')
const Products=require('./Product')

const orderSchema=new mongoose.Schema({
    userId:String,
    price :String,
    products:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }],
    orderDate:{type: Date, default: Date.now},
    deliveryDate:{
        type:Date,
        default:null
    },
    orderLabel:{
        type:String,
        default:"preprocessing"
    }

});

module.exports=mongoose.model("orders",orderSchema);