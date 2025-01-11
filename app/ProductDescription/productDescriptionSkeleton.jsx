"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProductDescriptionSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Product Card Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-8 w-1/2" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Image Section Skeleton */}
            <div className="space-y-4">
              <Skeleton className="aspect-square w-full" />
              <div className="flex gap-2 overflow-x-auto pb-2">
                {[...Array(5)].map((_, index) => (
                  <Skeleton key={index} className="h-20 w-20 rounded-lg" />
                ))}
              </div>
            </div>

            {/* Product Info Section Skeleton */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex items-center space-x-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-20" />
              </div>
              <div className="flex space-x-4">
                <Skeleton className="h-12 w-32" />
                <Skeleton className="h-12 w-32" />
              </div>
            </div>
          </div>

          {/* Tabs Skeleton */}
          <Tabs defaultValue="details" className="mt-8">
            <TabsList>
              <TabsTrigger value="details">
                <Skeleton className="h-6 w-24" />
              </TabsTrigger>
              <TabsTrigger value="about">
                <Skeleton className="h-6 w-24" />
              </TabsTrigger>
              <TabsTrigger value="variations">
                <Skeleton className="h-6 w-24" />
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-4">
              {[...Array(4)].map((_, index) => (
                <Skeleton key={index} className="h-6 w-full mb-2" />
              ))}
            </TabsContent>
            <TabsContent value="about" className="mt-4">
              {[...Array(3)].map((_, index) => (
                <Skeleton key={index} className="h-6 w-3/4 mb-2" />
              ))}
            </TabsContent>
            <TabsContent value="variations" className="mt-4">
              <Skeleton className="h-8 w-full" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Similar Products Section Skeleton */}
      <div className="mt-8">
        <Skeleton className="h-8 w-1/4 mb-4" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {[...Array(6)].map((_, index) => (
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
    </div>
  );
};

export default ProductDescriptionSkeleton;