import { Model, Optional } from "sequelize";

interface studentAttribute{
  id:number,
  firstName:string,
  lastName:string,
  email:string,
  dob:Date,
  password:string,
  isDeleted:boolean
}

interface studentCreationAttribute extends Optional<studentAttribute,'id'> {}

export interface studentInstance extends Model<studentAttribute,studentCreationAttribute>,
  studentAttribute{
    createdAt? :Date;
    updatedAt? :Date;
  }

  