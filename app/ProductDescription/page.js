"use client";
import React, { useState } from "react";
import Image from "next/image";
import SimilarProducts from "@/components/SimilarProducts";
import { addProduct } from "@/service/store-service";
import { useUserAuth } from "@/utils/auth-context";
import ProductBuy from "@/components/ProductBuy";
import Space from "@/components/Space";
// import Page as BuyProductPage from "../BuyProduct/page";

function ProductDescription({ description, sourceImage, price, rating }) {
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(false);
  const [amount, setAmount] = useState(1);
  const { user } = useUserAuth();
  const AddCartHandler = (e) => {
    e.preventDefault();
    if (user) {
      const product = { description, sourceImage, price, rating, amount };
      addProduct(user.uid, product);
      setMessage("Product added to cart");
      setAmount(1);
    } else {
      setMessage("Please Sign In to add product to cart");
    }
  };
  const BuyNow = () => {
    setPage(true);
  };
  return (
    <div>
      {page ? (
        <ProductBuy />
      ) : (
        <div>
          <Space />
          <div className="grid grid-cols-2 gap-6 my-8">
            <div className="grid col-span-1 w-1/2 h-1/2">
              <Image
                src={sourceImage}
                alt="product"
                width={500}
                height={600}
                layout="responsive"
                className="w-48 h-48"
              />
            </div>
            <div>
              <p className="text-black font-extrabold text-xl mb-2">
                {description}
              </p>
              <p className="flex text-slate-500 mb-2">
                <p className="text-black font-bold mr-1">Rating :</p>
                {rating}
                <p className="text-black">/5</p>
              </p>
              <p className="text-xl mb-2">{price}</p>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min={1}
                max={10}
                className="border-4 w-1/2 text-center"
              ></input>{" "}
              <p className="my-3">{message}</p>
              <div className="sm:flex hidden justify-evenly">
                <button
                  onClick={AddCartHandler}
                  className=" text-white bg-black  hover:bg-black/30 hover:text-slate-800 px-4 py-2 rounded-md"
                >
                  Add to Cart
                </button>
                <button onClick={BuyNow} className="text-white bg-black  hover:bg-black/30 hover:text-slate-800 px-4 py-2 rounded-md">
                  Buy Now
                </button>
              </div>
            </div>
            <hr className="col-span-full mb-8 border" />
            <div className="col-span-full">
              <div className="sm:hidden flex justify-evenly">
                <button
                  onClick={AddCartHandler}
                  className=" text-white bg-black  hover:bg-black/30 hover:text-slate-800 px-4 py-2 rounded-md"
                >
                  Add to Cart
                </button>
                <button className="text-white bg-black  hover:bg-black/30 hover:text-slate-800 px-4 py-2 rounded-md">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
          <SimilarProducts />
        </div>
      )}
    </div>
  );
}

export default ProductDescription;
