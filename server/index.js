import express from "express"
import mongoose from "mongoose"
import cors from "cors";
import router from "./routes/user-routes.js";
import cookieParser from "cookie-parser";



const app=express();
app.use(cors({credentials:true,origin:"http://localhost:3000"}));
app.use(express.json());
app.use(cookieParser());
app.use("/api",router);


mongoose.connect("mongodb+srv://khushimeenaiit:oDjlPojM3qkAaJL6@cluster0.o6xun4n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>console.log("MongoDb connected successfully"))
.catch(err=>console.log(err))





app.listen(3001,()=>{
  console.log('server is running on 3001')
})

//TCLW60ntjwDPBN1v