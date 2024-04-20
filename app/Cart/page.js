"use client";
import { useState, useEffect } from "react";
import Space from "@/components/Space";
import { useUserAuth } from "@/utils/auth-context";
import { getItems } from "@/service/store-service";
import Image from "next/image";
import Account from "@/components/Account";
import { deleteItem } from "@/service/store-service";
import ProductBuy from "@/components/ProductBuy";

function Page() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(false);
  const [description, setDescription] = useState([]);
  const [message, setMessage] = useState("");
  const { user } = useUserAuth();
  useEffect(() => {
    const loadItems = async () => {
      try {
        if (user) {
          const userItems = await getItems(user.uid);
          setItems(userItems);
          console.log("Items loaded:", items);
          {
            userItems.map((item) => {
              item.description && setDescription(item.description);
              console.log("Description:", item.description);
            });
          }
        } else {
          console.log("No user");
        }
      } catch (error) {
        console.error("Error loading items:", error);
      }
    };

    loadItems();
  }, [user]);

  const BuyNow = () => {
    setPage(true);
  };

  useEffect(() => {
    console.log("Items:", items);
  }, [items]);
  return (
    <div className="max-w-screen-2xl mx-auto p-4 bg-slate-50">
      {user ? (
        <>
          {page ? (
            <ProductBuy />
          ) : (
            <div>
              <Space />
              <div className="grid justify-center text-center h-full items-center w-full">
                {description.length > 0 ? (
                  <div>
                    <p className="font-extrabold text-4xl m-10">Cart</p>
                    <ul>
                      {items.map((item, index) => (
                        <li
                          key={index}
                          className="w-full flex justify-evenly items-center "
                        >
                          <div
                            className={
                              item.sourceImage &&
                              item.description &&
                              item.price &&
                              item.amount
                                ? "gap-4 grid grid-cols-3 sm:w-1/2 sm:h-96 sm:grid-rows-6 sm:grid-cols-3 m-7 border p-10 shadow-2xl bg-white "
                                : "hidden"
                            }
                          >
                            {item.sourceImage && (
                              <div className="w-full col-span-full sm:col-span-2 sm:row-span-6">
                                <Image
                                  height={500}
                                  width={500}
                                  className="h-80 w-80"
                                  src={item.sourceImage}
                                  alt={item.description}
                                  objectFit="cover"
                                />
                              </div>
                            )}
                            {item.description && (
                              <div className="font-bold col-span-3 sm:col-span-1">
                                Title: {item.description}
                              </div>
                            )}
                            {item.amount && (
                              <div className="font-semibold col-span-1 sm:col-start-3 sm:row-start-3">
                                Amount: {item.amount}
                              </div>
                            )}
                            {item.price && (
                              <div className="col-span-2 sm:col-start-3 sm:col-span-1 sm:row-start-4">
                                Price: {item.price}
                              </div>
                            )}
                            <div className="flex justify-center col-span-3 sm:grid-cols-1 mt-4 sm:col-span-1 sm:col-start-3 sm:row-start-5">
                              {item.description && (
                                <div className="font-bold">
                                  <button
                                    className="p-1 text-white bg-black  hover:bg-black/30 hover:text-slate-800 m-2"
                                    onClick={() => {
                                      deleteItem(user.uid, item.id);
                                      console.log(user.uid);
                                      setMessage("Item removed");
                                      window.location.reload();
                                    }}
                                  >
                                    Remove
                                  </button>
                                </div>
                              )}
                              {item.description && (
                                <div className="font-bold sm:col-start-3">
                                  <button
                                    onClick={BuyNow}
                                    className="p-1 text-white bg-black  hover:bg-black/30 hover:text-slate-800 m-2"
                                  >
                                    Buy Now
                                  </button>
                                </div>
                              )}
                            </div>
                            {item.price && (
                              <div className="col-span-3 sm:row-start-6 sm:col-start-3">
                                <p className="text-center text-red-300">
                                  {message}
                                </p>
                              </div>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="h-full">
                    <p className="text-4xl font-extrabold">No items in cart</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <Account />
      )}
    </div>
  );
}

export default Page;
