import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { UIContext } from "./UIContext";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const {setHideNav} = useContext(UIContext)
  
  

  const logoutUser = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
    });

    if (result.isConfirmed) {
      try {
        await axios.get("http://localhost:5200/users/logout", {
          withCredentials: true,
        });

        setUserData(null);
        localStorage.removeItem("user");
        localStorage.removeItem("shopfinityCart");

        Swal.fire({
          icon: "success",
          title: "Logged out",
          text: "You have been successfully logged out!",
          timer: 1500,
          showConfirmButton: false,
        });
        setHideNav(true); 
        navigate("/login");
      } catch (err) {
        console.error("Logout failed:", err);
        Swal.fire({
          icon: "error",
          title: "Logout Failed",
          text: "Something went wrong. Please try again!",
        });
      }
    }
  };

  return (
    <AuthContext.Provider value={{ userData, setUserData, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
