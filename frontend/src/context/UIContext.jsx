import { useEffect } from "react";
import { createContext, useState } from "react";

export const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [hideNav, setHideNave] = useState(true);

   useEffect(() => {
    const storeNav = localStorage.getItem("hideNav"); 
    if (storeNav==='false') {
      setHideNave(false); 
    }
    else{
      setHideNave(true); 
    }
  }, [])

  useEffect(() => {
   localStorage.setItem('hideNav', hideNav.toString()); 
  }, [hideNav])

 
  
  

  return (
    <UIContext.Provider value={{ hideNav, setHideNave }}>
      {children}
    </UIContext.Provider>
  );
};
