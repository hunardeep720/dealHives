"use client";
import React, { useEffect, useState } from "react";
import { useUserAuth } from "@/utils/auth-context";
import { getUserData } from "@/service/getServices/page";
import { formatPhoneNumber, formatPostalCode } from "./formated";
import { updateUserData } from "@/service/postServices/page";

function Information() {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [itemId, setItemId] = useState("");
  const [userId, setUserId] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [items, setItems] = useState(null);
  const { user, firebaseSignOut } = useUserAuth();

  async function handleSignOut() {
    await firebaseSignOut();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      firstName: name,
      lastName: lastName,
      email: items.email,
      phone: mobileNumber,
      address: `${streetNumber} ${unitNumber}`,
      city: city,
      state: state,
      country: country,
      pincode: pincode,
    };
    await updateUserData(user, data).then(() => {alert("User Information Updated")});
  };

  function loadItems() {
    getUserData((data) => {
      console.log("information data: ", data);
      if (data) {
        setItems(data);
      }
    }, user);
  }

  useEffect(() => {
    if (user) {
      loadItems();
    }
  }, [user]);
  useEffect(() => {
    console.log("items: ", items);
    if (items) {
      setName(items.firstName);
      setLastName(items.lastName);
      setStreetNumber(items.address.split(" ")[0]);
      setUnitNumber(items.address.split(" ")[1]);
      setCity(items.city);
      setCountry(items.country);
      setMobileNumber(items.phone);
      setPincode(items.pincode);
      setState(items.state);
    }
  }, [items]);

  return (
    <div className="max-w-screen-2xl mx-auto p-4 grid justify-center items-center bg-slate-50 text-center my-5">
      <div className="flex right-0 justify-end">
        <button
          className="p-1 text-white bg-black hover:bg-black/30 hover:text-slate-800"
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </div>

      <p className="font-extrabold text-4xl m-8">User Information</p>
      {items && items !== null ? (
        <>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 bg-white shadow-lg w-full p-5">
              <div className="flex gap-2 p-1">
                <label className="flex items-center">First Name:</label>
                <input
                  value={name}
                  placeholder={name}
                  onChange={(e) => setName(e.target.value)}
                  className="p-1 bg-slate-100 rounded-xl"
                />
              </div>
              <div className="flex gap-2 p-1">
                <label className="flex items-center">Last Name:</label>
                <input
                  value={lastName}
                  placeholder={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="p-1 bg-slate-100 rounded-xl"
                />
              </div>
              <div className="flex gap-2 p-1">
                <label className="flex items-center">Email:</label>
                <input
                  value={items.email}
                  placeholder={items.email}
                  readOnly
                  className="p-1 w-full bg-slate-100 rounded-xl"
                />
              </div>
              <div className="flex gap-2 p-1">
                <label className="flex items-center">Mobile Number:</label>
                <input
                  value={mobileNumber}
                  placeholder={mobileNumber}
                  onChange={(e) =>
                    setMobileNumber(formatPhoneNumber(e.target.value))
                  }
                  className="p-1 bg-slate-100 rounded-xl"
                />
              </div>
              <div className="flex gap-2 p-1">
                <label className="flex items-center">Street Number:</label>
                <input
                  value={streetNumber}
                  placeholder={streetNumber}
                  onChange={(e) => setStreetNumber(e.target.value)}
                  className="p-1 bg-slate-100 rounded-xl"
                />
              </div>
              <div className="flex gap-2 p-1">
                <label className="flex items-center">Unit Number:</label>
                <input
                  value={unitNumber}
                  placeholder={unitNumber}
                  onChange={(e) => setUnitNumber(e.target.value)}
                  className="p-1 bg-slate-100 rounded-xl"
                />
              </div>
              <div className="flex gap-2 p-1">
                <label className="flex items-center">City:</label>
                <input
                  value={city}
                  placeholder={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="p-1 bg-slate-100 rounded-xl"
                />
              </div>
              <div className="flex gap-2 p-1">
                <label className="flex items-center">Province:</label>
                <input
                  value={state}
                  placeholder={state}
                  onChange={(e) => setState(e.target.value)}
                  className="p-1 bg-slate-100 rounded-xl"
                />
              </div>
              <div className="flex gap-2 p-1">
                <label className="flex items-center">Country:</label>
                <input
                  value={country}
                  placeholder={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="p-1 bg-slate-100 rounded-xl"
                />
              </div>
              <div className="flex gap-2 p-1">
                <label className="flex items-center">Pin Code:</label>
                <input
                  value={pincode}
                  placeholder={pincode}
                  onChange={(e) => setPincode(formatPostalCode(e.target.value))}
                  className="p-1 bg-slate-100 rounded-xl"
                />
              </div>
            </div>
            <div className="flex flex-col w-full items-center col-span-full">
              <button
                type="submit"
                className="p-1 text-white bg-black hover:bg-black/30 hover:text-slate-800 w-1/2 mt-5"
              >
                Save
              </button>
            </div>
          </form>
        </>
      ) : (
        <div className="w-full flex justify-center items-center animate-pulse font-bold text-3xl">
          Loading...
        </div>
      )}
    </div>
  );
}

export default Information;
