"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const CartPageSkeleton = () => {
  return (
    <div className="container mx-auto p-4 h-screen">
      {/* Page Heading Skeleton */}
      <Skeleton className="h-12 w-1/3 mx-auto mb-8" />

      {/* Cart Layout Skeleton */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items Section Skeleton */}
        <div className="md:col-span-2 space-y-4">
          {[...Array(3)].map((_, index) => (
            <Card key={index} className="w-full">
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Skeleton className="h-20 w-20 rounded-lg" />
                  <div className="flex flex-col space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cart Summary Section Skeleton */}
        <div className="md:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-full" />
              </div>
            </CardContent>
          </Card>
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
};

export default CartPageSkeleton;