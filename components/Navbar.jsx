"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

function Navbar() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div className="max-w-full m-auto fixed top-0 bottom-0 left-0 right-0">
      <div className={open? ("bg-black/80 opacity-80"):("bg-slate-500")}>
        <div className="grid grid-cols-3 justify-center sm:grid-cols-6">
          <div className="my-3 pl-6 col-span-1">
            <Link href="/">
              <h1 className="font-extrabold text-4xl">XYZ</h1>
            </Link>
          </div>
          <div className="hidden sm:block col-span-3">
            <input
              type="search"
              placeholder="Search products"
              className="p-1 border-black rounded-md w-full m-2"
            ></input>
          </div>
          <div className="m-2 pl-7 pt-3 col-span-1 flex justify-center">
            <Link href="/Account">
              <button className="font-bold">Sign in</button>
            </Link>
          </div>
          <div className="pt-5 col-span-1 flex justify-evenly">
            <Link href="/Cart">
              <button className="font-bold">Cart</button>
            </Link>
          </div>
        </div>
          <div className="flex justify-end pb-3 sm:hidden">
            {open ? null : (
              <AiOutlineMenu className="mx-2" size={24} onClick={handleOpen} />
            )}
            <input
              type="search"
              placeholder="Search products"
              className="p-2 mx-5 border-black rounded-md w-4/5 "
            />
          </div>
              <div>
                <ul className="flex justify-evenly bg-slate-500 overflow-x-scroll">
                  <li className="p-2">
                    <Link href="/Electronics">Electronics</Link>
                  </li>
                  <li className="p-2">
                    <Link href="/Clothing">Clothing</Link>
                  </li>
                  <li className="p-2">
                    <Link href="/Furniture">Furniture</Link>
                  </li>
                  <li className="p-2">
                    <Link href="/Books">Books</Link>
                  </li>
                  <li className="p-2">
                    <Link href="/Toys">Toys</Link>
                  </li>
                  <li className="p-2">
                    <Link href="/Sports">Sports</Link>
                  </li>
                </ul>
            <div
              className={
                open
                  ? "sm:hidden pt-3 absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-end items-center w-36 h-screen bg-black/80 text-center ease-in duration-300 z-[18]"
                  : "sm:hidden absolute pt-3 top-0 left-[-100%] right-0 bottom-0 flex flex-col justify-end items-center w-32 h-screen bg-black/80 text-center ease-in duration-300 z-[18]"
              }
            >
              <ul className="flex justify-start text-white h-screen flex-col">
                <div className="w-full flex justify-end">
                  <AiOutlineClose
                    onClick={handleOpen}
                    className="mr-7 my-3"
                    size={25}
                  />
                </div>
                <li className="my-4 font-bold text-2xl hover:text-slate-400">
                  <Link href="/Electronics">Electronics</Link>
                </li>
                <li className="my-4 m-2 pl-3 font-bold text-2xl hover:text-slate-400">
                  <Link href="/Clothing">Clothing</Link>
                </li>
                <li className="my-4 m-2 pl-3 font-bold text-2xl hover:text-slate-400">
                  <Link href="/Furniture">Furniture</Link>
                </li>
                <li className="my-4 m-2 pl-3 font-bold text-2xl hover:text-slate-400">
                  <Link href="/Books">Books</Link>
                </li>
                <li className="my-4 m-2 pl-3 font-bold text-2xl hover:text-slate-400">
                  <Link href="/Toys">Toys</Link>
                </li>
                <li className="my-4 m-2 pl-3 font-bold text-2xl hover:text-slate-400">
                  <Link href="/Sports">Sports</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Navbar;
