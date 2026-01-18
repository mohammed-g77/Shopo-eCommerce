import * as yup from "yup";

const phoneRegex = /^[0-9+()\-\s]{7,20}$/;

export const RegisterSchema = yup
  .object({
    userName: yup
      .string()
      .trim()
      .required("User name is required")
      .min(3, "User name must be at least 3 characters")
      .max(20, "User name must be at most 20 characters")
      .matches(
        /^[a-zA-Z0-9._-]+$/,
        "User name can contain letters, numbers, dot, underscore, dash only"
      ),

    fullName: yup
      .string()
      .trim()
      .required("Full name is required")
      .min(3, "Full name must be at least 3 characters")
      .max(60, "Full name must be at most 60 characters"),

    email: yup.string().trim().required("Email is required").email("Email is invalid"),

    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Must contain at least one uppercase letter")
      .matches(/[a-z]/, "Must contain at least one lowercase letter")
      .matches(/\d/, "Must contain at least one number")
      .matches(/[@#$%&?!]/, "Must contain at least one special character (@#$%&?!)")
      .matches(/^\S*$/, "Password must not contain spaces"),
 

    phoneNumber: yup
      .string()
      .transform((v) => (v?.trim?.() === "" ? undefined : v))
      .notRequired()
      .test("phone", "Phone number is invalid", (v) => !v || phoneRegex.test(v)),

    agreeTerms: yup.boolean().oneOf([true], "You must agree to the terms"),
  })
  .required();
