const User=require("../models/userModel");

module.exports={
  add:(req,res)=>{
    const userData=new User(req.body);
    userData.save().then((stats)=>{
      res.send({status:true,data:stats});
    }).catch((err)=>{
      res.send({status:false,msg:"Failed to add new user!"});
    });
  },
  all:(req,res)=>{
    User.find().then((users)=>{
      res.send({status:true,users:users});
    }).catch((err)=>{
      res.send({status:false,msg:"Failed to retrieve all user data!"})
    });
  }
};
