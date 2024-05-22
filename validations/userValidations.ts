import { body } from "express-validator";

export const studentValidator = [
  body("firstName").isLength({min:3}).withMessage("Name must be of 3 characters long.").matches(/^[A-Za-z\s]+$/).withMessage("Name should contain alphabets only"),
  body("lastName").isLength({min:3}).withMessage("Name must be of 3 characters long.").matches(/^[A-Za-z\s]+$/).withMessage("Name should contain alphabets only"),
  body("dob").isDate().withMessage("DOB should be validate date"),
  body("password").isLength({min:8})
];

export const loginValidator = [
  body("password").isLength({min:8})
];