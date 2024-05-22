import express, { Router } from "express";
import { LandingPage, registerPage, registerStudent, loginPage, loginStudent } from "../controllers/staticController";
import { studentValidator, loginValidator } from "../validations/userValidations";
import { applyPassportStrategy } from "../middleware/passport";
import passport from "passport";
import studentRoutes from "./studentRoutes";

const routes: Router = express.Router();

routes.get("/", LandingPage);

routes.get("/register", registerPage);

routes.post("/register", studentValidator, registerStudent);

routes.get("/login", loginPage);

routes.post("/login", loginValidator, loginStudent);

applyPassportStrategy();

routes.use("/student", passport.authenticate("jwt", { session: false, failureRedirect: "/" }), studentRoutes);

export default routes;