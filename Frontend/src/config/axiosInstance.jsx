import axios  from "axios";
import { store } from "../store/store";
import { setError } from "../features/error/errorSlice";


export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (response) => response, 
    (error)=>{
        let errorMessage = error.response?.data?.message;
        store.dispatch(setError(errorMessage));
        return Promise.reject(error);
    }
)