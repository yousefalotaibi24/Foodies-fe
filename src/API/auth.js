import instance from "./api";

const login = async (formData) => {
  console.log(formData);
  const data = await instance.post("/auth/login", formData);
  localStorage.setItem("token", data.token);
  console.log("login data", data);
  return data;
};

const register = async (formData) => {
  console.log(formData);
  const data = await instance.post("/auth/register", formData);
  localStorage.setItem("token", data.token);
  console.log("register data", data);
  return data;
};

export { login, register };
