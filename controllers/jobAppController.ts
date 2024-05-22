import { Request,Response } from "express";

export const jobIndex = async(req:Request,res:Response) => {
  res.render('jobIndex');
}