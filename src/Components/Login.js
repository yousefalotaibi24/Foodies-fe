import React from "react";
import Nav from "./Nav";
import { Formik, Form, Field } from "formik";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { login } from "../API/auth";
import "../App.css";
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

  const handleSubmit = (formData) => {
    mutation.mutate({
      username: formData.username,
      password: formData.password,
    });
  };

  return (
    <div className="formik-container background">
      <div>
        <Nav />
      </div>
      <div>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={handleSubmit}
        >
          <Form>
            <Field type="text" name="username" placeholder="Username" />
            <br />
            <Field type="password" name="password" placeholder="Password" />
            <br />
            <button type="submit">Login</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
