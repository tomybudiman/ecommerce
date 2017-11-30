const randomstring=require("randomstring");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const User=require("../models/userModel");

module.exports={
  add:(req,res)=>{
    if(req.body.password == null || req.body.password == ""){
      const randomPassword=randomstring.generate({
        length:15,
        charset:"alphanumeric"
      });
      req.body.password=randomPassword
    }
    if(req.body.email == null || req.body.email == ""){
      res.send({status:false,msg:"Please Complete The Form!"});
    }else{
      bcrypt.hash(req.body.password,10).then((hash)=>{
        req.body.password=hash;
        const userData=new User(req.body);
        userData.save().then((stats)=>{
          res.send({status:true,data:stats});
        });
      }).catch((err)=>{
        res.send({status:false,msg:"Failed to add new user!"});
      });
    }
  },
  login:(req,res)=>{
    res.send(req.body);
  },
  all:(req,res)=>{
    User.find().then((users)=>{
      res.send({status:true,users:users});
    }).catch((err)=>{
      res.send({status:false,msg:"Failed to retrieve all user data!"})
    });
  }
};
