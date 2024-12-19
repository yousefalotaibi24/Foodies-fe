import React from "react";
import Nav from "./Nav";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { login } from "../API/auth";
import * as Yup from "yup";
import "../App.css";

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const response = await login(formData);
      return response.data;
    },
    onSuccess: () => {
      navigate("/");
    },
  });

  return (
    <div className="auth-page">
      <Nav />
      <div className="auth-container">
        <div className="auth-box">
          <h2>Welcome Back</h2>
          <p className="auth-subtitle">Sign in to your account</p>

          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={(values, { setSubmitting }) => {
              mutation.mutate({
                username: values.username,
                password: values.password,
              });
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="auth-form">
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Field
                    type="text"
                    name="username"
                    id="username"
                    className="auth-input"
                    placeholder="Enter your username"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    className="auth-input"
                    placeholder="Enter your password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error-message"
                  />
                </div>

                {mutation.isError && (
                  <div className="error-message">
                    {mutation.error.message || "An error occurred during login"}
                  </div>
                )}

                <button
                  type="submit"
                  className="auth-button"
                  disabled={isSubmitting || mutation.isLoading}
                >
                  {mutation.isLoading ? "Signing in..." : "Sign In"}
                </button>

                <div className="auth-links">
                  <a href="/forgot-password">Forgot Password?</a>
                  <a href="/signup">Don't have an account? Sign up</a>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
