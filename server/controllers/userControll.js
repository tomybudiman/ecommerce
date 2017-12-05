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
        res.send({status:false,msg:err});
      });
    }
  },
  login:(req,res)=>{
    if(req.body.email != "" && req.body.password != ""){
      User.find({
        email:req.body.email
      }).then((user)=>{
        if(user.length == 0){
          res.send({status:false,msg:"User not found!"})
        }else{
          bcrypt.compare(req.body.password,user[0].password,(err,hash)=>{
            if(hash){
              const token=jwt.sign({id:user[0]._id,isAdmin:user[0].isAdmin},process.env.SECRET_KEY);
              res.send({status:hash,token:token});
            }else{
              res.send({status:false,msg:"Wrong password!"});
            }
          });
        }
      }).catch((err)=>{
        res.send({status:false,msg:err});
      });
    }
  },
  all:(req,res)=>{
    User.find().then((users)=>{
      res.send({status:true,users:users});
    }).catch((err)=>{
      res.send({status:false,msg:"Failed to retrieve all user data!"})
    });
  },
  get:(req,res)=>{
    jwt.verify(req.headers.token,process.env.SECRET_KEY,(err,data)=>{
      res.send(data);
    });
  }
};
