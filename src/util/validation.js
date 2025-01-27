import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
      "Password must contain atleast 1 lowercase, 1 uppercase, 1 number and 1 special character."
    )
    .required("Password is required"),
});

export const signupSchema = yup.object({
  name: yup.string("Enter your name").required("Name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
      "Password must contain atleast 1 lowercase, 1 uppercase, 1 number and 1 special character."
    )
    .required("Password is required"),
});

export const courseSchema = yup.object({
  title: yup.string("Enter the title").required("Title is required"),
  description: yup
    .string("Enter the description")
    .required("Description is required")
    .min(20, "Description should be of minimum 20 characters length"),
  price: yup.number().positive("price should be a positive number"),
});

export const studentSchema = yup.object({
  name: yup.string("Enter your name").required("Name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
});
