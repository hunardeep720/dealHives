"use client";
import React, { createContext, useState } from "react";

export const GlobalStateContext = createContext();
export const UserGlobalContext = createContext();
export const UserInformationGlobalContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <GlobalStateContext.Provider value={[open, setOpen]}>
      {children}
    </GlobalStateContext.Provider>
  );
};
export const UserGlobalProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  return (
    <UserGlobalContext.Provider value={[user, setUser]}>
      {children}
    </UserGlobalContext.Provider>
  );
};
export const UserInformationGlobalProvider = ({children}) => {
    const [information, setInformation] = useState('');
    return(
        <UserInformationGlobalContext.Provider value={[information, setInformation]}
        >
            {children}
        </UserInformationGlobalContext.Provider>
    )
}