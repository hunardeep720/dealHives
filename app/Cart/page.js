"use client";
import { useState, useEffect } from "react";
import Space from "@/components/Space";
import { useUserAuth } from "@/utils/auth-context";
import { getItems } from "@/service/store-service";
import Image from "next/image";
import AccountPage from "../Account/Page";
import { deleteItem } from "@/service/store-service";

function Page() {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");
  const { user } = useUserAuth();
  useEffect(() => {
    const loadItems = async () => {
      try {
        if (user) {
          const userItems = await getItems(user.uid);
          setItems(userItems);
          console.log("Items loaded:", items);
        } else {
          console.log("No user");
        }
      } catch (error) {
        console.error("Error loading items:", error);
      }
    };

    loadItems();
  }, [user]);

  useEffect(() => {
    console.log("Items:", items);
  }, [items]);
  return (
    <div className="max-w-screen-2xl mx-auto p-4 bg-slate-200">
      {user ? (
        <>
          <Space />
          <div className="grid justify-center text-center items-center w-full">
            {items.map((item) => item.description) ? (
              <div>
                <p className="font-extrabold text-4xl m-10">Cart</p>
                <ul>
                  {items.map((item, index) => (
                    <li
                      key={index}
                      className="w-full flex  justify-evenly flex-col"
                    >
                      <div
                        className={
                          item.sourceImage &&
                          item.description &&
                          item.price &&
                          item.amount
                            ? "w-full sm:w-1/2 flex flex-col sm:flex-row m-7 border p-10 shadow-2xl bg-white"
                            : "hidden"
                        }
                      >
                        {item.sourceImage && (
                          <div className="w-full sm:w-1/2">
                            <Image
                              height={500}
                              width={500}
                              src={item.sourceImage}
                              alt={item.description}
                              objectFit="cover"
                            />
                          </div>
                        )}
                        <div className="m-5 grid justify-center items-center w-full sm:w-1/2">
                          {item.description && (
                            <div className="font-bold">
                              Title: {item.description}
                            </div>
                          )}
                          {item.amount && (
                            <div className="font-semibold">
                              Amount: {item.amount}
                            </div>
                          )}
                          {item.price && <div>Price: {item.price}</div>}
                          <div className="grid grid-cols-2 sm:grid-cols-1 mt-4">
                            {item.description && (
                              <div className="font-bold">
                                <button
                                  className="p-1 text-white bg-black  hover:bg-black/30 hover:text-slate-800 m-2"
                                  onClick={() => {
                                    deleteItem(user.uid, item.id);
                                    console.log(user.uid);
                                    setMessage(
                                      "Item removed, please refresh the page to see the changes"
                                    );
                                  }}
                                >
                                  Remove
                                </button>
                              </div>
                            )}
                            {item.description && (
                              <div className="font-bold">
                                <button className="p-1 text-white bg-black  hover:bg-black/30 hover:text-slate-800 m-2">
                                  Buy Now
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                        {item.price && <div><p className="w-full text-center text-red-300">{message}</p></div>}
                        
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="h-full">
                <p>No items in cart</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <AccountPage />
      )}
    </div>
  );
}

export default Page;
