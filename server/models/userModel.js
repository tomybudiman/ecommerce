const mongoose=require("mongoose").connect(process.env.MONGO_DB_URL);
const Schema=mongoose.Schema;

const userSchema=new Schema({
  name:String,
  email:String
});
const User=mongoose.model("User",userSchema);

module.exports=User;
