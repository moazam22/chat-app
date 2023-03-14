import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const signupSchema = yup.object().shape({
  // firstName: yup.string().matches(/^\S*$/, "No spaces are allowed").required(),
  // lastName: yup.string().matches(/^\S*$/, "No spaces are allowed").required(),
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});
