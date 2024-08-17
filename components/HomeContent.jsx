"use client";
import React, { useState, useEffect } from "react";
import {
  GlobalStateContext,
  PageStateContext,
} from "@/app/GlobalStateVariable";
import { useContext } from "react";
import Space from "./Space";
import SearchProducts from "./SearchProducts";
import NewArrival from "@/app/homeComponent/newArrivals/page";
import BestSeller from "@/app/homeComponent/bestSeller/page";
import GiftsForEveryone from "@/app/homeComponent/giftForEveryone/page";
import HomeDecoration from "@/app/homeComponent/homeDecoration/page";
import SkinCare from "@/app/homeComponent/skinCare/page";
import ExploreCategories from "@/app/homeComponent/exploreCategories/page";

function HomeContent() {
  const [open, setOpen] = useContext(GlobalStateContext);
  const [page, setPage] = useContext(PageStateContext);

  return (
    <div className="mx-auto w-auto mb-12 relative">
      <Space />
      {page ? (
        <SearchProducts />
      ) : (
        <div
          className={
            open
              ? "relative grid gap-6 grid-cols-2 sm:grid-cols-4 xl:grid-cols-6 z-[1] bg-transparent opacity-40 ease-in duration-500"
              : "relative grid gap-6 grid-cols-2 sm:grid-cols-4 xl:grid-cols-6 ease-in duration-500"
          }
        >
          <div className="grid col-span-2 gap-4 p-2 px-5 bg-slate-100 border-2 shadow-xl">
            <NewArrival />
          </div>
          <div className="grid col-span-2 gap-4 p-2 px-5 bg-slate-100 border-2 shadow-xl">
            <BestSeller />
          </div>
          <div className="grid col-span-2 gap-4 p-2 px-5 bg-slate-100 border-2 shadow-xl">
            <GiftsForEveryone />
          </div>
          <div className="grid col-span-full gap-4 p-2 px-5 bg-slate-100 border-2 shadow-xl">
            <HomeDecoration />
          </div>
          <div className="grid col-span-full gap-4 p-2 px-5 bg-slate-100 border-2 shadow-xl">
            <SkinCare />
          </div>
          <div className="grid col-span-full gap-4 p-2 px-5 bg-slate-100 border-2 shadow-xl">
            <ExploreCategories />
          </div>
        </div>
      )}
    </div>
  );
}

export default HomeContent;
