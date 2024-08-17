"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

function SkinCare() {
  const [skinCareItems, setSkinCareItems] = useState(null);

  //fetch skin care items
  async function fetchSkinCareData() {
    const url =
      "https://real-time-amazon-data.p.rapidapi.com/search?query=skin%20care&page=1&country=CA&sort_by=RELEVANCE&product_condition=ALL&is_prime=false";
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "3fe4aad566msh4dc56c9777df4f3p1e67eejsnfec85d21090c",
        "x-rapidapi-host": "real-time-amazon-data.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      const products = result.data.products;
      setSkinCareItems(products);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchSkinCareData();
  }, []);
  return (
    <>
      <Link
        href={{
          pathname: "/Products",
          query: {
            url: "search?query=skin%20care&page=1&country=CA&sort_by=RELEVANCE&product_condition=ALL&is_prime=false",
          },
        }}
        as={
          "/products?url=search?query=skin%20care&page=1&country=CA&sort_by=RELEVANCE&product_condition=ALL&is_prime=false"
        }
        className="grid col-span-2 justify-center font-extrabold text-2xl py-5 sm:hover:text-3xl"
      >
        Personal Care
      </Link>
      {skinCareItems &&
      skinCareItems.length > 0 &&
      skinCareItems[0] &&
      skinCareItems[1] ? (
        <>
          <div className="flex gap-3 sm:gap-8">
            <div className="flex gap-3 sm:gap-8">
              <Link
                href={{
                  pathname: "/ProductDescription",
                  query: { asin: skinCareItems[1].asin },
                }}
                as={"dealhives.com/description?asin=" + skinCareItems[1].asin}
                className="hover:border-2 border-black p-5"
              >
                <Image
                  src={skinCareItems[1].product_photo}
                  alt={skinCareItems[1].product_title.slice(0, 25)}
                  width={100}
                  height={100}
                  layout="responsive"
                />
                <div className="flex justify-between text-black">
                  <p className="font-bold hover:text-slate-500 text-lg">
                    {skinCareItems[1].product_title.slice(0, 25)}...
                  </p>
                  <p>
                    {skinCareItems[1].product_price === "$0.00"
                      ? skinCareItems[1].delivery.slice(0, 5) + "..."
                      : skinCareItems[1].product_price}
                  </p>
                </div>
              </Link>
              <Link
                href={{
                  pathname: "/ProductDescription",
                  query: { asin: skinCareItems[1].asin },
                }}
                as={"dealhives.com/description?asin=" + skinCareItems[1].asin}
                className="hover:border-2 border-black p-5"
              >
                <Image
                  src={skinCareItems[2].product_photo}
                  alt={skinCareItems[2].product_title.slice(0, 30)}
                  width={100}
                  height={100}
                  layout="responsive"
                />
                <div className="flex justify-between text-black">
                  <p className="font-bold hover:text-slate-500 text-lg">
                    {skinCareItems[2].product_title.slice(0, 25)}...
                  </p>
                  <p>
                    {skinCareItems[2].product_price === "$0.00"
                      ? skinCareItems[2].delivery.slice(0, 5) + "..."
                      : skinCareItems[2].product_price}
                  </p>
                </div>
              </Link>
            </div>
            <div className="sm:flex gap-3 hidden">
              <Link
                href={{
                  pathname: "/ProductDescription",
                  query: { asin: skinCareItems[1].asin },
                }}
                as={"dealhives.com/description?asin=" + skinCareItems[1].asin}
                className="hover:border-2 border-black p-5"
              >
                <Image
                  src={skinCareItems[0].product_photo}
                  alt={skinCareItems[0].product_title.slice(0, 30)}
                  width={100}
                  height={100}
                  layout="responsive"
                />
                <div className="flex justify-between text-black">
                  <p className="font-bold hover:text-slate-500 text-lg">
                    {skinCareItems[0].product_title.slice(0, 25)}...
                  </p>
                  <p>
                    {skinCareItems[0].product_price === "$0.00"
                      ? skinCareItems[0].delivery.slice(0, 5) + "..."
                      : skinCareItems[0].product_price}
                  </p>
                </div>
              </Link>
              <Link
                href={{
                  pathname: "/ProductDescription",
                  query: { asin: skinCareItems[1].asin },
                }}
                as={"dealhives.com/description?asin=" + skinCareItems[1].asin}
                className="hover:border-2 border-black p-5"
              >
                <Image
                  src={skinCareItems[3].product_photo}
                  alt={skinCareItems[3].product_title.slice(0, 30)}
                  width={100}
                  height={100}
                  layout="responsive"
                />
                <div className="flex justify-between text-black">
                  <p className="font-bold hover:text-slate-500 text-lg">
                    {skinCareItems[3].product_title.slice(0, 25)}...
                  </p>
                  <p>
                    {skinCareItems[3].product_price === "$0.00"
                      ? skinCareItems[3].delivery.slice(0, 5) + "..."
                      : skinCareItems[3].product_price}
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

export default SkinCare;
