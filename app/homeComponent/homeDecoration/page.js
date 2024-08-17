"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

function HomeDecoration() {
  const [decorateHome, setDecorateHome] = useState(null);

  //fetch data on decorate home
  async function fetchDecorateHomeData() {
    const url =
      "https://real-time-amazon-data.p.rapidapi.com/search?query=decorate%20Home&page=1&country=CA&sort_by=RELEVANCE&product_condition=ALL&is_prime=false";
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
        "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPIDAPI_HOST,
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      const products = result.data.products;
      setDecorateHome(products);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchDecorateHomeData();
  }, []);
  return (
    <>
      <Link
        href={{
          pathname: "/Products",
          query: {
            query: "decorate Home",
            page: 1,
            country: "CA",
            sort_by: "RELEVANCE",
            product_condition: "ALL",
            is_prime: false,
            name: "Decorate Your Home",
          },
        }}
        as={
          "/Products?query=decorate%20Home&page=1&country=CA&sort_by=RELEVANCE&product_condition=ALL&is_prime=false&name=Decorate Your Home"
        }
        className="grid col-span-2 justify-center font-extrabold text-2xl py-5 sm:hover:text-3xl"
      >
        Decorate Your Home
      </Link>
      {decorateHome &&
      decorateHome.length > 0 &&
      decorateHome[0] &&
      decorateHome[1] ? (
        <>
          <div className="flex gap-3 sm:gap-8">
            <div className="flex gap-3 sm:gap-8">
              <Link
                href={{
                  pathname: "/ProductDescription",
                  query: {
                    asin: decorateHome[1].asin,
                    product_name: decorateHome[1].product_title,
                  },
                }}
                as={`/ProductDescription?asin=${
                  decorateHome[1].asin
                }&product_name=${encodeURIComponent(
                  decorateHome[1].product_title
                )}`}
                className="hover:border-2 border-black p-5"
              >
                <Image
                  src={decorateHome[1].product_photo}
                  alt={decorateHome[1].product_title.slice(0, 25)}
                  width={100}
                  height={100}
                  layout="responsive"
                />
                <div className="flex justify-between text-black">
                  <p className="font-bold hover:text-slate-500 text-lg">
                    {decorateHome[1].product_title.slice(0, 25)}...
                  </p>
                  <p>
                    {decorateHome[1].product_price === "$0.00"
                      ? decorateHome[1].delivery.slice(0, 5) + "..."
                      : decorateHome[1].product_price}
                  </p>
                </div>
              </Link>
              <Link
                href={{
                  pathname: "/ProductDescription",
                  query: {
                    asin: decorateHome[2].asin,
                    product_name: decorateHome[2].product_title,
                  },
                }}
                as={`/ProductDescription?asin=${
                  decorateHome[2].asin
                }&product_name=${encodeURIComponent(
                  decorateHome[2].product_title
                )}`}
                className="hover:border-2 border-black p-5"
              >
                <Image
                  src={decorateHome[2].product_photo}
                  alt={decorateHome[2].product_title.slice(0, 30)}
                  width={100}
                  height={100}
                  layout="responsive"
                />
                <div className="flex justify-between text-black">
                  <p className="font-bold hover:text-slate-500 text-lg">
                    {decorateHome[2].product_title.slice(0, 25)}...
                  </p>
                  <p>
                    {decorateHome[2].product_price === "$0.00"
                      ? decorateHome[2].delivery.slice(0, 5) + "..."
                      : decorateHome[2].product_price}
                  </p>
                </div>
              </Link>
            </div>
            <div className="sm:flex gap-8 hidden">
              <Link
                href={{
                  pathname: "/ProductDescription",
                  query: {
                    asin: decorateHome[0].asin,
                    product_name: decorateHome[0].product_title,
                  },
                }}
                as={`/ProductDescription?asin=${
                  decorateHome[0].asin
                }&product_name=${encodeURIComponent(
                  decorateHome[0].product_title
                )}`}
                className="hover:border-2 border-black p-5"
              >
                <Image
                  src={decorateHome[0].product_photo}
                  alt={decorateHome[0].product_title.slice(0, 30)}
                  width={100}
                  height={100}
                  layout="responsive"
                />
                <div className="flex justify-between text-black">
                  <p className="font-bold hover:text-slate-500 text-lg">
                    {decorateHome[0].product_title.slice(0, 25)}...
                  </p>
                  <p>
                    {decorateHome[0].product_price === "$0.00"
                      ? decorateHome[0].delivery.slice(0, 5) + "..."
                      : decorateHome[0].product_price}
                  </p>
                </div>
              </Link>
              <Link
                href={{
                  pathname: "/ProductDescription",
                  query: {
                    asin: decorateHome[3].asin,
                    product_name: decorateHome[3].product_title,
                  },
                }}
                as={`/ProductDescription?asin=${
                  decorateHome[3].asin
                }&product_name=${encodeURIComponent(
                  decorateHome[3].product_title
                )}`}
                className="hover:border-2 border-black p-5"
              >
                <Image
                  src={decorateHome[3].product_photo}
                  alt={decorateHome[3].product_title.slice(0, 30)}
                  width={100}
                  height={100}
                  layout="responsive"
                />
                <div className="flex justify-between text-black">
                  <p className="font-bold hover:text-slate-500 text-lg">
                    {decorateHome[3].product_title.slice(0, 25)}...
                  </p>
                  <p>
                    {decorateHome[3].product_price === "$0.00"
                      ? decorateHome[3].delivery.slice(0, 5) + "..."
                      : decorateHome[3].product_price}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="text-2xl font-semibold animate-pulse flex justify-center items-start col-span-2">
          Loading...
        </div>
      )}
    </>
  );
}

export default HomeDecoration;
