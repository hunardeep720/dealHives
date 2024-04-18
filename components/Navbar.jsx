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
          <div className=" z-[10] bg-slate-600">
            <div className="grid grid-cols-3 justify-center sm:grid-cols-6">
              <div className="my-3 pl-6 col-span-1">
                <Link
                  onClick={() => {
                    setPage(false);
                  }}
                  href="/"
                >
                  <h1 className="font-extrabold text-4xl">XYZ</h1>
                </Link>
              </div>
              <div className="hidden sm:block col-span-3">
                <form className="flex items-center">
                  <input
                    type="search"
                    value={search}
                    placeholder="Search products"
                    className="p-1 border-black rounded-md w-full m-2"
                    onChange={(e) => {
                      setSearch(e.target.value);setNewPage(true)
                    }}
                  ></input>
                  {newPage ? (
                    <Link href="./Products" onClick={InputSearch}>
                      <button type="submit" className="text-white text-2xl font-bold">Go</button>
                    </Link>
                  ) : (
                    <Link href="./" onClick={InputSearch}>
                      <button type="submit" className="text-white text-2xl font-bold">Go</button>
                    </Link>
                  )}
                </form>
              </div>
              <div className="m-2 pl-7 pt-3 col-span-1 flex justify-center">
                <Link href="/Account">
                  <button className="font-bold">{name}</button>
                </Link>
              </div>
              <div className="pt-5 col-span-1 flex justify-evenly">
                <Link href="/Cart">
                  <button className="font-bold">Cart</button>
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
                    className="p-1 border-black rounded-md w-full m-2"
                    onChange={(e) => {
                      setSearch(e.target.value);setNewPage(true)
                    }}
                  ></input>
                  {newPage ? (
                    <Link href="./Products" onClick={InputSearch}>
                      <button type="submit" className="text-white text-2xl font-bold">Go</button>
                    </Link>
                  ) : (
                    <Link href="./" onClick={InputSearch}>
                      <button type="submit" className="text-white text-2xl font-bold">Go</button>
                    </Link>
                  )}
                </form>
            </div>
            <div>
              <ul className="justify-evenly bg-slate-500 overflow-x-scroll hidden sm:pl-2 sm:flex">
                <li className="p-2 mx-2 px-2">
                  <Link
                    onClick={() => {
                      setProduct("electronics");
                    }}
                    href="./Products"
                  >
                    Electronics
                  </Link>
                </li>
                <li className="p-2 mx-2 px-2">
                  <Link
                    onClick={() => {
                      setProduct("skin-care");
                    }}
                    href="./Products"
                  >
                    Skin Care
                  </Link>
                </li>
                <li className="p-2 mx-2 px-2">
                  <Link
                    onClick={() => {
                      setProduct("furniture");
                    }}
                    href="./Products"
                  >
                    Furniture
                  </Link>
                </li>
                <li className="p-2 mx-2 px-2">
                  <Link
                    onClick={() => {
                      setProduct("movies");
                    }}
                    href="./Products"
                  >
                    Movies
                  </Link>
                </li>
                <li className="p-2 px-2">
                  <Link
                    onClick={() => {
                      setProduct("kids");
                    }}
                    href="./Products"
                  >
                    Kids
                  </Link>
                </li>
                <li className="p-2 mx-2 px-2">
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
              ? "sm:hidden pt-3 absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-end items-center w-36 h-screen bg-black/80 text-center ease-in duration-300 z-[18]"
              : "sm:hidden absolute pt-3 top-0 left-[-100%] right-0 bottom-0 flex flex-col justify-end items-center w-32 h-screen bg-black/80 text-center ease-in duration-300 z-[18]"
          }
        >
          <div className="my-4 mb-10 font-bold text-3xl hover:text-slate-400 text-white">
            <Link href="/Account" onClick={handleOpen}>
              {name}
            </Link>
          </div>
          <div className="relative w-full grid grid-cols-2 mb-10">
            <hr className="absolute border-b-4 w-full flex justify-start" />
            <div className="absolute w-full h-10 ml-24 mb-10 flex justify-end">
              <AiOutlineClose onClick={handleOpen} size={30} />
            </div>
          </div>
          <ul className="flex justify-start text-white h-screen flex-col my-3">
            <li className="my-4 font-bold text-2xl hover:text-slate-400">
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
            <li className="my-4 m-2 pl-3 font-bold text-2xl hover:text-slate-400">
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
            <li className="my-4 m-2 pl-3 font-bold text-2xl hover:text-slate-400">
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
            <li className="my-4 m-2 pl-3 font-bold text-2xl hover:text-slate-400">
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
            <li className="my-4 m-2 pl-3 font-bold text-2xl hover:text-slate-400">
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
            <li className="my-4 m-2 pl-3 font-bold text-2xl hover:text-slate-400">
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
      </div>
    </div>
  );
}

export default Navbar;
