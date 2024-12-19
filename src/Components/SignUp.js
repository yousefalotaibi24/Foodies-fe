import React from "react";
import Nav from "./Nav";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import axios from "axios";
import { register } from "../API/auth";

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
  image: Yup.string().url("Must be a valid URL"),
});

const SignUp = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const response = await register(formData);
      return response.data;
    },
    onSuccess: () => {
      navigate("/login");
    },
  });

  return (
    <div className="auth-page">
      <Nav />
      <div className="auth-container">
        <div className="auth-box">
          <h2>Create Account</h2>
          <p className="auth-subtitle">Join our cooking community</p>

          <Formik
            initialValues={{
              username: "",
              password: "",
              confirmPassword: "",
              image: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={(values, { setSubmitting }) => {
              mutation.mutate({
                username: values.username,
                password: values.password,
                image: values.image,
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
                    placeholder="Choose a username"
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
                    placeholder="Create a password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    className="auth-input"
                    placeholder="Confirm your password"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="image">Profile Image URL</label>
                  <Field
                    type="text"
                    name="image"
                    id="image"
                    className="auth-input"
                    placeholder="Enter image URL"
                  />
                  <ErrorMessage
                    name="image"
                    component="div"
                    className="error-message"
                  />
                </div>

                {mutation.isError && (
                  <div className="error-message">
                    {mutation.error.message ||
                      "An error occurred during registration"}
                  </div>
                )}

                <button
                  type="submit"
                  className="auth-button"
                  disabled={isSubmitting || mutation.isLoading}
                >
                  {mutation.isLoading
                    ? "Creating Account..."
                    : "Create Account"}
                </button>

                <div className="auth-links">
                  <a href="/login">Already have an account? Sign in</a>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignUp;