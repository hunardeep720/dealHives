"use client";
import React, { createContext, useState } from "react";

export const GlobalStateContext = createContext();
export const GlobalStateProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <GlobalStateContext.Provider value={[open, setOpen]}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const ProductStateContext = createContext();
export const ProductStateProvider = ({children}) => {
  const [product, setProduct] = useState('');
  return (
    <ProductStateContext.Provider value={[product, setProduct]}>
      {children}
    </ProductStateContext.Provider>
  )
};

export const PageStateContext = createContext();
export const PageStateProvider = ({children}) => {
  const [page, setPage] = useState(false);
  return (
    <PageStateContext.Provider value={[page, setPage]}>
      {children}
    </PageStateContext.Provider>
  )
};