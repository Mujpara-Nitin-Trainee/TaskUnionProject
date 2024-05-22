import { Request,Response } from "express";
import { storeStudentData,validateStudentData } from "../utils/dbHandler";
import {Student} from "../interface/userInterface";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

export const LandingPage = async(req : Request, res: Response) => {
  res.render('index');
}

export const registerPage = async (req : Request, res: Response) => {
  res.render('register');
}

export const loginPage = async(req:Request, res: Response) => {
  res.render('login');
}

export const homePage = async(req:Request, res:Response) => {
  res.render('home');
}

export const dynamicTable = async(req:Request, res:Response) => {
  res.render('dynamicTable');
}

export const kukuKube = async(req:Request, res: Response) => {
  res.render('kukuKube');
}

export const ticTacToe = async(req: Request, res: Response) => {
  res.render('ticTacToe');
}

export const registerStudent = async(req:Request, res:Response) => {
  try{

    const user : Student = req.body;

    const errors = validationResult(req);

    if(!errors.isEmpty()) { return res.status(422).json({success:false, message:"Something went wrong."}); }

    const result = await storeStudentData(user);

    if(result) { return res.status(200).json({success:true,message:"Student Registered Successfully"}); }
    else { return res.status(500).json({success:false,message:"Something went wrong"}); }

  }catch(err){

    console.log(err);

  }
}

export const loginStudent = async(req:Request, res:Response) => {
  try{

    const user:Student = req.body;

    const errors = validationResult(req);

    if(!errors.isEmpty()) { return res.status(422).json({success:false, message:"Something went wrong."}); }

    const checkEmail = await validateStudentData(user);

    if(!checkEmail[0].email){ return res.status(404).json({success:false, message:"Something went wrong"}); }
    else{
      if(checkEmail[0].password === user.password){ 

        const token = jwt.sign(
          {email:req.body.email},
          process.env.SECRET_KEY || "HelloWorld",
          {expiresIn:"1d"}
        )

        res.cookie("token",token,{maxAge: 24 * 60 * 60 * 1000})

        return res.status(200).json({success:true, message:"User login Successfully"}) 

      }else{
        
        return res.status(401).json({success:false, message:"Invalid Credentials"})
      
      }
    }
 
  }catch(err){
    console.log(err);
  }
}