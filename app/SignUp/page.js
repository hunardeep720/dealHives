"use client";
import Space from "@/components/Space";
import React from "react";
import Link from "next/link";
import SignWays from "@/components/SignWays";
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
        <div className="text-center flex flex-col justify-center">
          <p className="my-2 font-extrabold text-3xl">Enter your email</p>
          <div className="py-7">
            <input type="email" className="border shadow-lg p-2 w-1/2" />
            <button className="ml-5 text-white bg-black w-1/4 hover:bg-black/30 hover:text-slate-800">
              Next
            </button>
            <div className="flex justify-evenly">
              <Link
                href="./Account"
                className="my-10 font-semibold hover:text-slate-500"
              >
                Already have an account?
              </Link>
            </div>
            <hr className="border-2 my-4 mb-6 border-solid" />
            <SignWays />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
