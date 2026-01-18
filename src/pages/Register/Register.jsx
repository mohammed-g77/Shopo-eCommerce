// Register.jsx
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import {
  Box,
  Button,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Snackbar,
  Alert,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

import { RegisterSchema } from "../../validations/RegisterSchema";
import "./Register.css";

const API_URL = "https://knowledgeshop.runasp.net/api/Auth/Account/Register";

export default function Register({ illustrationSrc = "/login_illustration.png" }) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [toast, setToast] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const redirectTimerRef = useRef(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm({
    defaultValues: {
      userName: "",
      fullName: "",
      email: "",
      password: "",
      phoneNumber: "",
      agreeTerms: false,
    },
    resolver: yupResolver(RegisterSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    return () => {
      if (redirectTimerRef.current) clearTimeout(redirectTimerRef.current);
    };
  }, []);

  const openToast = (severity, message) => setToast({ open: true, severity, message });

  const closeToast = (_, reason) => {
    if (reason === "clickaway") return;
    setToast((t) => ({ ...t, open: false }));
  };

const registerForm = async (values) => {
  const payload = {
    userName: values.userName?.trim(),
    fullName: values.fullName?.trim(),
    email: values.email?.trim(),
    password: values.password,
    phoneNumber: values.phoneNumber?.trim() || null,
  };

  try {
    const response = await axios.post(API_URL, payload, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("REGISTER RESPONSE:", response?.data ?? response);

     await axios.post("https://knowledgeshop.runasp.net/api/auth/Account/SendCode", {
      email: payload.email,
    });

     openToast("success", "  تم إنشاء الحساب بنجاح. تم إرسال رابط التفعيل إلى بريدك الإلكتروني.");

    reset();

     redirectTimerRef.current = setTimeout(() => {
      navigate("/login", { replace: true });
    }, 3000);

  } catch (err) {
    console.log("REGISTER ERROR:", err);
    const status = err?.response?.status;
    const data = err?.response?.data;

    console.log("REGISTER ERROR STATUS:", status);
    console.log("REGISTER ERROR DATA:", data);

    const apiErrors = data?.errors;
    if (apiErrors && typeof apiErrors === "object") {
      const fieldMap = {
        Email: "email",
        email: "email",
        UserName: "userName",
        userName: "userName",
        FullName: "fullName",
        fullName: "fullName",
        Password: "password",
        password: "password",
        PhoneNumber: "phoneNumber",
        phoneNumber: "phoneNumber",
      };

      Object.entries(apiErrors).forEach(([key, msgs]) => {
        const fieldName = fieldMap[key] || key;
        const message = Array.isArray(msgs) ? msgs[0] : String(msgs);
        if (fieldName) setError(fieldName, { type: "server", message });
      });
    }

    const serverMsg =
      data?.message ||
      data?.title ||
      data?.error ||
      (typeof data === "string" ? data : null) ||
      "Registration failed";

    openToast("error", serverMsg);
  }
};


  return (
    <div className="register-page">
      <div className="register-container">
        {/* Left Form Panel */}
        <div className="register-form-panel">
          <div className="register-form-content">
            {/* Title */}
            <div className="register-title-section">
              <Typography variant="h4" className="register-title">
                Register
              </Typography>

              {/* Decorative underline */}
              <svg
                className="register-title-underline"
                width="80"
                height="8"
                viewBox="0 0 80 8"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M1 4C20 1 40 1 60 4C65 5 70 6 79 7"
                  stroke="#2b6b6b"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <Box
              component="form"
              onSubmit={handleSubmit(registerForm)}
              className="register-form"
              noValidate
            >
              {/* userName */}
              <div className="form-field">
                <label htmlFor="userName" className="field-label">
                  User Name*
                </label>
                <TextField
                  id="userName"
                  autoComplete="username"
                  inputProps={{ "aria-label": "User Name" }}
                  fullWidth
                  placeholder="username"
                  className="register-input"
                  error={!!errors.userName}
                  helperText={errors.userName?.message}
                  {...register("userName")}
                  InputProps={{ className: "input-field" }}
                />
              </div>

              {/* fullName */}
              <div className="form-field">
                <label htmlFor="fullName" className="field-label">
                  Full Name*
                </label>
                <TextField
                  id="fullName"
                  autoComplete="name"
                  inputProps={{ "aria-label": "Full Name" }}
                  fullWidth
                  placeholder="Mohammed OG"
                  className="register-input"
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                  {...register("fullName")}
                  InputProps={{ className: "input-field" }}
                />
              </div>

              {/* email */}
              <div className="form-field">
                <label htmlFor="email" className="field-label">
                  Email Address*
                </label>
                <TextField
                  id="email"
                  type="email"
                  autoComplete="email"
                  inputProps={{ "aria-label": "Email Address" }}
                  fullWidth
                  placeholder="example@gmail.com"
                  className="register-input"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  {...register("email")}
                  InputProps={{ className: "input-field" }}
                />
              </div>

              {/* password */}
              <div className="form-field">
                <label htmlFor="password" className="field-label">
                  Password*
                </label>
                <TextField
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  inputProps={{ "aria-label": "Password" }}
                  fullWidth
                  placeholder="● ● ● ● ● ●"
                  className="register-input"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  {...register("password")}
                  InputProps={{
                    className: "input-field",
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={showPassword ? "Hide password" : "Show password"}
                          title={showPassword ? "Hide password" : "Show password"}
                          onClick={() => setShowPassword((s) => !s)}
                          edge="end"
                          size="small"
                        >
                          {showPassword ? (
                            <VisibilityOff fontSize="small" />
                          ) : (
                            <Visibility fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

               

              {/* phoneNumber */}
              <div className="form-field">
                <label htmlFor="phoneNumber" className="field-label">
                  Phone Number
                </label>
                <TextField
                  id="phoneNumber"
                  type="tel"
                  autoComplete="tel"
                  inputProps={{ "aria-label": "Phone Number" }}
                  fullWidth
                  placeholder="+970 59 000 0000"
                  className="register-input"
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber?.message}
                  {...register("phoneNumber")}
                  InputProps={{ className: "input-field" }}
                />
              </div>

              {/* Options row */}
              <div className="options-row">
                <Controller
                  name="agreeTerms"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          id="agreeTerms"
                          name={field.name}
                          checked={!!field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          size="small"
                          className="register-checkbox"
                          inputProps={{ "aria-label": "Agree to terms" }}
                        />
                      }
                      label={
                        <Typography variant="body2" className="checkbox-label">
                          I agree to the{" "}
                          <Link href="#" className="terms-link" aria-label="Terms & Privacy">
                            Terms & Privacy
                          </Link>
                        </Typography>
                      }
                    />
                  )}
                />

                <Typography variant="body2" className="login-link-text">
                  Already have an account?{" "}
                  <Link href="/login" className="login-link" aria-label="Go to login page">
                    Log In
                  </Link>
                </Typography>
              </div>

              {errors.agreeTerms && (
                <Typography variant="caption" color="error" className="terms-error">
                  {errors.agreeTerms.message}
                </Typography>
              )}

              {/* Primary Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="create-account-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create Account"}
              </Button>

              {/* Social */}
              <div className="social-section">
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => console.log("Google sign up clicked")}
                  className="google-button"
                  startIcon={
                    <svg
                      width="19"
                      height="20"
                      viewBox="0 0 19 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M18.9892 10.1871C18.9892 9.36767 18.9246 8.76973 18.7847 8.14966H9.68848V11.848H15.0277C14.9201 12.767 14.3388 14.1512 13.047 15.0812L13.0289 15.205L15.905 17.4969L16.1042 17.5173C17.9342 15.7789 18.9892 13.221 18.9892 10.1871Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M9.68813 19.9314C12.3039 19.9314 14.4999 19.0455 16.1039 17.5174L13.0467 15.0813C12.2286 15.6682 11.1306 16.0779 9.68813 16.0779C7.12612 16.0779 4.95165 14.3395 4.17651 11.9366L4.06289 11.9465L1.07231 14.3273L1.0332 14.4391C2.62638 17.6946 5.89889 19.9314 9.68813 19.9314Z"
                        fill="#34A853"
                      />
                      <path
                        d="M4.17667 11.9366C3.97215 11.3165 3.85378 10.6521 3.85378 9.96565C3.85378 9.27909 3.97215 8.6148 4.16591 7.99474L4.1602 7.86273L1.13246 5.44366L1.03339 5.49214C0.37677 6.84305 0 8.36008 0 9.96565C0 11.5765 0.37677 13.0936 1.03339 14.4392L4.17667 11.9366Z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M9.68813 3.85336C11.5073 3.85336 12.7344 4.66168 13.4342 5.33718L16.1686 2.59107C14.4892 0.985496 12.3039 0 9.68813 0C5.89889 0 2.62638 2.23672 1.0332 5.49214L4.16573 7.99466C4.95165 5.59183 7.12612 3.85336 9.68813 3.85336Z"
                        fill="#EB4335"
                      />
                    </svg>
                  }
                >
                  Sign up with Google
                </Button>
              </div>

              {/* Footer */}
              <Typography variant="body2" className="footer-text">
                By creating an account, you agree to our{" "}
                <Link href="#" className="footer-link" aria-label="Terms">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="#" className="footer-link" aria-label="Privacy Policy">
                  Privacy Policy
                </Link>
                .
              </Typography>
            </Box>
          </div>
        </div>

        {/* Right Illustration Panel */}
        <div className="register-illustration-panel">
          <div className="illustration-container">
            <img
              src={illustrationSrc}
              alt="Registration illustration"
              className="illustration-image"
            />
            <div className="decoration decoration-heart" aria-hidden="true">
              ❤️
            </div>
            <div className="decoration decoration-triangle" aria-hidden="true" />
            <div className="decoration decoration-dot decoration-dot-1" aria-hidden="true" />
            <div className="decoration decoration-dot decoration-dot-2" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Snackbar Success/Error */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3500}
        onClose={closeToast}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={closeToast} severity={toast.severity} variant="filled" sx={{ width: "100%" }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
