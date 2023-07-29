import * as Yup from "yup";

export const registerValidationSchema = Yup.object().shape({
  name: Yup.string()
    .max(20, "Name maximum length should be 20 characters")
    .required("Name is required!")
    .matches(
      /^[a-zA-Z]+$/,
      "Name must not contain numbers or special characters!"
    ),

  dob: Yup.date()
    .nullable()
    .required("Date of birth is required")
    .max(new Date(), "Cannot be greater than today's date"),

  phoneNumber: Yup.string()
    .required("Phone number is required!")
    .matches(/^[0-9]+$/, "Phone Number cannot contain letters")
    .min(8, "Phone Number should be at least 8 digits")
    .max(10, "Phone Number should not exceed 10 digits"),

  address: Yup.array().of(
    Yup.string().required("Address is required")
  ),
  password: Yup.string()
    .required("Password is required")
    .min(10, "Must have a minimum length of 10 characters.")
    .matches(/[A-Z]/, "Password should contain atleast one uppercase character")
    .matches(
      /[a-zA-Z]+[^a-zA-Z\s]+/,
      "Password should contain atleast one special character."
    ),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], "Passwords don't match"),
});
