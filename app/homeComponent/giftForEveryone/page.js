"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

function GiftsForEveryone() {
  const [gifts, setGifts] = useState(null);

  //to fetch gifts for everyone
  async function fetchGiftsData() {
    const url =
      "https://real-time-amazon-data.p.rapidapi.com/search?query=gifts&page=1&country=CA&sort_by=RELEVANCE&product_condition=ALL&is_prime=false";
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
      setGifts(products);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchGiftsData();
  }, []);
  return (
    <>
      <Link
        href={{
          pathname: "/Products",
          query: {
            url: "search?query=gifts",
            page: 1,
            country: "CA",
            sort_by: "RELEVANCE",
            product_condition: "ALL",
            is_prime: false,
            name: "Gifts for everyone",
          },
        }}
        as={
          "/Products?url=search?query=gifts&page=1&country=CA&sort_by=RELEVANCE&product_condition=ALL&is_prime=false&name=Gifts for everyone"
        }
        className="grid col-span-2 justify-center font-extrabold text-2xl py-5 sm:hover:text-3xl"
      >
        Gifts for everyone
      </Link>
      {gifts && gifts.length > 0 && gifts[0] && gifts[1] ? (
        <>
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <Link
                href={{
                  pathname: "/ProductDescription",
                  query: {
                    asin: gifts[1].asin,
                    product_name: gifts[1].product_title,
                  },
                }}
                as={`/ProductDescription?asin=${
                  gifts[1].asin
                }&product_name=${encodeURIComponent(gifts[1].product_title)}`}
                className="hover:border-2 border-black p-1"
              >
                <Image
                  src={gifts[1].product_photo}
                  alt={gifts[1].product_title.slice(0, 25)}
                  width={100}
                  height={100}
                  layout="responsive"
                />
                <div className="flex justify-between text-black">
                  <p className="font-bold hover:text-slate-500 text-lg">
                    {gifts[1].product_title.slice(0, 25)}...
                  </p>
                  <p>
                    {gifts[1].product_price === "$0.00"
                      ? gifts[1].delivery.slice(0, 5) + "..."
                      : gifts[1].product_price}
                  </p>
                </div>
              </Link>
              <Link
                href={{
                  pathname: "/ProductDescription",
                  query: {
                    asin: gifts[2].asin,
                    product_name: gifts[2].product_title,
                  },
                }}
                as={` /ProductDescription?asin=${
                  gifts[2].asin
                }&product_name=${encodeURIComponent(gifts[2].product_title)}`}
                className="hover:border-2 border-black p-1"
              >
                <Image
                  src={gifts[2].product_photo}
                  alt={gifts[2].product_title.slice(0, 30)}
                  width={100}
                  height={100}
                  layout="responsive"
                />
                <div className="flex justify-between text-black">
                  <p className="font-bold hover:text-slate-500 text-lg">
                    {gifts[2].product_title.slice(0, 25)}...
                  </p>
                  <p>
                    {gifts[2].product_price === "$0.00"
                      ? gifts[2].delivery.slice(0, 5) + "..."
                      : gifts[2].product_price}
                  </p>
                </div>
              </Link>
            </div>
            <div className="sm:flex gap-3 hidden">
              <Link
                href={{
                  pathname: "/ProductDescription",
                  query: {
                    asin: gifts[0].asin,
                    product_name: gifts[0].product_title,
                  },
                }}
                as={`/ProductDescription?asin=${
                  gifts[0].asin
                }&product_name=${encodeURIComponent(gifts[0].product_title)}`}
                className="hover:border-2 border-black p-1"
              >
                <Image
                  src={gifts[0].product_photo}
                  alt={gifts[0].product_title.slice(0, 30)}
                  width={100}
                  height={100}
                  layout="responsive"
                />
                <div className="flex justify-between text-black">
                  <p className="font-bold hover:text-slate-500 text-lg">
                    {gifts[0].product_title.slice(0, 25)}...
                  </p>
                  <p>
                    {gifts[0].product_price === "$0.00"
                      ? gifts[0].delivery.slice(0, 5) + "..."
                      : gifts[0].product_price}
                  </p>
                </div>
              </Link>
              <Link
                href={{
                  pathname: "/ProductDescription",
                  query: {
                    asin: gifts[3].asin,
                    product_name: gifts[3].product_title,
                  },
                }}
                as={`/ProductDescription?asin=${
                  gifts[3].asin
                }&product_name=${encodeURIComponent(gifts[3].product_title)}`}
                className="hover:border-2 border-black p-1"
              >
                <Image
                  src={gifts[3].product_photo}
                  alt={gifts[3].product_title.slice(0, 30)}
                  width={100}
                  height={100}
                  layout="responsive"
                />
                <div className="flex justify-between text-black">
                  <p className="font-bold hover:text-slate-500 text-lg">
                    {gifts[3].product_title.slice(0, 25)}...
                  </p>
                  <p>
                    {gifts[3].product_price === "$0.00"
                      ? gifts[3].delivery.slice(0, 5) + "..."
                      : gifts[3].product_price}
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

export default GiftsForEveryone;
