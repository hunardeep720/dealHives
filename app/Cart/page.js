"use client";
import { useState, useEffect } from "react";
import Space from "@/components/Space";
import { useUserAuth } from "@/utils/auth-context";
import { getItems } from "@/service/store-service";
import Image from "next/image";

function Page() {
  const [items, setItems] = useState([]);
  const { user } = useUserAuth();

  const loadItems = async () => {
    if (user) {
      try {
        const userItems = await getItems(user.uid);
        setItems(userItems);
      } catch (error) {
        console.error("Error loading items:", error);
      }
    } else {
      console.log("No user");
    }
  };

  useEffect(() => {
    loadItems();
  }, [user]);

  return (
    <div>
      <Space />
      <div className="grid justify-center text-center items-center w-full">
        <ul>
          {items.map((item, index) => (
            <li key={index} className="w-full flex justify-evenly">
              <div className="w-1/2 h-1/2 flex flex-col sm:flex-row m-7">
                {item.sourceImage && (
                  <Image
                    height={500}
                    width={500}
                    src={item.sourceImage}
                    alt={item.description}
                    objectFit="cover"
                  />
                )}
                <div className="m-5 grid justify-center items-center">
                  {item.description && <div className="font-bold">Title: {item.description}</div>}
                  {item.amount && <div className="font-semibold">Amount: {item.amount}</div>}
                  {item.price && <div>Price: {item.price}</div>}
                  {item.description && <div className="font-bold"><button>Remove</button></div>}
                  {item.description && <div className="font-bold"><button>Buy Now</button></div>}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Page;
