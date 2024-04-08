"use client";
import Space from "@/components/Space";
import React from "react";
import Link from "next/link";
import { GlobalStateContext } from "../GlobalStateVariable";
import { useContext } from "react";
function page() {
  const [open, setOpen] = useContext(GlobalStateContext);
  return (
    <div>
      <Space />
      <div className="max-w-screen-2xl mx-auto w-auto relative p-4 flex items-center justify-center">
        <div className={
          open
            ? "z-[20] bg-transparent opacity-40 ease-in duration-500"
            : "ease-in duration-500 z-[10]"
        }>
          <div className="">
            <p className="p-2 font-extrabold text-xl">Sign in</p>
            <div className="flex flex-col">
              <p className="pt-3">Enter your Email</p>
              <input
                type="email"
                required
                className="border p-1 my-2 shadow-lg"
              ></input>
              <button className="bg-black w-1/2 text-white p-1 mt-2 hover:bg-black/30 hover:text-slate-800">
                Next
              </button>
            </div>
          </div>
          <div className="py-8">
            <p>New user</p>
            <Link href="./SignUp" className="font-bold hover:text-slate-500">
              Click here to Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
