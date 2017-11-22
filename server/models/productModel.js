const mongoose=require("mongoose").connect(process.env.MONGO_DB_URL);
const Schema=mongoose.Schema;

const productSchema=new Schema({
  title:String,
  price:Number,
  imageUrl:String
});
const Product=mongoose.model("Product",productSchema);

module.exports=Product;