import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5001",
  withCredentials: true,
});

export default axiosInstance;
