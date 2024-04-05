"use client";
import React, { createContext, useState } from "react";

export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    return(
        <GlobalStateContext.Provider value={[ open, setOpen ]}>
            {children}
        </GlobalStateContext.Provider>
    )
}