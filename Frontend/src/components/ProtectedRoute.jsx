import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router'

const ProtectedRoute = ({children}) => {
    const navigate = useNavigate();

   const { user, isLoggedIn } = useSelector((state) => state.auth);
    useEffect(() => {
        if(!user){
            navigate("/auth");
        }
        
        
    }, [user]);
  return isLoggedIn? <>{children}</>:"";
}

export default ProtectedRoute