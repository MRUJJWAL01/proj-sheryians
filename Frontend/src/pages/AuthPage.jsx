import React, { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";

export const AuthPage = () => {
  const [flag, setFlag] = useState(false);
  return (
    <div  className="w-full mt-10  flex flex-col justify-center items-center ">
      {flag ? (
        <RegisterForm setFlag={setFlag} />
      ) : (
      <LoginForm setFlag={setFlag} />
      )}
      ;
    </div>
  );
};
