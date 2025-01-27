import axios from "axios";
import { useAuth } from "../context/useAuth";

export const useAxiosInstance = () => {
  const { setCurrentUser } = useAuth();

  const axiosClient = axios.create({
    baseURL: "http://localhost:5000/api/",
  });

  const axiosAuthClient = axios.create({
    baseURL: "http://localhost:5000/api/",
  });

  //global headers
  axios.defaults.headers = {
    "Content-Type": "application/json",
  };

  //instance headers
  axiosClient.defaults.headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  //set autorization token for outgoing requests
  axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("auth");
    config.headers.authorization = "Bearer " + token;
    return config;
  });

  //when we receive non authorized error logout the application
  axiosClient.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.status === 401) {
        localStorage.clear();
        setCurrentUser(null);
      }
      return Promise.reject(error);
    }
  );

  return { axiosClient, axiosAuthClient };
};
