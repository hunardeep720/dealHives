"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function NewArrival() {
  const [newArrivalItems, setNewArrivalItems] = useState(null);
  async function fetchNewArrivalData() {
    const url =
      "https://real-time-amazon-data.p.rapidapi.com/products-by-category?category_id=2478868012&page=1&country=CA&sort_by=NEWEST&product_condition=NEW&is_prime=false";
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
      console.log(products);
      setNewArrivalItems(products);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchNewArrivalData();
  }, []);

  return (
    <>
      <Link
        href={{
          pathname: "/Products",
          query: {
            url: "products-by-category?category_id=2478868012",
            sort_by: "NEWEST",
            page: 1,
            country: "CA",
            product_condition: "NEW",
            is_prime: false,
            name: "Newest Arrivals",
          },
        }}
        as={
          "/Products?url=products-by-category?category_id=2478868012&page=1&country=CA&sort_by=NEWEST&product_condition=NEW&is_prime=false&name=Newest Arrivals"
        }
        className="grid col-span-2 justify-center font-extrabold text-2xl py-5 sm:hover:text-3xl"
      >
        Newest Arrivals
      </Link>
      {newArrivalItems &&
      newArrivalItems.length > 0 &&
      newArrivalItems[0] &&
      newArrivalItems[1] ? (
        <>
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <Link
                href={{
                  pathname: "/ProductDescription",
                  query: {
                    asin: newArrivalItems[1].asin,
                    product_name: newArrivalItems[1].product_title,
                  },
                }}
                as={`/ProductDescription?asin=${
                  newArrivalItems[1].asin
                }&product_name=${encodeURIComponent(
                  newArrivalItems[1].product_title
                )}`}
                className="hover:border-2 border-black p-1"
              >
                <Image
                  src={newArrivalItems[1].product_photo}
                  alt={newArrivalItems[1].product_title.slice(0, 25)}
                  width={100}
                  height={100}
                  layout="responsive"
                />
                <div className="flex justify-between text-black">
                  <p className="font-bold hover:text-slate-500 text-lg">
                    {newArrivalItems[1].product_title.slice(0, 25)}...
                  </p>
                  <p>
                    {newArrivalItems[1].product_price === "$0.00"
                      ? newArrivalItems[1].delivery.slice(0, 5) + "..."
                      : newArrivalItems[1].product_price}
                  </p>
                </div>
              </Link>
              <Link
                href={{
                  pathname: "/ProductDescription",
                  query: {
                    asin: newArrivalItems[2].asin,
                    product_name: newArrivalItems[2].product_title,
                  },
                }}
                as={`/ProductDescription?asin=${
                  newArrivalItems[2].asin
                }&product_name=${encodeURIComponent(
                  newArrivalItems[2].product_title
                )}`}
                className="hover:border-2 border-black p-1"
              >
                <Image
                  src={newArrivalItems[2].product_photo}
                  alt={newArrivalItems[2].product_title.slice(0, 30)}
                  width={100}
                  height={100}
                  layout="responsive"
                />
                <div className="flex justify-between text-black">
                  <p className="font-bold hover:text-slate-500 text-lg">
                    {newArrivalItems[2].product_title.slice(0, 25)}...
                  </p>
                  <p>
                    {newArrivalItems[2].product_price === "$0.00"
                      ? newArrivalItems[2].delivery.slice(0, 5) + "..."
                      : newArrivalItems[2].product_price}
                  </p>
                </div>
              </Link>
            </div>
            <div className="sm:flex gap-3 hidden">
              <Link
                href={{
                  pathname: "/ProductDescription",
                  query: {
                    asin: newArrivalItems[0].asin,
                    product_name: newArrivalItems[0].product_title,
                  },
                }}
                as={`/ProductDescription?asin=${
                  newArrivalItems[0].asin
                }&product_name=${encodeURIComponent(
                  newArrivalItems[0].product_title
                )}`}
                className="hover:border-2 border-black p-1"
              >
                <Image
                  src={newArrivalItems[0].product_photo}
                  alt={newArrivalItems[0].product_title.slice(0, 30)}
                  width={100}
                  height={100}
                  layout="responsive"
                />
                <div className="flex justify-between text-black">
                  <p className="font-bold hover:text-slate-500 text-lg">
                    {newArrivalItems[0].product_title.slice(0, 25)}...
                  </p>
                  <p>
                    {newArrivalItems[0].product_price === "$0.00"
                      ? newArrivalItems[0].delivery.slice(0, 5) + "..."
                      : newArrivalItems[0].product_price}
                  </p>
                </div>
              </Link>
              <Link
                href={{
                  pathname: "/ProductDescription",
                  query: {
                    asin: newArrivalItems[3].asin,
                    product_name: newArrivalItems[3].product_title,
                  },
                }}
                as={`/ProductDescription?asin=${
                  newArrivalItems[3].asin
                }&product_name=${encodeURIComponent(
                  newArrivalItems[3].product_title
                )}`}
                className="hover:border-2 border-black p-1"
              >
                <Image
                  src={newArrivalItems[3].product_photo}
                  alt={newArrivalItems[3].product_title.slice(0, 30)}
                  width={100}
                  height={100}
                  layout="responsive"
                />
                <div className="flex justify-between text-black">
                  <p className="font-bold hover:text-slate-500 text-lg">
                    {newArrivalItems[3].product_title.slice(0, 25)}...
                  </p>
                  <p>
                    {newArrivalItems[3].product_price === "$0.00"
                      ? newArrivalItems[3].delivery.slice(0, 5) + "..."
                      : newArrivalItems[3].product_price}
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
