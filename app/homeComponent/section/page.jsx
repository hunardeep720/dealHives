"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, ShoppingCart, Star } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Page({
  fetchDataLink,
  heading,
  headingQuery,
  headingAs,
}) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  async function fetchData() {
    const url = `${fetchDataLink}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY || "",
        "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPIDAPI_HOST || "",
      },
    };

    try {
      setIsLoading(true);
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Received non-JSON response from the server");
      }
      const result = await response.json();
      if (!result.data || !Array.isArray(result.data.products)) {
        throw new Error("Unexpected data structure in the API response");
      }
      setProducts(result.data.products);
    } catch (error) {
      setError(`An error occurred: ${error.message}. Please try again later.`);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleProductClick = (asin, productName) => {
    router.push(
      `/ProductDescription?asin=${asin}&product_name=${encodeURIComponent(
        productName
      )}`
    );
  };

  const renderProductCard = (product) => (
    <Card
      key={product.asin}
      className="w-full max-w-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={() => handleProductClick(product.asin, product.product_title)}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold line-clamp-2">
          {product.product_title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-square relative mb-4">
          <Image
            src={product.product_photo}
            alt={product.product_title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "contain" }}
            className="rounded-md"
          />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold">
            {product.product_price === "$0.00"
              ? "Check Price"
              : product.product_price}
          </p>
          {product.product_star_rating && (
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm">
                {product.product_star_rating}
              </span>
            </div>
          )}
        </div>
        {product.delivery && (
          <p className="text-sm text-gray-500 mt-2">
            {product.delivery.startsWith("$")
              ? `Delivery: ${product.delivery}`
              : product.delivery}
          </p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 my-16">
      <h1 className="text-3xl font-bold mb-8 text-center">
        <Link
          href={{
            pathname: "/Products",
            query: { headingQuery },
          }}
          as={headingAs}
          className="hover:underline"
        >
          {heading}
        </Link>
      </h1>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <Card key={index} className="w-full max-w-sm">
              <CardHeader>
                <Skeleton className="h-4 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-48 w-full mb-4" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!isLoading && products.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map(renderProductCard)}
        </div>
      )}

      {!isLoading && products.length === 0 && !error && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Products Found</AlertTitle>
          <AlertDescription>
            We couldn't find any products matching your criteria. Please try
            again later or adjust your search.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
