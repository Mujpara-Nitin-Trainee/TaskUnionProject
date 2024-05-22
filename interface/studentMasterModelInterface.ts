import { Model, Optional } from "sequelize";

interface studentMasterAttribute{
  id:number,
  surname:string,
  name:string,
  fatherName:string,
  email:string,
  mobileNo:bigint,
  collegeName:string,
  isDeleted:boolean
}

interface studentMasterCreationAttribute extends Optional<studentMasterAttribute,'id'> {}

export interface studentMasterInstance extends Model<studentMasterAttribute,studentMasterCreationAttribute>,
studentMasterAttribute{
    createdAt? :Date;
    updatedAt? :Date;
  }

  