"use client";
import React, {useContext, useEffect, useState} from 'react'
import Image from "next/image";
import {
  ProductStateContext,
  GlobalStateContext,
} from "@/app/GlobalStateVariable";
import ProductDescription from "@/components/ProductDescription";
import Space from './Space';

function SimilarProducts() {
  const [productsList, setProductsList] = useState([]);
  const [sourceImage, setSourceImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [productSelect, setProductSelect] = useState(false);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useContext(ProductStateContext);
  const url = `https://amazon-product-data6.p.rapidapi.com/product-by-text?keyword=${product}&country=US&sort_by=feature`;
  const options = {
    method: "Get",
    headers: {
      "X-RapidAPI-Key": "d70428a133msh0ee3a41e66d048fp1ed1cfjsnf242448b75f2",
      "X-RapidAPI-Host": "amazon-product-data6.p.rapidapi.com",
    },
  };
  const truncateString = (str, maxLength) => {
    return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
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
  const sortByBestSeller = (a, b) => {
    if (a.is_best_seller && !b.is_best_seller) {
      return -1; // 'a' comes before 'b'
    } else if (!a.is_best_seller && b.is_best_seller) {
      return 1; // 'b' comes before 'a'
    } else {
      return 0; // No change in order
    }
  };
  useEffect(() => {
    fetchData();
  }, [product]);
  useEffect(() => {
    if (productsList.length > 0){
      productsList.sort(sortByBestSeller);
    }
  },[productsList]);
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
    <div className='text-center'>
      {productSelect ? (<div className='top-0 relative'>
        <div className='fixed'>
          <Space />
        </div>
        
        <ProductDescription className="absolute" description={description} sourceImage={sourceImage} price={price} rating={rating} />
      </div>
          
        ) : (<div>
        <p className='text-3xl font-bold'>Similar Products</p>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 xl:grid-cols-6">
            {loading ? (
              <div className="text-center col-span-full flex justify-center items-center">
                <p className="text-xl font-bold">Loading...</p>
              </div>
            ) : productsList.length > 0 ? (
              productsList.map((product) => (
                <div key={product.asin} className="ease-in duration-200 col-span-1 text-center">
                  {product.is_best_seller ? (
                    <div>
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

                  <p className="text-lg">{product.price}</p> </div>
                  ) : null}
                  
                </div>
              ))
            ) : (
              <div className="text-center col-span-full flex justify-center items-center">
                <p className="text-xl font-bold">No products found</p>
              </div>
            )}
        </div> </div>)}
    </div>
  )
}

export default SimilarProducts