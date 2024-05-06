"use client";
import React, { useState } from "react";
import {
  GlobalStateContext,
  ProductStateContext,
  PageStateContext,
} from "@/app/GlobalStateVariable";
import { useContext } from "react";
import Space from "./Space";
import image from "./HomeImage";
import CategoryImage from "./CategoryImage";
import SearchProducts from "./SearchProducts";
import Link from "next/link";
function HomeContent() {
  const [open, setOpen] = useContext(GlobalStateContext);
  const [product, setProduct] = useContext(ProductStateContext);
  console.log(product);
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
          <div className="grid col-span-2 gap-4">
            <p className="grid col-span-2 justify-center font-extrabold text-2xl py-5">
              Exclusive Offers
            </p>
            <div>
              <Link onClick={() => {
                      setProduct("smartphone");
                    }} href="/Products">
                <CategoryImage sourceImg={image[0].image} />
                <div className="flex justify-between text-black">
                  <p className="font-bold hover:text-slate-500">Smartphones</p>
                  <p className="text-sm">25% off</p>
                </div>
              </Link>
            </div>
            <div>
              <Link onClick={() => {
                      setProduct("laptop");
                    }} href="/Products">
                <CategoryImage sourceImg={image[1].image} />
                <div className="flex justify-between text-black">
                  <p className="font-bold hover:text-slate-500">Laptop</p>
                  <p className="text-sm">15% off</p>
                </div>
              </Link>
            </div>
          </div>
          <div className="grid col-span-2 gap-4">
            <p className="grid col-span-2 justify-center font-extrabold text-2xl py-5">
              Best Sellers
            </p>
            <div>
              <Link onClick={() => {
                      setProduct("speaker");
                    }} href="/Products">
                <CategoryImage sourceImg={image[2].image} />
                <div className="flex justify-between text-black">
                  <p className="font-bold hover:text-slate-500">Speakers</p>
                  <p className="text-sm">starts $50</p>
                </div>
              </Link>
            </div>
            <div>
              <Link onClick={() => {
                      setProduct("smartwatch");
                    }} href="/Products">
                <CategoryImage sourceImg={image[4].image} />
                <div className="flex justify-between text-black">
                  <p className="font-bold hover:text-slate-500">Smart Watch</p>
                  <p className="text-sm">Start $200</p>
                </div>
              </Link>
            </div>
          </div>
          <div className="grid col-span-2 gap-4">
            <p className="grid col-span-2 justify-center font-extrabold text-2xl py-6">
              Gifts for everyone
            </p>
            <div>
              <Link onClick={()=>{setProduct("hoodie")}} href="/Products">
                <CategoryImage sourceImg={image[5].image} />
                <p className="font-bold flex justify-center hover:text-slate-500">Hoodie</p>
              </Link>
            </div>
            <div>
              <Link onClick={() => {
                      setProduct("sneaker");
                    }} href="/Products">
                <CategoryImage sourceImg={image[6].image} />
                <p className="font-bold flex justify-center hover:text-slate-500">Sneakers</p>
              </Link>
            </div>
          </div>
          <div className="grid col-span-2 gap-4 xl:grid-col-6">
            <p className="grid col-span-2 xl:col-span-6 justify-center font-extrabold text-2xl py-6">
              Decorate Home
            </p>
            <div className="xl:col-start-3">
              <Link onClick={() => {
                      setProduct("furniture");
                    }} href="/Products">
                <CategoryImage sourceImg={image[7].image} />
                <div className="flex justify-between text-black">
                  <p className="font-bold hover:text-slate-500">Furniture</p>
                  <p className="text-sm">Great Offers</p>
                </div>
              </Link>
            </div>
            <div>
              <Link onClick={() => {
                      setProduct("decoration");
                    }} href="/Products">
                <CategoryImage sourceImg={image[8].image} />
                <div className="flex justify-between text-black">
                  <p className="font-bold hover:text-slate-500">Decoration</p>
                  <p className="text-sm">More Ideas</p>
                </div>
              </Link>
            </div>
          </div>
          <div className="grid gap-4 col-span-2 sm:col-span-4">
            <p className="grid col-span-2  sm:col-span-4 justify-center font-extrabold text-2xl py-8">
              Explore Categories
            </p>
            <div>
              <Link onClick={() => {
                      setProduct("headphones");
                    }} href="/Products">
                <CategoryImage sourceImg={image[3].image} />
                <p className="font-bold flex justify-center hover:text-slate-500">Headphones</p>
              </Link>
            </div>
            <div>
              <Link onClick={() => {
                      setProduct("sport");
                    }} href="/Products">
                <CategoryImage sourceImg={image[9].image} />
                <p className="font-bold flex justify-center hover:text-slate-500">Sport</p>
              </Link>
            </div>
            <div>
              <Link onClick={() => {
                      setProduct("kids");
                    }} href="/Products">
                <CategoryImage sourceImg={image[10].image} />
                <p className="font-bold flex justify-center hover:text-slate-500">Kids</p>
              </Link>
            </div>
            <div>
              <Link onClick={() => {
                      setProduct("comics");
                    }} href="/Products">
                <CategoryImage sourceImg={image[11].image} />
                <p className="font-bold flex justify-center hover:text-slate-500">Comics</p>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomeContent;
