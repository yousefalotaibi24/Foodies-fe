import instance from "./api";

const login = async (formData) => {
  const data = await instance.post("/api/users/login", formData);
  localStorage.setItem("token", data.token);
  console.log("login data", data);
  return data;
};

export { login };
