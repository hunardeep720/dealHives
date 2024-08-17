import React from "react";
import Link from "next/link";
import { MdSportsEsports } from "react-icons/md";
import { FaBaby } from "react-icons/fa6";
import { GiBookshelf } from "react-icons/gi";
import { PiTelevisionFill } from "react-icons/pi";
import { GiWashingMachine } from "react-icons/gi";

function ExploreCategories() {
  return (
    <>
      <p className="grid col-span-2  sm:col-span-5 justify-center font-extrabold text-2xl py-8 sm:text-3xl">
        Explore Categories
      </p>
      <Link
        className="flex flex-col items-center hover:text-lg"
        href={{
          pathname: "/Products",
          query: {
            url: "search?query=electronics&page=1&country=CA&sort_by=RELEVANCE&product_condition=ALL&is_prime=false",
          },
        }}
        as={
          "/Products?url=search?query=electronics&page=1&country=CA&sort_by=RELEVANCE&product_condition=ALL&is_prime=false"
        }
      >
        <GiWashingMachine size={100} />
        <p className="font-bold flex justify-center hover:text-slate-500">
          Electronics
        </p>
      </Link>

      <Link
        className="flex flex-col items-center hover:text-lg"
        href={{
          pathname: "/Products",
          query: {
            url: "search?query=movies&page=1&country=CA&sort_by=RELEVANCE&product_condition=ALL&is_prime=false",
          },
        }}
        as={
          "/Products?url=search?query=movies&page=1&country=CA&sort_by=RELEVANCE&product_condition=ALL&is_prime=false"
        }
      >
        <PiTelevisionFill size={100} />
        <p className="font-bold flex justify-center hover:text-slate-500">
          Movies
        </p>
      </Link>

      <Link
        className="flex flex-col items-center hover:text-lg"
        href={{
          pathname: "/Products",
          query: {
            url: "search?query=sports&page=1&country=CA&sort_by=RELEVANCE&product_condition=ALL&is_prime=false",
          },
        }}
        as={
          "/Products?url=search?query=sport&page=1&country=CA&sort_by=RELEVANCE&product_condition=ALL&is_prime=false"
        }
      >
        <MdSportsEsports size={100} />
        <p className="font-bold flex justify-center hover:text-slate-500">
          Sport
        </p>
      </Link>

      <Link
        className="flex flex-col items-center hover:text-lg"
        href={{
          pathname: "/Products",
          query: {
            url: "search?query=kids&page=1&country=CA&sort_by=RELEVANCE&product_condition=ALL&is_prime=false",
          },
        }}
        as={
          "/Products?url=search?query=kids&page=1&country=CA&sort_by=RELEVANCE&product_condition=ALL&is_prime=false"
        }
      >
        <FaBaby size={100} />
        <p className="font-bold flex justify-center hover:text-slate-500">
          Kids
        </p>
      </Link>

      <Link
        className="flex flex-col items-center hover:text-lg"
        href={{
          pathname: "/Products",
          query: {
            url: "search?query=comics&page=1&country=CA&sort_by=RELEVANCE&product_condition=ALL&is_prime=false",
          },
        }}
        as={'/Products?url=search?query=comics&page=1&country=CA&sort_by=RELEVANCE&product_condition=ALL&is_prime=false'}
      >
        <GiBookshelf size={100} />
        <p className="font-bold flex justify-center hover:text-slate-500">
          Comics
        </p>
      </Link>
    </>
  );
}

export default ExploreCategories;
