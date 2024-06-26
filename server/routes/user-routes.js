import express from "express";
import {  getUser, login, signup, verifyToken,refreshToken, logout  } from "../controllers/user-controller.js";



const router=express.Router();


router.post("/signup",signup);
router.post("/login",login);
router.get("/user",verifyToken,getUser);
router.get('/refresh',refreshToken,verifyToken,getUser);
//verify token
router.post("/logout",verifyToken,logout);

export default router;

