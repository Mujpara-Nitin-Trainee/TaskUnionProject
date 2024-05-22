import  { Sequelize } from "sequelize";
import { config } from "dotenv";

config()

let dbName: string  = process.env.DB_NAME!;
let dbUser: string  = process.env.DB_USER!;
let dbPassword: string  = process.env.DB_PASS!;
let dbHost: string  = process.env.DB_HOST!;

export const sequelize = new Sequelize(dbName,dbUser,dbPassword,{
  host: dbHost,
  dialect: 'mysql',
  logging:false
})


const InitiateConnection = async () => {
  try{
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  }catch(err){
    console.log(err);
  }
}

InitiateConnection();
