"use client";
import React from "react";
import { GlobalStateContext } from "@/app/GlobalStateVariable";
import { useContext } from "react";
import Space from "./Space";
import image from "./HomeImage";
import CategoryImage from "./CategoryImage";
function HomeContent() {
  const [open, setOpen] = useContext(GlobalStateContext);
  return (
    <div className="mx-auto w-auto mb-12 relative">
      <Space />
      <div className={
          open
            ? "relative grid gap-4 grid-cols-2 sm:grid-cols-4 xl:grid-cols-6 z-[10] bg-transparent opacity-40 ease-in duration-500"
            : "relative grid gap-4 grid-cols-2 sm:grid-cols-4 xl:grid-cols-6 ease-in duration-500"
        }>
      <div>
      <CategoryImage sourceImg={image[0].image} />
     </div>
     <div>
      <CategoryImage sourceImg={image[1].image} />
     </div>
     <div>
      <CategoryImage sourceImg={image[2].image} />
     </div>
     <div>
      <CategoryImage sourceImg={image[3].image} />
     </div>
     <div>
      <CategoryImage sourceImg={image[4].image} />
     </div>
     <div>
      <CategoryImage sourceImg={image[5].image} />
     </div>
     <div>
      <CategoryImage sourceImg={image[6].image} />
     </div>
     <div>
      <CategoryImage sourceImg={image[7].image} />
     </div>
     <div>
      <CategoryImage sourceImg={image[8].image} />
     </div>
     <div>
      <CategoryImage sourceImg={image[9].image} />
     </div>
     <div>
      <CategoryImage sourceImg={image[10].image} />
     </div>
     <div>
      <CategoryImage sourceImg={image[11].image} />
     </div>
      </div>
    </div>
  );
}

export default HomeContent;
