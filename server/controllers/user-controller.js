import User from "../models/User.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET_KEY="my_key";

export const signup = async (req, res, next) => {

  try {
      const { name, email, password } = req.body;
   
    const existingUser = await User.findOne({ email: req.body.email });

     //validation
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User already exists",
      });
    }
const hashedPassword = bcrypt.hashSync(password);

  const user = new User({
    name,
    email,
    password:hashedPassword
  
  });
 await user.save();

      return res.status(201).send({
      success: true,
      message: "User registered succesfully",
      user,
    });
  } catch (error) {
       console.log(error);
    res.status(500).send({
      success: false,
      message: "error in register Api",
      error,
  })}
}


export const login = async (req, res, next) => {

  try {
    const { email, password } = req.body;

  let existingUser;

    existingUser = await User.findOne({ email });
     
      
        if (!existingUser) {
      return res.status(201).send({
        success: false,
        message: "User not found",
      });
    }   
    
      const isPasswordCorrect = bcrypt.compareSync(
        password,
        existingUser.password
      );
          if (!isPasswordCorrect) {
      return res.status(201).send({
        success: false,
        message: "Icorrect password / Email",
      });
    }
   
    const token=jwt.sign({id:existingUser._id},JWT_SECRET_KEY,{
      expiresIn:"35s" 
    });
     console.log("Generated token\n",token);
    if(req.cookies[`${existingUser._id}`]){
      req.cookies[`${existingUser.id}`]=""
    }

    res.cookie(String(existingUser._id),token,{
       path:"/",
       expires:new Date(Date.now()+1000 * 30),
       httpOnly:true,
       sameSite:'lax',
    });

    return res.status(200).send({
      success: true,
      message: "login successfully",
      user:existingUser,
      token
    });

  } catch (error) {
       console.log(error);
    res.status(500).send({
      success: false,
      message: "error in login Api",
      error,
  })
  }
  
};


export const verifyToken=(req,res,next)=>{
   
   const cookies=req.headers.cookie;

   const token=cookies.split("=")[1];
  console.log(token);
  
    if(!token){
       res.status(404).send({message:"no token found"});
    }
    jwt.verify(String(token),JWT_SECRET_KEY,(err,user)=>{
       if(err){
      return   res.status(400).send({message:"Invalid token"});
       }

        req.id=user.id;
    });
   next();

}

export const getUser=async(req,res,next)=>{
      const userId=req.id;
      let user;
      try {
         user=await User.findById(userId,"-password");
      } catch (error) {
        return new Error(error);
      }
      
      if(!user){
         res.status(404).json({message:"User not found"})
      }

      return res.status(200).send({user:user});
}

export const refreshToken=(req,res,next)=>{
  const cookies=req.headers.cookie;

   const prevToken=cookies.split("=")[1];
   if(!prevToken){
      return res.status(400).send({message:"Could not find token"});
   }
   jwt.verify(String(prevToken),JWT_SECRET_KEY,(err,user)=>{
     if(err){
       console.log(err);
       return res.status(403).send({message:"Authentiction failed"})
     }
     res.clearCookie(`${user.id}`);
     req.cookies[`${user.id}`]="";
    
        const token=jwt.sign({id:user.id},JWT_SECRET_KEY,{
          expiresIn:"35s"
        })
    console.log("Regenerated Token\n",token);
      res.cookie(String(user.id),token,{
       path:"/",
       expires:new Date(Date.now()+1000 * 30),
       httpOnly:true,
       sameSite:'lax',
    });
    
    req.id=user.id;

    next();
          
   });
}

export const logout=(req,res,next)=>{
     const cookies=req.headers.cookie;
     const prevToken=cookies.split("=")[1];

      if(!prevToken){
      return res.status(400).send({message:"Could not find token"});
   }


    jwt.verify(String(prevToken),JWT_SECRET_KEY,(err,user)=>{
     if(err){
       console.log(err);
       return res.status(403).send({message:"Authentiction failed"})
     }
     res.clearCookie(`${user.id}`);
     req.cookies[`${user.id}`]="";
     
     return res.status(200).send({message:"Successfully logged Out"});
   });
}


