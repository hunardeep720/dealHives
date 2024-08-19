"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import SimilarProducts from "@/components/SimilarProducts";
import { addProduct } from "@/service/store-service";
import { useUserAuth } from "@/utils/auth-context";
import Space from "@/components/Space";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
// import Page as BuyProductPage from "../BuyProduct/page";

function ProductDescription({ description, sourceImage, price, rating }) {
  const searchParams = useSearchParams(); // get the search params
  const asinNumber = searchParams.get("asin"); // get the asin number from the search params
  const country = searchParams.get("country")
    ? searchParams.get("country")
    : "CA"; // get the country from the search params

  const [message, setMessage] = useState("");
  const [page, setPage] = useState(false);
  const [amount, setAmount] = useState(1);
  const { user } = useUserAuth();
  const [productDetail, setProductDetail] = useState(null);
  const [image, setImage] = useState("");

  //fetching product details
  async function fetchProductDescription() {
    const url = `https://real-time-amazon-data.p.rapidapi.com/product-details?asin=${asinNumber}&country=${country}`;
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
      const products = result.data;
      setProductDetail(products);
    } catch (error) {
      console.error(error);
    }
  }

  const AddCartHandler = (
    e,
    title,
    description,
    image,
    price,
    rating,
  ) => {
    e.preventDefault();
    if (user) {
      const product = { title, description, image, price, rating, amount };
      addProduct(user.uid, product);
      setMessage("Product added to cart");
      setAmount(1);
    } else {
      alert("Please Sign In to add product to cart");
    }
  };
  const BuyNow = () => {
    setPage(true);
  };

  useEffect(() => {
    if (asinNumber || country) {
      fetchProductDescription();
      console.log("productDetail: ", asinNumber, country);
    }
  }, [asinNumber, country]);

  useEffect(() => {
    if (productDetail) {
      setImage(productDetail.product_photo);
      console.log("productDetail: ", productDetail);
    }
  }, [productDetail]);

  return (
    <div className="max-w-screen-2xl mx-auto px-3">
      {productDetail ? (
        <div>
          <Space />
          <div className="grid grid-cols-2 gap-6 my-8">
            <p className="text-black font-extrabold text-xl mb-2 col-span-full">
              {productDetail.product_title}
            </p>
            <div className="grid col-span-1 flex-row">
              <Image
                src={image}
                alt="product"
                width={500}
                height={600}
                layout="responsive"
              />
              {/* <div className="flex sm:hidden">
                {productDetail.product_photos.map((photo, index) => (
                  <Image key={index} src={photo} height={10} width={10} style={{outline:"cover"}}/>
                ))}
              </div> */}
            </div>
            <div>
              <div>
                <h2 className="text-lg lg:text-2xl font-bold mt-5">
                  Product Details
                </h2>
                <ul className="lg:text-xl">
                  {Object.entries(productDetail.product_details).map(
                    ([key, value]) => (
                      <li key={key}>
                        <strong>{key}:</strong> {value}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <span className="flex text-slate-500 mb-2">
                <p className="text-black font-bold mr-1">Rating :</p>
                {rating}
                <p className="text-black">
                  {productDetail.product_star_rating}/5
                </p>
              </span>
              <div className="flex items-center gap-5">
                <label className="lg:text-xl text-md font-bold">Quantity</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min={1}
                  max={10}
                  className="border-4 text-center"
                />
              </div>
              <p className="my-3">{message}</p>
              <p className="text-xl font-bold mb-2">
                ${productDetail.product_price}
              </p>
              <p>{productDetail.product_availability}</p>
              <div className="sm:flex hidden gap-3 my-5">
                {productDetail.product_photos.map((photo, index) => (
                  <Image
                    key={index}
                    src={photo}
                    height={100}
                    width={100}
                    className="border-2 border-black hover:border-4 hover:cursor-pointer p-1"
                    onClick={() => setImage(photo)}
                    onMouseEnter={() => setImage(photo)}
                  />
                ))}
              </div>
              <div className="hidden sm:block">
                <ul className="lg:text-xl">
                  {Object.entries(productDetail.product_variations).map(
                    ([key, value]) => (
                      <li
                        key={key}
                        className="grid grid-cols-5 items-center border-b-2 pb-4 border-t-2 pt-4"
                      >
                        <strong>{key}:</strong>{" "}
                        {value.map((item) => {
                          return (
                            <Link
                              href={{
                                pathname: item.is_available
                                  ? "/ProductDescription"
                                  : "#",
                                query: {
                                  asin: item.asin,
                                  name: productDetail.product_title,
                                },
                              }}
                              as={`/ProductDescription?asin=${item.asin}&name=${productDetail.product_title}`}
                              className={
                                item.is_available
                                  ? "border-2 border-black p-1 bg-white"
                                  : "border-2 p-1 bg-slate-50 hover:cursor-not-allowed"
                              }
                            >
                              {item.value}&nbsp;
                            </Link>
                          );
                        })}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="sm:flex hidden gap-5 mt-10">
                <button
                  onClick={(e)=>AddCartHandler(e, productDetail.product_title, productDetail.product_description, productDetail.product_photo, productDetail.product_price, productDetail.product_star_rating)}
                  className=" text-white bg-black  hover:bg-black/30 hover:text-slate-800 p-4 rounded-md"
                >
                  Add to Cart
                </button>
                <button
                  onClick={BuyNow}
                  className="text-white bg-slate-800  hover:bg-slate-800/30 hover:text-slate-800 p-4 rounded-md"
                >
                  Buy Now
                </button>
              </div>
            </div>
            {/* <hr className="col-span-full mb-8 border" /> */}
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
            <div className="flex overflow-scroll sm:hidden gap-3 col-span-full">
              {productDetail.product_photos.map((photo, index) => (
                <Image
                  key={index}
                  src={photo}
                  height={80}
                  width={80}
                  className="border-2 border-black hover:border-4 hover:cursor-pointer p-1"
                  onClick={() => setImage(photo)}
                  onMouseEnter={() => setImage(photo)}
                />
              ))}
            </div>
            <div className="col-span-full sm:hidden grid">
              <ul className="lg:text-xl">
                {Object.entries(productDetail.product_variations).map(
                  ([key, value]) => (
                    <li
                      key={key}
                      className="grid grid-cols-4 gap-2 items-center border-b-2 pb-4 border-t-2 pt-4"
                    >
                      <strong>{key}:</strong>{" "}
                      {value.map((item) => {
                        return (
                          <Link
                            href={{
                              pathname: item.is_available
                                ? "/ProductDescription"
                                : "#",
                              query: {
                                asin: item.asin,
                                name: productDetail.product_title,
                              },
                            }}
                            as={`/ProductDescription?asin=${item.asin}&name=${productDetail.product_title}`}
                            className={
                              item.is_available
                                ? "border-2 border-black p-1 bg-white"
                                : "border-2 p-1 bg-slate-50 hover:cursor-not-allowed"
                            }
                          >
                            {item.value}&nbsp;
                          </Link>
                        );
                      })}
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="mb-2 col-span-full">
              {productDetail.about_product.map((item, index) => (
                <p key={index} className="text-black font-bold sm:text-xl">
                  {index}.&nbsp;&nbsp;&nbsp;{item}
                </p>
              ))}
            </div>
          </div>
          {productDetail.category_path.length > 0 && (
            <div className="mb-2 col-span-full">
              <div className="text-black font-bold my-5">
                <SimilarProducts name={productDetail.category_path[0].name} />
              </div>
            </div>
          )}
          {/* <SimilarProducts /> */}
        </div>
      ) : (
        <div className="max-w-screen-2xl mx-auto font-bold w-screen h-screen flex justify-center items-center text-3xl animate-pulse">
          Loading...
        </div>
      )}
    </div>
  );
}

export default ProductDescription;
