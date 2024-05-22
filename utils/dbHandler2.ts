import { QueryTypes } from "sequelize";
import { sequelize } from "../config/config";
import { studentMaster } from "../models/studentExamMasterModel";

export const fetchStudents = async(offset:number,col:string,order:string) => {
  const students = await studentMaster.findAll({raw:true,limit:20,offset:offset,order:[[col,order]],attributes:{ exclude: ['createdAt','updatedAt','isDeleted']}});
  const totalStudents = await studentMaster.count({});
  return {students,totalStudents};
}

export const delimiterSearchResult = async(firstname:string[],lastname:string[],email:string[],mobileno:string[]) => {
  const students = await sequelize.query(`SELECT id,surname,name,fatherName,email,mobileNo,collegeName FROM studentMasters where ${firstname} and ${lastname} and ${email} and ${mobileno};`,{
    type: QueryTypes.SELECT,
  });

  return students;

}