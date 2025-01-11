"use client";

import React, { useRef } from "react";
import { GlobalStateContext } from "@/app/GlobalStateVariable";
import Link from "next/link";
import { useUserAuth } from "@/utils/auth-context";
import { getUserData } from "@/service/getServices/page";
import { useContext, useEffect, useState } from "react";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useContext(GlobalStateContext);
  const [name, setName] = useState(null);
  const { user } = useUserAuth();
  const [newPage, setNewPage] = useState(false);
  const [search, setSearch] = useState("");
  const handleOpen = () => {
    setOpen(!open);
  };

  async function loadItems() {
    getUserData(async (data) => {
      if (data && data.firstName && data.lastName) {
        setName(data.firstName[0] + data.lastName[0]);
      }
    }, user);
  }

  useEffect(() => {
    if (user) {
      loadItems();
    }
  }, [user]);

  const InputSearch = () => {
    if (search.length > 0) {
      setNewPage(true);
    } else {
      setSearch("Enter Something");
      setNewPage(false);
    }
  };

  const [showCategories, setShowCategories] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const categoriesRef = useRef(null);

  const categories = [
    {
      name: "Electronics",

      as: "/Products?url=search?query=electronics&page=1&country=CA&sort_by=RELEVANCE&product_condition=ALL&is_prime=false&name=Electronics",
      query: {
        url: "search?query=electronics",
        page: 1,
        country: "US",
        sort_by: "RELEVANCE",
        product_condition: "ALL",
        is_prime: "false",
        name: "Electronics",
      },
    },
    {
      name: "Skin Care",

      query: {
        url: "search?query=skin%20care",
        page: 1,
        country: "US",
        sort_by: "RELEVANCE",
        product_condition: "ALL",
        is_prime: "false",
        name: "Skin Care",
      },
      as: "/Products?url=search?query=skin%20care&page=1&country=CA&sort_by=RELEVANCE&product_condition=ALL&is_prime=false&name=Skin Care",
    },
    {
      name: "Furniture",

      query: {
        url: "search?query=furniture",
        page: 1,
        country: "US",
        sort_by: "RELEVANCE",
        product_condition: "ALL",
        is_prime: "false",
        name: "Furniture",
      },
      as: "/Products?url=search?query=furniture&page=1&country=CA&sort_by=RELEVANCE&product_condition=ALL&is_prime=false&name=Furniture",
    },
    {
      name: "Movies",

      query: {
        url: "search?query=movies",
        page: 1,
        country: "US",
        sort_by: "RELEVANCE",
        product_condition: "ALL",
        is_prime: "false",
        name: "Movies",
      },
      as: "/Products?url=search?query=movies&page=1&country=CA&sort_by=RELEVANCE&product_condition=ALL&is_prime=false&name=Movies",
    },
    {
      name: "Kids",

      query: {
        url: "search?query=kids",
        page: 1,
        country: "US",
        sort_by: "RELEVANCE",
        product_condition: "ALL",
        is_prime: "false",
        name: "Kids",
      },
      as: "/Products?url=search?query=kids&page=1&country=CA&sort_by=RELEVANCE&product_condition=ALL&is_prime=false&name=Kids",
    },
    {
      name: "Sports",

      query: {
        url: "search?query=sport",
        page: 1,
        country: "US",
        sort_by: "RELEVANCE",
        product_condition: "ALL",
        is_prime: "false",
        name: "Sports",
      },
      as: "/Products?url=search?query=sport&page=1&country=CA&sort_by=RELEVANCE&product_condition=ALL&is_prime=false&name=Sports",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = document.documentElement.scrollTop;
      if (currentScrollTop < lastScrollTop) {
        setShowCategories(true);
      } else {
        setShowCategories(false);
      }
      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 fixed top-0 left-0 right-0 px-4 sm:px-28 bg-white z-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold">
              Deal Hives
            </Link>
          </div>
          <div className="hidden sm:flex sm:items-center">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="mr-4 flex items-center gap-3"
            >
              <Input
                type="search"
                placeholder="Search products"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setNewPage(true);
                }}
                className="w-64"
              />
              {newPage && (
                <Link
                  href={{
                    pathname: "/Products",
                    query: {
                      url: `search?query=${encodeURIComponent(search)}`,
                      page: 1,
                      country: "US",
                      sort_by: "RELEVANCE",
                      product_condition: "ALL",
                      is_prime: "false",
                      name: search,
                    },
                  }}
                  as={`/Products?url=search?query=${search}&page=1&country=CA&sort_by=RELEVANCE&product_condition=ALL&is_prime=false&name=${encodeURIComponent(
                    search
                  )}'`}
                  onClick={InputSearch}
                  className="h-full"
                >
                  <button type="submit my-auto">
                    <Search color="#3b82f6" />
                  </button>
                </Link>
              )}
            </form>
            <Link href="/Cart" className="p-2">
              <ShoppingCart className="h-6 w-6" />
            </Link>
            <Link href="/Account" className="p-2 h-full">
              {name ? (
                <>
                  <Avatar className="my-auto">
                    <AvatarFallback>{name}</AvatarFallback>
                  </Avatar>
                </>
              ) : (
                <User className="h-6 w-6" />
              )}
            </Link>
          </div>
          <div className="flex items-center sm:hidden">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="mr-2 flex gap-3"
            >
              <Input
                type="search"
                placeholder="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setNewPage(true);
                }}
                className="w-32"
              />
              {newPage && (
                <Link
                  href={{
                    pathname: "/Products",
                    query: {
                      url: `search?query=${encodeURIComponent(search)}`,
                      page: 1,
                      country: "US",
                      sort_by: "RELEVANCE",
                      product_condition: "ALL",
                      is_prime: "false",
                      name: search,
                    },
                  }}
                  as={`/Products?url=search?query=${search}&page=1&country=CA&sort_by=RELEVANCE&product_condition=ALL&is_prime=false&name=${encodeURIComponent(
                    search
                  )}'`}
                  onClick={InputSearch}
                  className="h-full my-auto"
                >
                  <button type="submit my-auto">
                    <Search color="#3b82f6" />
                  </button>
                </Link>
              )}
            </form>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="sm:hidden h-full w-full relative z-20"
                  style={{ height: "3rem", width: "3rem" }}
                >
                  <Menu className="h-24 w-24" color="#000000" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-4">
                  <Link
                    href="/Cart"
                    className="flex items-center text-black font-bold"
                  >
                    <ShoppingCart className="h-6 w-6 mr-2" /> Cart
                  </Link>
                  <Link
                    href="/Account"
                    className="flex items-center text-black font-bold"
                  >
                    <User className="h-6 w-6 mr-2" /> Account
                  </Link>
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={{ pathname: "/Products", query: category.query }}
                      as={category.as}
                      className="block text-black font-bold"
                    >
                      {category.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <div
        ref={categoriesRef.current}
        className={`hidden sm:flex sm:justify-between pt-16 px-28 py-2 transition-all duration-300 ease-in-out ${
          showCategories
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full"
        } ${
          lastScrollTop > 0
            ? "fixed top-0 left-0 right-0 bg-white shadow-md z-10"
            : ""
        }`}
      >
        {categories.map((category) => (
          <Link
            key={category.name}
            href={{ pathname: "/Products", query: category.query }}
            as={category.as}
            className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
          >
            {category.name}
          </Link>
        ))}
      </div>

      {/* {isOpen && (
      )} */}
    </nav>
  );
}
