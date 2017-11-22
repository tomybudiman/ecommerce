const router=require("express").Router();
const path=require("path");

const imgDir=path.resolve(__dirname,"../data/image");

router.get("/image/:img_name",(req,res)=>{
  res.sendFile(imgDir+"/"+req.params.img_name);
});

module.exports=router;
