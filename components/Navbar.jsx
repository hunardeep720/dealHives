"use client";
import {
  GlobalStateContext,
  ProductStateContext,
  PageStateContext,
} from "@/app/GlobalStateVariable";
import Link from "next/link";
import { useUserAuth } from "@/utils/auth-context";
import React from "react";
import { getItems } from "@/service/store-service";
import { useContext, useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { IoHome } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

function Navbar() {
  const [open, setOpen] = useContext(GlobalStateContext);
  const [product, setProduct] = useContext(ProductStateContext);
  const [page, setPage] = useContext(PageStateContext);
  const [name, setName] = useState("Sign In");
  const { user } = useUserAuth();
  const [newPage, setNewPage] = useState(false);
  const [search, setSearch] = useState("");
  const handleOpen = () => {
    setOpen(!open);
  };
  const loadItems = async () => {
    if (user) {
      const userItems = await getItems(user.uid);
      setName("Hi " + userItems.map((item) => item.name));
    } else {
      console.log("no user");
      setName("Sign In");
    }
  };
  useEffect(() => {
    loadItems();
  }, [user]);
  const InputSearch = () => {
    if (search.length > 0) {
      const stringWithHypens = search.split(" ").join("-");
      setProduct(stringWithHypens);
      setSearch("");
      setNewPage(true);
    } else {
      setSearch("Enter Something");
      setNewPage(false);
    }
  };
  return (
    <div className="w-full flex justify-center fixed left-0 top-0 z-[10]">
      <div className="z-10 max-w-screen-2xl w-full">
        <div
          className={
            open
              ? "z-[20] bg-transparent opacity-40 ease-in duration-500"
              : "ease-in duration-500 z-[10]"
          }
          onClick={open ? handleOpen : null}
        >
          <div className=" z-[10] bg-slate-200">
            <div className="grid grid-cols-2 justify-center sm:grid-cols-6">
              <div className="my-3 pl-6 col-span-1">
                <Link
                  onClick={() => {
                    setPage(false);
                  }}
                  href="/"
                >
                  <h1 className="font-extrabold text-3xl hover:text-4xl">
                    Deal Hives
                  </h1>
                </Link>
              </div>
              <div className="hidden sm:grid col-span-3 items-center">
                <form className="flex items-center text-black">
                  <input
                    type="search"
                    value={search}
                    placeholder="Search products"
                    className="p-1 border-black hover:border-2 rounded-md w-full m-2 text-black placeholder:text-black"
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setNewPage(true);
                    }}
                  ></input>
                  {newPage ? (
                    <Link href="./Products" onClick={InputSearch}>
                      <button
                        type="submit"
                        className="text-black text-2xl font-bold hover:text-3xl hover:font-extrabold"
                      >
                        Go
                      </button>
                    </Link>
                  ) : (
                    <Link href="./" onClick={InputSearch}>
                      <button
                        type="submit"
                        className="text-black text-2xl font-bold hover:text-3xl hover:font-extrabold"
                      >
                        Go
                      </button>
                    </Link>
                  )}
                </form>
              </div>
              <div className="m-2 pl-7 pt-3 col-span-1 flex sm:hidden justify-evenly">
              <Link href="/Account">
                  <button className="font-bold hover:text-lg hover:font-extrabold">
                    {name}
                  </button>
                </Link>
                <Link href="/Cart">
                  <button className="font-bold hover:text-lg hover:font-extrabold">
                    Cart
                  </button>
                </Link>
              </div>
              <div className="m-2 pl-7 pt-3 col-span-1 hidden sm:flex justify-center">
                <Link href="/Account">
                  <button className="font-bold hover:text-lg hover:font-extrabold">
                    {name}
                  </button>
                </Link>
              </div>
              <div className="pt-5 col-span-1 hidden sm:flex justify-evenly">
                <Link href="/Cart">
                  <button className="font-bold hover:text-lg hover:font-extrabold">
                    Cart
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex justify-evenly items-center pb-3 sm:hidden">
              {open ? null : (
                <AiOutlineMenu
                  className="mx-2"
                  size={24}
                  onClick={handleOpen}
                />
              )}

              <form className="flex items-center justify-center">
                <input
                  type="search"
                  value={search}
                  placeholder="Search products"
                  className="p-1 border-black placeholder:text-black rounded-md w-full m-2"
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setNewPage(true);
                  }}
                />
                {newPage ? (
                  <Link href="./Products" onClick={InputSearch}>
                    <button
                      type="submit"
                      className="text-black text-2xl font-bold"
                    >
                      Go
                    </button>
                  </Link>
                ) : (
                  <Link href="./" onClick={InputSearch}>
                    <button
                      type="submit"
                      className="text-black text-2xl font-bold"
                    >
                      Go
                    </button>
                  </Link>
                )}
              </form>
            </div>
            <div>
              <ul className="justify-evenly bg-slate-100 overflow-x-scroll hidden sm:pl-2 sm:flex">
                <li className="p-2 mx-2 px-2 hover:text-lg hover:font-semibold">
                  <Link
                    onClick={() => {
                      setProduct("electronics");
                    }}
                    href="./Products"
                  >
                    Electronics
                  </Link>
                </li>
                <li className="p-2 mx-2 px-2 hover:text-lg hover:font-semibold">
                  <Link
                    onClick={() => {
                      setProduct("skin-care");
                    }}
                    href="./Products"
                  >
                    Skin Care
                  </Link>
                </li>
                <li className="p-2 mx-2 px-2 hover:text-lg hover:font-semibold">
                  <Link
                    onClick={() => {
                      setProduct("furniture");
                    }}
                    href="./Products"
                  >
                    Furniture
                  </Link>
                </li>
                <li className="p-2 mx-2 px-2 hover:text-lg hover:font-semibold">
                  <Link
                    onClick={() => {
                      setProduct("movies");
                    }}
                    href="./Products"
                  >
                    Movies
                  </Link>
                </li>
                <li className="p-2 px-2 hover:text-lg hover:font-semibold">
                  <Link
                    onClick={() => {
                      setProduct("kids");
                    }}
                    href="./Products"
                  >
                    Kids
                  </Link>
                </li>
                <li className="p-2 mx-2 px-2 hover:text-lg hover:font-semibold">
                  <Link
                    onClick={() => {
                      setProduct("Sport");
                    }}
                    href="./Products"
                  >
                    Sports
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className={
            open
              ? "sm:hidden -mt-5 pt-3 absolute top-0 left-0 right-0 bottom-0 flex flex-col w-screen h-screen ease-in duration-300 z-[18]"
              : "sm:hidden -mt-5 absolute pt-3 top-0 left-[-100%] right-0 bottom-0 flex flex-col w-screen h-screen ease-in duration-300 z-[18]"
          }
        >
          <div className="grid grid-cols-4 w-screen z-20">
            <div className="col-span-3 bg-slate-200 pl-3">
              <div className="my-4 font-bold text-3xl text-black">
                <Link
                  href="/Account"
                  onClick={handleOpen}
                  className="flex items-center gap-2"
                >
                  {name} <FaUserAlt />
                </Link>
              </div>
              <div className="relative w-full grid grid-cols-2 mb-10">
                <hr className="absolute border-b-4 border-black w-full flex justify-start" />
              </div>
              <ul className="flex justify-start text-black h-screen flex-col my-3">
                <li className="my-4 pl-5 font-bold text-2xl">
                  <Link
                    onClick={() => {
                      handleOpen();
                    }}
                    href="./"
                    className="flex items-center gap-2"
                  >
                    Home <IoHome />
                  </Link>
                </li>
                <li className="my-4 pl-5 font-bold text-2xl">
                  <Link
                    onClick={() => {
                      setProduct("electronics");
                      handleOpen();
                    }}
                    href="./Products"
                  >
                    Electronics
                  </Link>
                </li>
                <li className="my-4 m-2 pl-3 font-bold text-2xl">
                  <Link
                    onClick={() => {
                      setProduct("Skin-Care");
                      handleOpen();
                    }}
                    href="./Products"
                  >
                    Skin Care
                  </Link>
                </li>
                <li className="my-4 m-2 pl-3 font-bold text-2xl">
                  <Link
                    onClick={() => {
                      setProduct("furniture");
                      handleOpen();
                    }}
                    href="./Products"
                  >
                    Furniture
                  </Link>
                </li>
                <li className="my-4 m-2 pl-3 font-bold text-2xl">
                  <Link
                    onClick={() => {
                      setProduct("movies");
                      handleOpen();
                    }}
                    href="./Products"
                  >
                    Movies
                  </Link>
                </li>
                <li className="my-4 m-2 pl-3 font-bold text-2xl">
                  <Link
                    onClick={() => {
                      setProduct("kids");
                      handleOpen();
                    }}
                    href="./Products"
                  >
                    Kids
                  </Link>
                </li>
                <li className="my-4 m-2 pl-3 font-bold text-2xl">
                  <Link
                    onClick={() => {
                      setProduct("Sport");
                      handleOpen();
                    }}
                    href="./Products"
                  >
                    Sports
                  </Link>
                </li>
              </ul>
            </div>
            <div className={open ? "bg-black/60 p-5" : "hidden"} onClick={handleOpen}>
              <IoCloseSharp className="text-white" size={30} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
