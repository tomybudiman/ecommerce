const cors=require("cors");
const app=require("express")();
const parser=require("body-parser");
const env=require("dotenv").config();
const mongoose=require("mongoose");

mongoose.connect(process.env.MONGO_DB_URL);
app.use(parser.urlencoded({extended:false}));
app.use(parser.json());
app.use(cors());

app.get("/",(req,res)=>{
  res.send("It's work!");
});

const api=require("./routes/api");
app.use("/api",api);

app.listen(process.env.PORT,()=>{
  console.log(`Server started! Listenning on port ${process.env.PORT}`);
});
