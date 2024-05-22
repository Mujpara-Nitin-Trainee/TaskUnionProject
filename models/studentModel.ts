import { sequelize } from "../config/config";
import { DataTypes } from "sequelize";
import { studentInstance } from "../interface/studentModelInterface";


export const student = sequelize.define<studentInstance>('students',
{ 
  id:{
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey:true,
    unique:true,
    autoIncrement:true
  },
  firstName:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  email:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  dob:{
    type: DataTypes.DATE,
    allowNull: false,
  },
  password:{
    type: DataTypes.STRING,
    allowNull: false
  },
  isDeleted:{
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}
)

const initializeModel = async() => {
  try{
    await sequelize.sync();
  }catch(err){
    console.log(err);
  }
}

initializeModel();
