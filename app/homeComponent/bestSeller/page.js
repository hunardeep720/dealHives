"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

function BestSeller() {
  const [bestSellerItems, setBestItems] = useState(null);
  //to fetch best seller items
  async function fetchBestSellerData() {
    const url =
      "https://real-time-amazon-data.p.rapidapi.com/products-by-category?category_id=2478868012&page=1&country=CA&sort_by=BEST_SELLERS&product_condition=NEW&is_prime=false";
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

      // Extract the products array from the result
      const products = result.data.products;

      // Update the items state with the fetched products
      setBestItems(products);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchBestSellerData();
  }, []);
  return (
    <>
      <Link
        href={{
          pathname: "/Products",
          query: {
            url: "products-by-category?category_id=2478868012&page=1&country=CA&sort_by=BEST_SELLERS&product_condition=NEW&is_prime=false",
          },
        }}
        as={
          "/products?url=products-by-category?category_id=2478868012&page=1&country=CA&sort_by=BEST_SELLERS&product_condition=NEW&is_prime=false"
        }
        className="grid col-span-2 justify-center font-extrabold text-2xl py-5 sm:hover:text-3xl"
      >
        Best Sellers
      </Link>
      {bestSellerItems &&
      bestSellerItems.length > 0 &&
      bestSellerItems[0] &&
      bestSellerItems[1] ? (
        <>
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <Link
                href={{
                  pathname: "/ProductDescription",
                  query: { asin: bestSellerItems[1].asin },
                }}
                as={"dealhives.com/description?asin=" + bestSellerItems[1].asin}
                className="hover:border-2 border-black p-1"
              >
                <Image
                  src={bestSellerItems[1].product_photo}
                  alt={bestSellerItems[1].product_title.slice(0, 25)}
                  width={100}
                  height={100}
                  layout="responsive"
                />
                <div className="flex justify-between text-black">
                  <p className="font-bold hover:text-slate-500 text-lg">
                    {bestSellerItems[1].product_title.slice(0, 25)}...
                  </p>
                  <p>
                    {bestSellerItems[1].product_price === "$0.00"
                      ? bestSellerItems[1].delivery.slice(0, 5) + "..."
                      : bestSellerItems[1].product_price}
                  </p>
                </div>
              </Link>
              <Link
                href={{
                  pathname: "/ProductDescription",
                  query: { asin: bestSellerItems[1].asin },
                }}
                as={"dealhives.com/description?asin=" + bestSellerItems[1].asin}
                className="hover:border-2 border-black p-1"
              >
                <Image
                  src={bestSellerItems[2].product_photo}
                  alt={bestSellerItems[2].product_title.slice(0, 30)}
                  width={100}
                  height={100}
                  layout="responsive"
                />
                <div className="flex justify-between text-black">
                  <p className="font-bold hover:text-slate-500 text-lg">
                    {bestSellerItems[2].product_title.slice(0, 25)}...
                  </p>
                  <p>
                    {bestSellerItems[2].product_price === "$0.00"
                      ? bestSellerItems[2].delivery.slice(0, 5) + "..."
                      : bestSellerItems[2].product_price}
                  </p>
                </div>
              </Link>
            </div>
            <div className="sm:flex gap-3 hidden">
              <Link
                href={{
                  pathname: "/ProductDescription",
                  query: { asin: bestSellerItems[1].asin },
                }}
                as={"dealhives.com/description?asin=" + bestSellerItems[1].asin}
                className="hover:border-2 border-black p-1"
              >
                <Image
                  src={bestSellerItems[0].product_photo}
                  alt={bestSellerItems[0].product_title.slice(0, 30)}
                  width={100}
                  height={100}
                  layout="responsive"
                />
                <div className="flex justify-between text-black">
                  <p className="font-bold hover:text-slate-500 text-lg">
                    {bestSellerItems[0].product_title.slice(0, 25)}...
                  </p>
                  <p>
                    {bestSellerItems[0].product_price === "$0.00"
                      ? bestSellerItems[0].delivery.slice(0, 5) + "..."
                      : bestSellerItems[0].product_price}
                  </p>
                </div>
              </Link>
              <Link
                href={{
                  pathname: "/ProductDescription",
                  query: { asin: bestSellerItems[1].asin },
                }}
                as={"dealhives.com/description?asin=" + bestSellerItems[1].asin}
                className="hover:border-2 border-black p-1"
              >
                <Image
                  src={bestSellerItems[3].product_photo}
                  alt={bestSellerItems[3].product_title.slice(0, 30)}
                  width={100}
                  height={100}
                  layout="responsive"
                />
                <div className="flex justify-between text-black">
                  <p className="font-bold hover:text-slate-500 text-lg">
                    {bestSellerItems[3].product_title.slice(0, 25)}...
                  </p>
                  <p>
                    {bestSellerItems[3].product_price === "$0.00"
                      ? bestSellerItems[3].delivery.slice(0, 5) + "..."
                      : bestSellerItems[3].product_price}
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


export default BestSeller;
