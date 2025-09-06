import  { useEffect } from "react";
import Navbar from "./components/Navbar";
import Routing from "./router/Routing";
import { useDispatch } from "react-redux";
import { axiosInstance } from "./config/axiosInstance";
import { addUser } from "./features/auth/authSlice";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    
    (async () => {
      try {
        let me = await axiosInstance.get("/auth/me");
        if (me) {
          dispatch(addUser(me?.data?.user));
        }
      } catch (error) {
        console.log(error.message);
        
        console.log("error in me router",error);

      }
    }) () ;
  }, []);
  

  
  return (
    <div>
      <Navbar />
      <Routing />
    </div>
  );
};

export default App;
