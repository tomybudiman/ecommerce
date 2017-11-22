const Transaction=require("../models/transactionModel");

module.exports={
  add:(req,res)=>{
    const transactionData=new Transaction(req.body);
    transactionData.save().then((stats)=>{
      res.send({status:true,data:stats});
    }).catch((err)=>{
      res.send({status:false,msg:"Transaction cannot be proccess!"});
    });
  },
  all:(req,res)=>{
    Transaction.find({
      userId:req.query.userId
    }).populate("userId").populate("itemList.itemId").then((transaction)=>{
      // res.send(transaction);
      res.send({status:true,transaction:transaction});
    }).catch((err)=>{
      res.send({status:false,msg:"Failed to retrieve transaction data!"});
    });
  },
  purge:(req,res)=>{
    Transaction.remove().then((stats)=>{
      res.send({status:true,data:stats});
    }).catch((err)=>{
      res.send({status:false,msg:"Failed to purge transaction collection!"});
    });
  }
};
