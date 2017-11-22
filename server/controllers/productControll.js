const Product=require("../models/productModel");

module.exports={
  add:(req,res)=>{
    const dataProduct=new Product({
      title:req.body.title,
      price:req.body.price,
      imageUrl:req.body.imageUrl
    });
    dataProduct.save().then((stats)=>{
      res.send({status:true,data:stats});
    }).catch((err)=>{
      res.send({status:false,msg:"Data gagal diupload!"});
    });
  },
  all:(req,res)=>{
    Product.find().then((products)=>{
      products.map((product)=>{
        product.imageUrl=process.env.CDN_SERVER_URL+"/image/"+product.imageUrl
      });
      res.send({status:true,products:products});
    }).catch((err)=>{
      res.send({status:false,msg:"Data gagal diupload!"});
    });
  }
};
