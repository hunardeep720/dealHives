import React from "react";
import Image from "next/image";
function CategoryImage({ sourceImg }) {
  return (
    <div className="relative">
      <Image
        src={sourceImg}
        alt="products"
        width="1400"
        height="600"
        objectFit="cover"
      />
      <div className="flex justify-center items-center absolute top-0 left-0 right-0 bottom-0 hover:bg-black/50 group">
        <p className="hidden text-gray-400 group-hover:block">Buy Now</p>
      </div>
    </div>
  );
}

export default CategoryImage;
