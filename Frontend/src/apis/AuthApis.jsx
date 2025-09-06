import { data } from "react-router";
import { axiosInstance } from "../config/axiosInstance";

export const registerUser = async (data) => {
  try {
    let newUser = await axiosInstance.post("/auth/user/register", data);
    if (newUser) {
      console.log("user is Created");
      return newUser.data.user;
    }
  } catch (error) {
    console.log("error in registration", error);
  }
};

export const loginUser = async () => {
  try {
    let loggedinUser = await axiosInstance.post("/auth/user/login", data);
    if (loggedinUser) {
      console.log("user login successfull");
      return loggedinUser.data.user;
    }
  } catch (error) {
    console.log("error in login", error);
  }
};
