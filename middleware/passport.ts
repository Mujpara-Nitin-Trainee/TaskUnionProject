import { ExtractJwt,Strategy, StrategyOptionsWithoutRequest } from "passport-jwt";
import { Request } from "express";
import { config } from "dotenv";
import passport from "passport";
import {passportPrivacy} from "../interface/passportInterface";
import {authenticateStudent} from "../utils/dbHandler";
import { JwtPayload } from "jsonwebtoken";

config();

const cookieExtractor = (req:Request) => {
  let token:string | null = null;
  if(req && req.cookies){
    token = req.cookies.token;
  }
  return token;
}

export const applyPassportStrategy = () => {
  const options:passportPrivacy = {
    secretOrKey: "",
    jwtFromRequest: ""
  };

  options.secretOrKey = process.env.SECRET_KEY || "HelloWorld";
  
  let jwt:string | null = null;

  try{

    jwt = ExtractJwt.fromExtractors([cookieExtractor]) as unknown as string;

  }catch(err){
    console.log(err);
    return null;
  }

  options.jwtFromRequest = jwt;
  
  passport.use(
    new Strategy(options as unknown as StrategyOptionsWithoutRequest, async(payload:JwtPayload,done) => {

      let user = await authenticateStudent(payload.email);

      if(user.length !== 0){

        return done(null, user);

      }
      return done(null, false);
    })
  )
}
