import * as Yup from "yup";

export const LoginValidationSchema = Yup.object({
    email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required")
        .trim(),
    password: Yup.string().required("Password is required").min(8),
});

export const signUpValidationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),
    password: Yup.string()
        .min(8, "Password must contain at least 8 characters")
        .required("Enter your password required"),
    confirmPassword: Yup.string()
        .required("Confirm your password required")
        .oneOf([Yup.ref("password")], "Password does not match"),
    terms: Yup.bool()
        .oneOf([true], "Please make sure you accept the terms & conditions")
        // .required("Please make sure you accept the terms & conditions"),
});
