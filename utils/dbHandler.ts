import { Op } from "sequelize";
import { student } from "../models/studentModel";
import { Student } from "../interface/userInterface";

export const storeStudentData = async (data:Student) => {
  const user = await student.create({firstName:data.firstName,lastName:data.lastName,email:data.email,dob:data.dob,password:data.password,isDeleted:false});
  return user.dataValues;
}

export const validateStudentData = async (data:Student) => {
  const user = await student.findAll({
    raw:true,
    where:{
      email:{
        [Op.eq] : data.email,
      }
    }
  })

  return user;
}

export const authenticateStudent = async(data:string) => {
  const user = await student.findAll({
    raw:true,
    where:{
      email:{
        [Op.eq] : data,
      }
    }
  })
  return user;
}