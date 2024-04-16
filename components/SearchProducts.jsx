"use client";
import Space from "@/components/Space";
import React, { useContext, useEffect, useState } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import Image from "next/image";
function SearchProducts() {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState(null); // Initialize products as an empty array
  const [loading, setLoading] = useState(true); // Initialize loading state as true
  const url = `https://amazon-product-data6.p.rapidapi.com/product-by-text?keyword=electronics&page=${page}&country=US&sort_by=feature`;
  const options = {
    method: "Get",
    headers: {
      "X-RapidAPI-Key": "d70428a133msh0ee3a41e66d048fp1ed1cfjsnf242448b75f2",
      "X-RapidAPI-Host": "amazon-product-data6.p.rapidapi.com",
    },
  };
  const fetchData = async () => {
    try {
      const fetchList = await fetch(url, options);
      const jsonData = await fetchList.json();
      console.log("jsonData: ", jsonData);
      setProducts(jsonData.data);
      setLoading(false);
    } catch (error) {
      console.error("error fetching data details: ", error);
    }
  };
  const truncateString = (str, maxLength) => {
    return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
  };
  useEffect(() => {
    fetchData();
  }, [page]);
  const PagePrev = () => {
    if (page >=2){
      setPage((page)-1)
    }
  }
  const PageNext = () => {
    if (page <=9){
      setPage((page)+1)
    }
  }
  return (
    <div className="max-w-screen-2xl mx-auto p-6">
      <Space />
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 xl:grid-cols-6">
        <p className="col-span-full font-extrabold mb-5 text-xl"> The given result is shown on the basis of search "product".</p>
        {loading ? (
          <div className="text-center col-span-full flex justify-center items-center">
            <p className="text-xl font-bold">Loading...</p>
          </div>
          
        ) : products.length > 0 ? (
          products.map((product) => (
            <div key={product.asin} className="col-span-1 text-center">
              <Image src={product.image} alt="product" width={500} height={600} objectFit="cover" className="w-48 h-48" />
              <p className="font-extrabold text-xs hover:cursor-pointer hover:text-slate-500">
                {truncateString(product.title, 20)}
              </p>
              <p className="text-lg">{product.price}</p>
            </div>
          ))
        ) : (
          <div className="text-center col-span-full flex justify-center items-center"><p className="text-xl font-bold">No products found</p></div>
          
        )}
        <div className="flex col-span-full justify-center text-center">
            <FaArrowCircleLeft className="cursor-pointer" size={30} onClick={PagePrev}/>
            <p className="mx-10 font-bold text-xl">{page}</p>
            <FaArrowCircleRight className="cursor-pointer" size={30} onClick={PageNext}/>
        </div>
      </div>
    </div>
  );
}

export default SearchProducts