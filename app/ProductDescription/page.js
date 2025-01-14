"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useUserAuth } from "@/utils/auth-context";
import { addProductsToCart } from "@/service/postServices/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Star, ShoppingCart, AlertCircle } from "lucide-react";
import SimilarProducts from "@/components/SimilarProducts";
import ProductDescriptionSkeleton from "./productDescriptionSkeleton";
import ProductNotFound from "./product-not-found";

function ProductDescription() {
  const searchParams = useSearchParams();
  const asinNumber = searchParams.get("asin");
  const country = searchParams.get("country") || "CA";

  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState(1);
  const { user } = useUserAuth();
  const [productDetail, setProductDetail] = useState(null);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);

  async function fetchProductDescription() {
    const url = `https://real-time-amazon-data.p.rapidapi.com/product-details?asin=${asinNumber}&country=${country}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY || "",
        "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPIDAPI_HOST || "",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setProductDetail(result.data);
    } catch (error) {
      console.error(error);
      setProductDetail(null);
    } finally {
      setLoading(false);
    }
  }

  const AddCartHandler = (e, title, asin, image, price, rating) => {
    e.preventDefault();
    if (user) {
      const date = new Date();
      const product = {
        title,
        asin,
        image,
        price,
        rating,
        amount,
        orderAt: date,
      };
      addProductsToCart(user, product).then(() =>
        setMessage("Product added to cart")
      );
      setAmount(1);
    } else {
      setMessage("Please Sign In to add product to cart");
    }
  };

  useEffect(() => {
    if (asinNumber || country) {
      fetchProductDescription();
    }
  }, [asinNumber, country]);

  useEffect(() => {
    if (productDetail) {
      setImage(productDetail.product_photo);
    }
  }, [productDetail]);

  if (loading) {
    return <ProductDescriptionSkeleton />;
  }

  if (!productDetail || !productDetail.product_title) {
    return <ProductNotFound />;
  }

  return (
    <div className="container mx-auto px-4 my-16">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {productDetail.product_title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {image && (
                <div className="relative aspect-square">
                  <Image
                    src={image}
                    alt={productDetail.product_title}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {productDetail.product_photos &&
                  productDetail.product_photos.map((photo, index) => (
                    <Image
                      key={index}
                      src={photo}
                      height={80}
                      width={80}
                      alt={`Product view ${index + 1}`}
                      className="border-2 hover:border-primary cursor-pointer"
                      onClick={() => setImage(photo)}
                    />
                  ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-bold">
                  {productDetail.product_star_rating}/5
                </span>
              </div>
              <div className="text-3xl font-bold">
                ${productDetail.product_price}
              </div>
              <p>{productDetail.product_availability}</p>
              <div className="flex items-center space-x-4">
                <label htmlFor="quantity" className="font-medium">
                  Quantity:
                </label>
                <Input
                  id="quantity"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(parseInt(e.target.value))}
                  min={1}
                  max={10}
                  className="w-20"
                />
              </div>
              <div className="flex space-x-4">
                <Button
                  onClick={(e) =>
                    AddCartHandler(
                      e,
                      productDetail.product_title,
                      productDetail.asin,
                      productDetail.product_photo,
                      productDetail.product_price,
                      productDetail.product_star_rating
                    )
                  }
                >
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
                <Button variant="secondary">Buy Now</Button>
              </div>
              {message && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Notification</AlertTitle>
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              )}
            </div>
          </div>
          <Tabs defaultValue="details" className="mt-8">
            <TabsList>
              <TabsTrigger value="details">Product Details</TabsTrigger>
              <TabsTrigger value="about">About Product</TabsTrigger>
              <TabsTrigger value="variations">Variations</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-4">
              <ul className="space-y-2">
                {Object.entries(productDetail.product_details).map(
                  ([key, value]) => (
                    <li key={key}>
                      <strong>{key}:</strong> {value}
                    </li>
                  )
                )}
              </ul>
            </TabsContent>
            <TabsContent value="about" className="mt-4">
              <ul className="list-disc pl-5 space-y-2">
                {productDetail.about_product.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="variations" className="mt-4">
              {Object.entries(productDetail.product_variations).map(
                ([key, value]) => (
                  <div key={key} className="mb-4">
                    <h3 className="font-bold mb-2">{key}</h3>
                    <div className="flex flex-wrap gap-2">
                      {value.map((item) => (
                        <Link
                          key={item.asin}
                          href={{
                            pathname: item.is_available
                              ? "/ProductDescription"
                              : "#",
                            query: {
                              asin: item.asin,
                              name: productDetail.product_title,
                            },
                          }}
                          className={`px-3 py-1 rounded ${
                            item.is_available
                              ? "bg-primary text-primary-foreground hover:bg-primary/90"
                              : "bg-muted text-muted-foreground cursor-not-allowed"
                          }`}
                        >
                          {item.value}
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      {productDetail.category_path &&
        productDetail.category_path.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Similar Products</h2>
            <SimilarProducts name={productDetail.category_path[0].name} />
          </div>
        )}
    </div>
  );
}

export default ProductDescription;
