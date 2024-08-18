"use client";
import Space from "@/components/Space";
import React, { useEffect, useState, useContext } from "react";
import { useSearchParams } from "next/navigation";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import Image from "next/image";
import {
  ProductStateContext,
  GlobalStateContext,
} from "../GlobalStateVariable";
import FilterComponent from "../productComponent/page";
import FilterComponentForSmallScreens from "../productComponent/filterForSmallScreens/page";
import Link from "next/link";

function Page() {
  const [open, setOpen] = useContext(GlobalStateContext);
  const [filterComponent, setFilterComponent] = useState(false);

  //fetching data from url
  const searchParams = useSearchParams(); //to read the url query parameters
  const urlReaded = searchParams.get("url");
  const itemName = searchParams.get("name"); //fetching the name from the url
  const [productName, setProductName] = useState(itemName ? itemName : "");
  const sortBy = searchParams.get("sort_by");
  const country = searchParams.get("country");
  const productCondition = searchParams.get("product_condition");
  const isPrime = searchParams.get("is_prime");
  const urlPage = searchParams.get("page");

  //using global state to store the selected product
  const [page, setPage] = useState(urlPage ? urlPage : 1);
  const [selectedCountry, setSelectedCountry] = useState(
    country ? country : "CA"
  );
  const [selectedSortBy, setSelectedSortBy] = useState(
    sortBy ? sortBy : "RELEVANCE"
  );
  const [selectedProductCondition, setSelectedProductCondition] = useState(
    productCondition ? productCondition : "ALL"
  );
  const [selectedIsPrime, setSelectedIsPrime] = useState(
    isPrime ? isPrime : false
  );

  const [productsList, setProductsList] = useState(null); // Initialize products as an empty array
  const [loading, setLoading] = useState(true); // Initialize loading state as true

  async function fetchData() {
    const url = `https://real-time-amazon-data.p.rapidapi.com/${urlReaded}&page=${page}&country=${selectedCountry}&sort_by=${selectedSortBy}&product_condition=${selectedProductCondition}&is_prime=${selectedIsPrime}`;
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
    } catch (error) {
      console.error(error);
    }
  }

  const PagePrev = () => {
    if (page >= 2) {
      setPage((prev) => prev - 1);
      setLoading(true);
    }
  };
  const PageNext = () => {
    if (page <= 6) {
      setPage((prev) => prev + 1);
      setLoading(true);
    }
  };

  useEffect(() => {
    if (
      urlReaded &&
      page &&
      selectedCountry &&
      selectedSortBy &&
      selectedProductCondition &&
      selectedIsPrime
    ) {
      fetchData();
    }
  }, [
    urlReaded,
    page,
    selectedCountry,
    selectedSortBy,
    selectedProductCondition,
    selectedIsPrime,
  ]);

  useEffect(() => {
    if (productsList && productsList.length > 0 && productsList[0]) {
      console.log("productList: ", productsList);
      setLoading(false);
    }
  }, [productsList]);
  useEffect(() => {console.log(productName)}, [productName]);
  return (
    <div className="max-w-screen-4xl mx-auto p-6">
      <div
        className={
          open
            ? "z-[20] bg-transparent opacity-40 ease-in duration-500"
            : "ease-in duration-500"
        }
      >
        <div>
          <Space />
          <div className="grid">
            <p className="ease-in duration-700 font-extrabold mb-5 text-xl">
              {" "}
              The given result is shown on the basis of search "{productName}".
            </p>
            <div className="sm:hidden w-full">
              <button
                onClick={() => setFilterComponent(!filterComponent)}
                className="p-2 m-2 text-lg font-semibold text-blue-600 rounded-lg"
              >
                Filter
              </button>
            </div>
            {loading ? (
              <div className="text-center col-span-full flex justify-center items-center">
                <p className="text-xl font-bold">Loading...</p>
              </div>
            ) : (
              <div className="flex gap-3">
                <FilterComponent
                  selectedCountry={selectedCountry}
                  selectedSortBy={selectedSortBy}
                  selectedProductCondition={selectedProductCondition}
                  selectedIsPrime={selectedIsPrime}
                  setSelectedCountry={setSelectedCountry}
                  setSelectedSortBy={setSelectedSortBy}
                  setSelectedProductCondition={setSelectedProductCondition}
                  setSelectedIsPrime={setSelectedIsPrime}
                  setLoading={setLoading}
                />
                <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 xl:grid-cols-6 md:grid-cols-3">
                  {productsList &&
                  productsList.length > 0 &&
                  productsList[0] ? (
                    productsList.map((product) => (
                      <Link
                        key={product.asin}
                        className="ease-in duration-200 col-span-1 text-center p-1 bg-slate-100 border-2 shadow-xl grid grid-cols-2 gap-2 cursor-pointer hover:border-2 hover:border-black hover:p-2"
                        href={{
                          pathname: "/ProductDescription",
                          query:{
                            asin: product.asin,
                            name: product.product_title,
                            country: selectedCountry,
                          }
                        }}
                        as={`/ProductDescription?asin=${product.asin}&name=${product.product_title}&country=${encodeURIComponent(selectedCountry)}`}
                      >
                        <Image
                          src={product.product_photo}
                          alt="product"
                          width={500}
                          height={600}
                          objectFit="cover"
                          className="w-48 h-48 col-span-full mx-auto"
                        />
                        <p
                          className="font-extrabold text-lg hover:cursor-pointer hover:text-slate-500"
                        >
                          {product.product_title.slice(0, 25)}...
                        </p>

                        <p className="text-lg">{product.product_price}</p>
                      </Link>
                    ))
                  ) : (
                    <div className="text-center col-span-full flex justify-center items-center">
                      <p className="text-xl font-bold">No products found</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className="flex col-span-full justify-center text-center">
              <FaArrowCircleLeft
                className="cursor-pointer"
                size={30}
                onClick={PagePrev}
              />
              <p className="mx-10 font-bold text-xl">{page}</p>
              <FaArrowCircleRight
                className="cursor-pointer"
                size={30}
                onClick={PageNext}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          filterComponent
            ? "sm:hidden -mt-5 pt-3 absolute top-0 left-0 right-0 bottom-0 flex flex-col w-screen h-screen ease-in duration-300 z-[18]"
            : "sm:hidden -mt-5 absolute pt-3 left-0 top-[100%] right-0 bottom-0 flex flex-col w-screen h-screen ease-in duration-300 z-[18]"
        }
      >
        {filterComponent && (
          <FilterComponentForSmallScreens
            selectedCountry={selectedCountry}
            selectedSortBy={selectedSortBy}
            selectedProductCondition={selectedProductCondition}
            selectedIsPrime={selectedIsPrime}
            setSelectedCountry={setSelectedCountry}
            setSelectedSortBy={setSelectedSortBy}
            setSelectedProductCondition={setSelectedProductCondition}
            setSelectedIsPrime={setSelectedIsPrime}
            setLoading={setLoading}
            setFilterComponent={setFilterComponent}
            filterComponent={filterComponent}
          />
        )}
      </div>
    </div>
  );
}

export default Page;
