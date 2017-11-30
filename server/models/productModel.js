const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const productSchema=new Schema({
  title:String,
  price:Number,
  imageUrl:String,
  createdAt:{
    type:Date,
    default:new Date()
  }
});
const Product=mongoose.model("Product",productSchema);

module.exports=Product;
