import { sequelize } from "../config/config";
import { DataTypes } from "sequelize";
import {studentMasterInstance} from "../interface/studentMasterModelInterface"

export const studentMaster = sequelize.define<studentMasterInstance>('studentMaster',{
  id:{
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey:true,
    unique:true,
    autoIncrement:true
  },
  surname:{
    type: DataTypes.STRING,
    allowNull:false
  },
  name:{
    type: DataTypes.STRING,
    allowNull:false,
  },
  fatherName:{
    type: DataTypes.STRING,
    allowNull:false
  },
  email:{
    type: DataTypes.STRING,
    allowNull:false
  },
  mobileNo:{
    type: DataTypes.BIGINT,
    allowNull:false
  },
  collegeName:{
    type: DataTypes.STRING,
    allowNull:false
  },
  isDeleted:{
    type: DataTypes.BOOLEAN,
    allowNull:false,
    defaultValue: false
  }
})

const initializeModel = async () => {
  try{
    await sequelize.sync();
  }catch(err){
    console.log(err);
  }
}

initializeModel()