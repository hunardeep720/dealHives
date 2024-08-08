"use client";
import Space from "@/components/Space";
import React, { useEffect, useState, useContext } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import Image from "next/image";
import {
  ProductStateContext,
  GlobalStateContext,
} from "../GlobalStateVariable";
import ProductDescription from "@/components/ProductDescription";

function Page() {
  const [open, setOpen] = useContext(GlobalStateContext);
  const [sourceImage, setSourceImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [productSelect, setProductSelect] = useState(false);
  const [page, setPage] = useState(1);
  const [product, setProduct] = useContext(ProductStateContext);
  const [productsList, setProductsList] = useState(null); // Initialize products as an empty array
  const [loading, setLoading] = useState(true); // Initialize loading state as true
  const url = `https://amazon-product-data6.p.rapidapi.com/product-by-text?keyword=${product}&page=${page}&country=US&sort_by=feature`;
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
      setProductsList(jsonData.data);
      setLoading(false);
      console.log(product);
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
  useEffect(() => {
    fetchData();
  }, [product]);
  const PagePrev = () => {
    if (page >= 2) {
      setPage(page - 1);
    }
  };
  const PageNext = () => {
    if (page <= 9) {
      setPage(page + 1);
    }
  };
  const HandleProductSelect = (title, stars, price, image) => {
    setSourceImage(image);
    setDescription(title);
    setPrice(price);
    setRating(stars);
    console.log("title: ", title);
    console.log("stars: ", stars);
    console.log("price: ", price);
    console.log("image: ", image);
    setProductSelect(true);
  };
  return (
    <div className="max-w-screen-2xl mx-auto p-6">
      <div
        className={
          open
            ? "z-[20] bg-transparent opacity-40 ease-in duration-500"
            : "ease-in duration-500"
        }
      >
        {productSelect ? (
          <ProductDescription description={description} sourceImage={sourceImage} price={price} rating={rating} />
        ) : (
          <div>
        <Space />
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 xl:grid-cols-6">
            <p className="ease-in duration-700 col-span-full font-extrabold mb-5 text-xl">
              {" "}
              The given result is shown on the basis of search "{product}".
            </p>
            {loading ? (
              <div className="text-center col-span-full flex justify-center items-center">
                <p className="text-xl font-bold">Loading...</p>
              </div>
            ) : product && productsList.length > 0 ? (
              productsList.map((product) => (
                <div key={product.asin} className="ease-in duration-200 col-span-1 text-center">
                  <Image
                    src={product.image}
                    alt="product"
                    width={500}
                    height={600}
                    objectFit="cover"
                    className="w-48 h-48"
                  />
                  <p
                    onClick={() =>
                      HandleProductSelect(
                        product.title,
                        product.stars,
                        product.price,
                        product.image
                      )
                    }
                    className="font-extrabold text-xs hover:cursor-pointer hover:text-slate-500"
                  >
                    {truncateString(product.title, 20)}
                  </p>

                  <p className="text-lg">{product.price}</p>
                </div>
              ))
            ) : (
              <div className="text-center col-span-full flex justify-center items-center">
                <p className="text-xl font-bold">No products found</p>
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
        )}
      </div>
    </div>
  );
}

export default Page;
