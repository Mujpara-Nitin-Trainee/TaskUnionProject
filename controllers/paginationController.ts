import { Request,Response } from "express";
import { fetchStudents,delimiterSearchResult } from "../utils/dbHandler2";

export const paginateOrderBy = async(req:Request,res:Response) => {
  res.render('orderBy');
}

export const delimiterSearch = async(req:Request,res:Response) => {
  res.render('delimiterSearch');
}

export const orderBy = async(req:Request,res:Response) => {
  try{

    let page:number = req.params.page as unknown as number || 1;
    let col:string = req.params.col || "id";
    let order:string = req.params.order || "asc";

    let offset:number = (page-1)*20;

    let {students,totalStudents} = await fetchStudents(offset,col,order);

    if(students){
      return res.status(200).json({success:true,students,totalStudents,order,col});
    }else{
      return res.status(404).json({success:false,message:"Something went wrong"});
    }

  }catch(err){
    console.log(err);
  }
}

export const delimiterSearching = async(req:Request,res:Response) => {
  try{

    const data:string = req.body.search;

        let values:string[] = [];
        let i = 0;
        for(let j=1; j <= data.length; j++){
            
            if((data.charAt(i) == '_' || data.charAt(i) == '^' || data.charAt(i) == '$' || 
                data.charAt(i) == '}' || data.charAt(i) == '{' || data.charAt(i) == '#') && 
                (data.charAt(j) == '_' || data.charAt(j) == '^' || data.charAt(j) == '$' || 
                data.charAt(j) == '}' || data.charAt(j) == '{' || data.charAt(j) == '#')){

                let answer = data.substring(i,j);
                values.push(answer);
                i = j;
            
            }else if((data.charAt(i) == '_' || data.charAt(i) == '^' || data.charAt(i) == '$' || 
            data.charAt(i) == '}' || data.charAt(i) == '{' || data.charAt(i) == '#') && j == data.length){
                let answer = data.substring(i,j);
                values.push(answer);
                i = j;
            }
        }

        let firstname:string[] = [];
        let lastname:string[] = [];
        let email:string[] = [];
        let age:string[] = [];
        let gender:string[] = [];
        let mobileno:string[] = [];

        for(let k=0; k < values.length ; k++){

            if(values[k].charAt(0) == '_'){
                firstname.push(`name LIKE '%${values[k].slice(1)}%'`); 
            }else if(values[k].charAt(0) == '^'){
                lastname.push(`surname LIKE '%${values[k].slice(1)}%'`);
            }else if(values[k].charAt(0) == '$'){
                email.push(`email LIKE '%${values[k].slice(1)}%'`);
            }else if(values[k].charAt(0) == '}'){
                age.push(values[k].slice(1));
            }else if(values[k].charAt(0) == '{'){
                gender.push(values[k].slice(1));
            }else if(values[k].charAt(0) == '#'){
                mobileno.push(`mobileNo LIKE '%${values[k].slice(1)}%'`);
            }
        }

        if(firstname.length > 0) { firstname.join("or") }
        if(lastname.length > 0) { lastname.join("or") }
        if(email.length > 0) { email.join("or") }
        if(age.length > 0) { age.join("or") }
        if(gender.length > 0) { gender.join("or") }
        if(mobileno.length > 0) { mobileno.join("or") }

        function isEmpty(val:string[]) {
          return (val === null || val.length <= 0) ? true : false;
      }

        if(isEmpty(firstname)){
            firstname.push(`name LIKE '%'`);
        }
        if(isEmpty(lastname)){
            lastname.push(`surname LIKE '%'`);
        }
        if(isEmpty(mobileno)){
            mobileno.push(`mobileNo LIKE '%'`);
        }
        if(isEmpty(email)){
            email.push(`email LIKE '%'`)
        }


        let students = await delimiterSearchResult(firstname,lastname,email,mobileno);

        if(students){
          return res.status(200).json({success:true,students});
        }else{
          return res.status(404).json({success:false,message:"Something went wrong"});
        }


  }catch(err){
    console.log(err);
  }
}