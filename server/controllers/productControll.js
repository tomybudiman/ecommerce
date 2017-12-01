const Product=require("../models/productModel");
const ObjectId=require("mongoose").Types.ObjectId;

module.exports={
  add:(req,res)=>{
    new Product(req.body).save().then((status)=>{
      res.send({status:true,msg:status});
    }).catch((err)=>{
      res.send({status:false,msg:err});
    });
  },
  all:(req,res)=>{
    Product.find().sort({"_id":-1}).then((products)=>{
      products.map((product)=>{
        product.imageUrl=process.env.CDN_SERVER_URL+"/image/"+product.imageUrl
      });
      res.send({status:true,products:products});
    }).catch((err)=>{
      res.send({status:false,msg:"Data gagal diupload!"});
    });
  },
  update:(req,res)=>{
    Product.updateOne({
      "_id":ObjectId(req.params.id)
    },req.body).then((status)=>{
      res.send({status:true,msg:status});
    }).catch((err)=>{
      res.send({status:false,msg:err});
    });
  },
  delete:(req,res)=>{
    Product.deleteOne({
      "_id":ObjectId(req.params.id)
    }).then((status)=>{
      res.send({status:true,msg:status});
    }).catch((err)=>{
      res.send({status:false,msg:err});
    });
  }
};
