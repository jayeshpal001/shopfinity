import { createContext, useState } from "react";

export const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [hideNav, setHideNave] = useState(true);

  return (
    <UIContext.Provider value={{ hideNav, setHideNave }}>
      {children}
    </UIContext.Provider>
  );
};
