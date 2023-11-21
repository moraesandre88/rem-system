import { createContext, useState } from "react";

const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [roles, setRoles] = useState({});

  return (
    <GlobalContext.Provider value={{ auth, setAuth , roles, setRoles}}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
