"use client";
import React, { useState, useEffect } from "react";
import { GlobalStateContext } from "@/app/GlobalStateVariable";
import { useContext } from "react";
import ExploreCategories from "@/app/homeComponent/exploreCategories/page";
import Page from "@/app/homeComponent/section/page";
import { Skeleton } from "@/components/ui/skeleton";

// Skeleton Loader for the HomeContent
const HomeContentSkeleton = () => (
  <div className="p-8">
    {[...Array(5)].map((_, index) => (
      <div key={index} className="my-4">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-6 w-1/2 mt-2" />
        <Skeleton className="h-48 w-full mt-4" />
      </div>
    ))}
  </div>
);

const sections = [
  {
    heading: " Newest Arrivals",
    class: "col-span-2",
    fetchDataLink:
      "https://real-time-amazon-data.p.rapidapi.com/products-by-category?category_id=2478868012&page=1&country=CA&sort_by=NEWEST&product_condition=NEW&is_prime=false",
    query: {
      url: "products-by-category?category_id=2478868012",
      sort_by: "NEWEST",
      page: 1,
      country: "CA",
      product_condition: "NEW",
      is_prime: false,
      name: "Newest Arrivals",
    },
    as: "/Products?url=products-by-category?category_id=2478868012&page=1&country=CA&sort_by=NEWEST&product_condition=NEW&is_prime=false&name=Newest Arrivals",
  },
  {
    heading: "Best Sellers",
    class: "col-span-2",
    fetchDataLink:
      "https://real-time-amazon-data.p.rapidapi.com/products-by-category?category_id=2478868012&page=1&country=CA&sort_by=BEST_SELLERS&product_condition=NEW&is_prime=false",
    query: {
      url: "products-by-category?category_id=2478868012",
      sort_by: "BEST_SELLERS",
      page: 1,
      country: "CA",
      product_condition: "NEW",
      is_prime: false,
      name: "Best Sellers",
    },
    as: "/Products?url=products-by-category?category_id=2478868012&page=1&country=CA&sort_by=BEST_SELLERS&product_condition=NEW&is_prime=false&name=Best Sellers",
  },
  {
    heading: "Gifts For Everyone",
    class: "col-span-2",
    fetchDataLink:
      "https://real-time-amazon-data.p.rapidapi.com/search?query=gifts&page=1&country=CA&sort_by=RELEVANCE&product_condition=ALL&is_prime=false",
    query: {
      url: "search?query=gifts",
      page: 1,
      country: "CA",
      sort_by: "RELEVANCE",
      product_condition: "ALL",
      is_prime: false,
      name: "Gifts for everyone",
    },
    as: "/Products?url=search?query=gifts&page=1&country=CA&sort_by=RELEVANCE&product_condition=ALL&is_prime=false&name=Gifts for everyone",
  },
  {
    heading: "Decorate Your Home",
    class: "col-span-full",
    fetchDataLink:
      "https://real-time-amazon-data.p.rapidapi.com/search?query=decorate%20Home&page=1&country=CA&sort_by=RELEVANCE&product_condition=ALL&is_prime=false",
    query: {
      query: "decorate Home",
      page: 1,
      country: "CA",
      sort_by: "RELEVANCE",
      product_condition: "ALL",
      is_prime: false,
      name: "Decorate Your Home",
    },
    as: "/Products?query=decorate%20Home&page=1&country=CA&sort_by=RELEVANCE&product_condition=ALL&is_prime=false&name=Decorate Your Home",
  },
  {
    heading: "Personal Care",
    class: "col-span-full",
    fetchDataLink:
      "https://real-time-amazon-data.p.rapidapi.com/search?query=skin%20care&page=1&country=CA&sort_by=RELEVANCE&product_condition=ALL&is_prime=false",
    query: {
      url: "search?query=skin%20care",
      page: 1,
      country: "CA",
      sort_by: "RELEVANCE",
      product_condition: "ALL",
      is_prime: false,
      name: "Personal Care",
    },
    as: "/Products?url=search?query=skin%20care&page=1&country=CA&sort_by=RELEVANCE&product_condition=ALL&is_prime=false&name=Personal Care",
  },
];

function HomeContent() {
  const [open, setOpen] = useContext(GlobalStateContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000); // Simulate loading time
  }, []);

  if (loading) {
    return <HomeContentSkeleton />;
  }

  return (
    <div className="mx-auto w-auto mb-12 relative">
      <div
        className={
          open
            ? "relative grid gap-6 grid-cols-2 sm:grid-cols-4 xl:grid-cols-6 z-[1] bg-transparent opacity-40 ease-in duration-500"
            : "relative grid gap-6 grid-cols-2 sm:grid-cols-4 xl:grid-cols-6 ease-in duration-500"
        }
      >
        {sections.map((section, index) => (
          <div className={`grid col-span-full gap-4 p-2 px-5`} key={index}>
            <Page {...section} />
          </div>
        ))}
        <div className="grid col-span-full gap-4 p-2 px-5">
          <ExploreCategories />
        </div>
      </div>
    </div>
  );
}

export default HomeContent;
