import Space from "@/components/Space";
import React from "react";
import Link from "next/link";

function ProductBuy() {
  return (
    <div>
      <div>
        <Space />
          <div className="max-w-screen-2xl mx-auto flex flex-col justify-center items-center text-center w-full p-5">
            <p className="text-4xl font-extrabold m-3">
              Purchase option is currently unavailable.
            </p>
            <p className="text-xl font-bold m-3">
              We will inform you when they become available
            </p>
            <p className="text-md font-semibold m-3">
              Thanks for your patients!
            </p>
            <div className="grid grid-cols-2 gap-6 w-full justify-center items-center text-center">
              <Link className="col-span-1 text-center w-full" href="./">
                <button className="text-md font-semibold hover:font-bold bg-black text-white p-4 rounded-xl hover:bg-black/30 hover:text-black">
                  See more options
                </button>
              </Link>
              <Link className="col-span-1 text-center w-full" href="./Account">
                <p className="text-md font-semibold hover:font-bold bg-black text-white py-4 w-56 rounded-xl hover:bg-black/30 hover:text-black">
                  You can see or edit your information
                </p>
              </Link>
            </div>
          </div>
      </div>
    </div>
  );
}

export default ProductBuy;
