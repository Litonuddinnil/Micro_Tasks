import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth"; 
const axiosSecure = axios.create({
  baseURL: "https://carrier-point-server-site.vercel.app",
}); 
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  // Request interceptor to add authorization headers
  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      console.error("Request error:", error);
      return Promise.reject(error);
    }
  );

  // Response interceptor for error handling
  axiosSecure.interceptors.response.use(
    (response) => {
      // Pass through successful responses
      return response;
    },
    async (error) => {
      if (error.response) {
        const status = error.response.status;
        console.error("Interceptor error from the database:", status);

        if (status === 401 || status === 403) {
         
            await logOut();
            navigate("/login");
       
        }
      }  
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;