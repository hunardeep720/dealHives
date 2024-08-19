"use client";
import { useState, useEffect } from "react";
import Space from "@/components/Space";
import { useUserAuth } from "@/utils/auth-context";
import Image from "next/image";
import Account from "@/components/Account";
import { deleteItem } from "@/service/store-service";
import { useRouter } from "next/navigation";
import { getUserCart } from "@/service/getServices/page";
import { deleteFromCart } from "@/service/postServices/page";
import { parse } from "postcss";
import Link from "next/link";

function Page() {
  const [items, setItems] = useState(null);
  const [page, setPage] = useState(false);
  const [description, setDescription] = useState([]);
  const [message, setMessage] = useState("");
  const { user } = useUserAuth();
  const router = useRouter();
  const [total, setTotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [expectedDate, setExpectedDate] = useState(new Date());
  const [amount, setAmount] = useState(0);

  function fetchCartDetails() {
    getUserCart((data) => {
      setItems(data);
    }, user);
  }

  useEffect(() => {
    if (user) {
      fetchCartDetails();
    } else if (user == false) {
      router.push("/Account");
    }
  }, [user]);

  useEffect(() => {
    setAmount(0);
    setTotal(0);
    setTotalAmount(0);
    console.log("Items:", items);
    const date = new Date();
    let dateAfterThreeDays = new Date();
    dateAfterThreeDays.setDate(date.getDate() + 3);
    if (items && items !== null && items.length > 0) {
      items.forEach((item) => {
        const numberValue = parseFloat(item.price.replace(/,/g, ""));
        setTotal((prev) => {
          const itemTotal = parseFloat(numberValue) * parseFloat(item.amount);
          return parseFloat((prev + itemTotal).toFixed(2));
        });
      });
      setExpectedDate(dateAfterThreeDays);
    }
  }, [items]);
  useEffect(() => {
    if (total > 0) {
      setTotalAmount(
        (parseFloat(total, 10) + parseFloat(total * 0.05, 10)).toFixed(2)
      );
    }
  }, [total]);

  return (
    <div className="max-w-screen-2xl mx-auto p-4 bg-slate-50">
      <Space />
      <div className="grid justify-center text-center h-full items-center w-full">
        {items && items !== null ? (
          <div>
            <p className="font-extrabold text-4xl m-10">Cart</p>
            <div className="grid sm:grid-cols-3">
              <ul className="col-span-2">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="w-full flex justify-evenly items-center "
                  >
                    <div className="gap-4 grid grid-cols-3 sm:w-1/2 sm:h-96 sm:grid-rows-6 sm:grid-cols-3 m-7 border p-10 shadow-2xl bg-white ">
                      {item.image && (
                        <div className="w-full col-span-full sm:col-span-2 sm:row-span-6">
                          <Image
                            height={500}
                            width={500}
                            className="h-80 w-80"
                            src={item.image}
                            alt={item.image}
                            objectFit="cover"
                          />
                        </div>
                      )}
                      {item.title && (
                        <div className="font-bold col-span-3 sm:col-span-1">
                          {item.title.slice(0, 25)}...
                        </div>
                      )}
                      {item.amount && (
                        <div className="font-semibold col-span-1 sm:col-start-3 sm:row-start-3">
                          Amount: {item.amount}
                        </div>
                      )}
                      {item.price && (
                        <div className="col-span-2 sm:col-start-3 sm:col-span-1 sm:row-start-4">
                          Price:{" "}
                          {(
                            parseFloat(item.price.replace(/,/g, "")) *
                            item.amount
                          ).toFixed(2)}
                          <p className="text-xs text-start pl-2 italic">
                            ({item.price} * {item.amount})
                          </p>
                        </div>
                      )}
                      <div className="flex justify-center col-span-3 sm:grid-cols-1 sm:col-span-1 sm:col-start-3 sm:row-start-6">
                        <button
                          className="text-white bg-black  hover:bg-black/30 hover:text-slate-800 p-2 h-full cursor-pointer"
                          onClick={() => {
                            deleteFromCart(user, item.id).then(() => {
                              alert("Item removed");
                            });
                          }}
                        >
                          Remove
                        </button>
                      </div>
                      {item.price && (
                        <div className="col-span-3 sm:row-start-7 sm:col-start-3">
                          <p className="text-center text-red-300">{message}</p>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="bg-white p-3 mx-auto shadow-lg mb-4">
                <p className="sm:text-2xl text-xl font-bold w-full text-center mb-">
                  Payment
                </p>
                <table className="w-full mt-5">
                  <tr className="border-b-2 border-black">
                    <td className="font-bold text-lg mr-5">Amount</td>
                    <td>
                      {items &&
                        items.length > 0 &&
                        items.map((item) => (
                          <p className="py-3 font-semibold">
                            {item.title.slice(0, 15)}...&nbsp;&nbsp;&nbsp;
                            {item.price}
                          </p>
                        ))}
                      <p className="border-2 border-b-0 border-black text-end">
                        {total}
                      </p>
                    </td>
                  </tr>
                  <tr className="border-b-2 border-black">
                    <td className="font-bold text-lg mr-5 py-3">Tax</td>
                    <td>0.05%</td>
                  </tr>
                  <tr className="border-b-2 border-black">
                    <td className="font-bold text-lg mr-5 py-3">
                      Total Amount
                    </td>
                    <td>{totalAmount}</td>
                  </tr>
                  <tr>
                    <td className="font-bold text-lg mr-5 py-3">
                      Expected Delivery Date
                    </td>
                    <td>
                      {expectedDate.toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                </table>
                <div className="w-full justify-center flex">
                  <Link href="/BuyProduct">
                    <button className="text-white bg-green-900  hover:bg-green-900/30 hover:text-black p-2">
                      Buy now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full">
            <p className="text-4xl font-extrabold">No items in cart</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
