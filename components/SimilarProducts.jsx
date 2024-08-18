"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

function SimilarProducts({ name }) { // Corrected to destructure `name` from props
  const [productsList, setProductsList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sliceArray, setSliceArray] = useState(null);

  async function fetchData() {
    const url = `https://real-time-amazon-data.p.rapidapi.com/search?query=${name}&page=1&country=CA&sort_by=RELEVANCE&product_condition=ALL&is_prime=false`;
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
      setProductsList(products);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (productsList && productsList.length > 0) {
      setSliceArray(productsList.slice(1, 13));
    }
  }, [productsList]);

  useEffect(() => {
    if (name) {
      fetchData();
    }
  }, [name]);

  return (
    <div className="text-center">
      {loading ? (
        <div className="w-full flex justify-center items-center text-xl font-bold animate-pulse">
          Loading...
        </div>
      ) : (
        sliceArray &&
        sliceArray.length > 0 && (
          <div>
            <p className="text-3xl font-bold py-5">Similar Products</p>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 xl:grid-cols-6">
              {sliceArray.map((product) => (
                <Link
                href={{
                  pathname: "/ProductDescription",
                  query: { asin: product.asin },
                }}
                as={`/ProductDescription?asin=${product.asin}&name=${encodeURIComponent(product.product_title)}`}
                  key={product.asin}
                  className="ease-in duration-200 col-span-1 text-center"
                >
                  <Image
                    src={product.product_photo}
                    alt="product"
                    width={500}
                    height={600}
                    objectFit="cover"
                    className="w-48 h-48"
                  />
                  <p className="font-extrabold text-xs hover:cursor-pointer hover:text-slate-500">
                    {product.product_title.slice(0, 25)}...
                  </p>
                  <p className="text-lg">{product.product_price}</p>
                </Link>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default SimilarProducts;