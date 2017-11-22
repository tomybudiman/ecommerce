const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const transactionSchema=new Schema({
  userId:{
    type:Schema.Types.ObjectId,
    ref:"User"
  },
  itemList:[{
    itemId:{
      type:Schema.Types.ObjectId,
      ref:"Product"
    },
    quantity:Number,
    subtotal:Number
  }],
  total:Number,
  createdAt:{
    type:Date,
    default:new Date()
  }
});
const Transaction=mongoose.model("Transaction",transactionSchema);

module.exports=Transaction;
