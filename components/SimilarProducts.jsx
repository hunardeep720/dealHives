"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function SimilarProducts({ name }) {
    const [productsList, setProductsList] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data from the API
    async function fetchData() {
        const url = `https://real-time-amazon-data.p.rapidapi.com/search?query=${name}&page=1&country=CA&sort_by=RELEVANCE&product_condition=ALL&is_prime=false`;
        const options = {
            method: "GET",
            headers: {
                "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY || "",
                "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPIDAPI_HOST || "",
            },
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            const products = result.data.products;
            setProductsList(products.slice(1, 13)); // Fetch first 12 products excluding the first
        } catch (error) {
            console.error(error);
            setError("Failed to fetch similar products. Please try again later.");
        } finally {
            setLoading(false);
        }
    }

    // Fetch data on component mount and when `name` changes
    useEffect(() => {
        if (name) {
            fetchData();
        }
    }, [name]);

    // Show loading skeletons
    if (loading) {
        return (
            <div className="space-y-8">
                <Skeleton className="h-12 w-[250px] mx-auto" />
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {[...Array(12)].map((_, index) => (
                        <Card key={index} className="overflow-hidden">
                            <Skeleton className="h-48 w-full" />
                            <CardContent className="p-4">
                                <Skeleton className="h-4 w-full mb-2" />
                                <Skeleton className="h-4 w-2/3" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    // Show error alert if API call fails
    if (error) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
    }

    // Show nothing if no products are available
    if (!productsList || productsList.length === 0) {
        return null;
    }

    // Render product cards
    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center">Similar Products</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {productsList.map((product) => (
                    <Link
                        key={product.asin}
                        href={{
                            pathname: "/ProductDescription",
                            query: { asin: product.asin },
                        }}
                        as={`/ProductDescription?asin=${product.asin}&name=${encodeURIComponent(product.product_title)}`}
                    >
                        <Card className="overflow-hidden transition-shadow hover:shadow-lg cursor-pointer">
                            <div className="aspect-square relative">
                                <Image
                                    src={product.product_photo}
                                    alt={product.product_title}
                                    fill
                                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                                    className="object-cover"
                                />
                            </div>
                            <CardContent className="p-4">
                                <p className="font-bold text-sm line-clamp-2 hover:text-primary transition-colors">
                                    {product.product_title}
                                </p>
                            </CardContent>
                            <CardFooter className="p-4 pt-0">
                                <p className="text-lg font-semibold text-primary">
                                    {product.product_price}
                                </p>
                            </CardFooter>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}