import React, { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";

export const AuthPage = () => {
  const [flag, setFlag] = useState(false);
  return (
    <div  className="w-full h-screen flex flex-col justify-center items-center">
      {flag ? (
          <LoginForm setFlag={setFlag} />
        ) : (
            <RegisterForm setFlag={setFlag} />
        )}
      ;
    </div>
  );
};
