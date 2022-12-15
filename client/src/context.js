import React, { useState, useContext, useEffect } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [userName, setUserName] = useState("user");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {}, [userName, email, userType, loggedIn]);
  return (
    <AppContext.Provider
      value={{
        userName,
        setUserName,
        email,
        setEmail,
        userType,
        setUserType,
        loggedIn,
        setLoggedIn,
        id,
        setId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
