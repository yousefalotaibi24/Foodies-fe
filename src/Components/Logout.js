import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post("http://localhost:8000/api/logout");
      localStorage.removeItem("token"); // Remove the token from localStorage
      return response.data;
    },
    onSuccess: () => {
      navigate("/login");
    },
  });

  const deleteToken = () => {
    localStorage.removeItem("token");
  };

  const handleLogOut = () => {
    deleteToken();
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogOut}
      className="logout-button"
      disabled={mutation.isLoading}
    >
      {mutation.isLoading ? "Logging out..." : "Logout"}
    </button>
  );
};

export default Logout;
