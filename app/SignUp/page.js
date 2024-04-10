"use client";
import Space from "@/components/Space";
import React from "react";
import EmailRegister from "@/components/EmailRegister";
import { GlobalStateContext } from "../GlobalStateVariable";
import { useContext } from "react";
function page() {
  const [open, setOpen] = useContext(GlobalStateContext);
  return (
    <div className="max-w-screen-2xl mx-auto p-4">
      <Space />
      <div
        className={
          open
            ? "z-[20] bg-transparent opacity-40 ease-in duration-500"
            : "ease-in duration-500 z-[10]"
        }
      >
        <EmailRegister />
        
      </div>
    </div>
  );
}

export default page;
