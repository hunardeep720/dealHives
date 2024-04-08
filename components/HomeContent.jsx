"use client";
import React from "react";
import { GlobalStateContext } from "@/app/GlobalStateVariable";
import { useContext } from "react";
import Space from "./Space";
import image from "./HomeImage";
import CategoryImage from "./CategoryImage";
function HomeContent() {
  const [open, setOpen] = useContext(GlobalStateContext);
  return (
    <div className="mx-auto w-auto mb-12 relative">
      <Space />
      <div
        className={
          open
            ? "relative grid gap-6 grid-cols-2 sm:grid-cols-4 xl:grid-cols-6 z-[1] bg-transparent opacity-40 ease-in duration-500"
            : "relative grid gap-6 grid-cols-2 sm:grid-cols-4 xl:grid-cols-6 ease-in duration-500"
        }
      >
        <div className="grid col-span-2 gap-4">
          <p className="grid col-span-2 justify-center font-extrabold text-2xl py-5">
            Exclusive Offers
          </p>
          <div>
            <CategoryImage sourceImg={image[0].image} />
            <div className="flex justify-between text-black">
              <p className="font-bold">Smartphones</p>
              <p className="text-sm">25% off</p>
            </div>
          </div>
          <div>
            <CategoryImage sourceImg={image[1].image} />
            <div className="flex justify-between text-black">
              <p className="font-bold">Laptop</p>
              <p className="text-sm">15% off</p>
            </div>
          </div>
        </div>
        <div className="grid col-span-2 gap-4">
          <p className="grid col-span-2 justify-center font-extrabold text-2xl py-5">
            Best Sellers
          </p>
          <div>
            <CategoryImage sourceImg={image[2].image} />
            <div className="flex justify-between text-black">
              <p className="font-bold">Speakers</p>
              <p className="text-sm">starts $50</p>
            </div>
          </div>
          <div>
            <CategoryImage sourceImg={image[4].image} />
            <div className="flex justify-between text-black">
              <p className="font-bold">Smart Watch</p>
              <p className="text-sm">Start $200</p>
            </div>
          </div>
        </div>
        <div className="grid col-span-2 gap-4">
          <p className="grid col-span-2 justify-center font-extrabold text-2xl py-6">
            Gifts for everyone
          </p>
          <div>
            <CategoryImage sourceImg={image[5].image} />
            <p className="font-bold flex justify-center">Hoodie</p>
          </div>
          <div>
            <CategoryImage sourceImg={image[6].image} />
            <p className="font-bold flex justify-center">Sneakers</p>
          </div>
        </div>
        <div className="grid col-span-2 gap-4 xl:grid-col-6">
          <p className="grid col-span-2 xl:col-span-6 justify-center font-extrabold text-2xl py-6">
            Decorate Home
          </p>
          <div className="xl:col-start-3">
            <CategoryImage sourceImg={image[7].image} />
            <div className="flex justify-between text-black">
              <p className="font-bold">Furniture</p>
              <p className="text-sm">Great Offers</p>
            </div>
          </div>
          <div>
            <CategoryImage sourceImg={image[8].image} />
            <div className="flex justify-between text-black">
              <p className="font-bold">Decoration</p>
              <p className="text-sm">More Ideas</p>
            </div>
          </div>
        </div>
        <div className="grid gap-4 col-span-2 sm:col-span-4">
          <p className="grid col-span-2  sm:col-span-4 justify-center font-extrabold text-2xl py-8">
            Explore Categories
          </p>
          <div>
            <CategoryImage sourceImg={image[3].image} />
            <p className="font-bold flex justify-center">Headphones</p>
          </div>
          <div>
            <CategoryImage sourceImg={image[9].image} />
            <p className="font-bold flex justify-center">Sport</p>
          </div>
          <div>
            <CategoryImage sourceImg={image[10].image} />
            <p className="font-bold flex justify-center">Kids</p>
          </div>
          <div>
            <CategoryImage sourceImg={image[11].image} />
            <p className="font-bold flex justify-center">Books</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeContent;
