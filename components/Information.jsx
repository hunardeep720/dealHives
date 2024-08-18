"use client";
import React, { useEffect, useState } from "react";
import { useUserAuth } from "@/utils/auth-context";
import { getUserData } from "@/service/getServices/page";

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
  const [items, setItems] = useState(null);
  const { user, firebaseSignOut } = useUserAuth();

  async function handleSignOut() {
    await firebaseSignOut();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length > 0) {
      updateName(user.uid, userId, name);
    }
    if (lastName.length > 0) {
      updateLastName(user.uid, userId, lastName);
    }
    if (address.length > 0) {
      updateAddress(user.uid, itemId, address);
    }
    if (city.length > 0) {
      updateCity(user.uid, itemId, city);
    }
    if (country.length > 0) {
      updateCountry(user.uid, itemId, country);
    }
    if (mobileNumber.length > 0) {
      updateMobileNumber(user.uid, itemId, mobileNumber);
    }
    if (pincode.length > 0) {
      updatePinCode(user.uid, itemId, pincode);
    }
    if (state.length > 0) {
      updateState(user.uid, itemId, state);
    }
    setEdit(!edit);
    window.location.reload();
  };

  const EditHandler = () => {
    setEdit(!edit);
  };

  // const SaveHandler = () => {
  //   setEdit(!edit);
  // };
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
  }, [items]);

  return (
    <div className="max-w-screen-2xl mx-auto p-4 grid justify-center items-center bg-slate-50 text-center">
      <p className="font-extrabold text-4xl m-8">User Information</p>
      {items && items !== null ? (
        <>
          <div
            className={
              edit ? "hidden" : "border shadow-lg p-2 bg-white w-full m-4"
            }
          >
            <div className="grid grid-cols-2 gap-5 m-5 text-center">
              {items.firstName && (
                <div className="border p-1">{items.firstName}</div>
              )}
              {items.lastName && (
                <div className="border p-1">{items.lastName}</div>
              )}
              {items.address && (
                <div className="border p-1">{items.address}</div>
              )}
              {items.city && <div className="border p-1">{items.city}</div>}
              {items.country && (
                <div className="border p-1">{items.country}</div>
              )}
              {items.mobileNumber && (
                <div className="border p-1">{items.mobileNumber}</div>
              )}
              {items.pincode && (
                <div className="border p-1">{items.pincode}</div>
              )}
              {items.state && <div className="border p-1">{items.state}</div>}
            </div>
          </div>
          <div
            className={
              edit ? "border shadow-lg p-2 bg-white m-4 w-full" : "hidden"
            }
          >
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-5 m-5 text-center">
                <input
                  placeholder={items.firstName}
                  onChange={(e) => {
                    setName(e.target.value);
                    setUserId(items.id);
                  }}
                  className="border p-1 text-center"
                />
                {items.lastName && (
                  <input
                    placeholder={items.lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      setUserId(items.id);
                    }}
                    className="border p-1 text-center"
                  />
                )}
                {items.address && (
                  <input
                    placeholder={items.address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      setItemId(items.id);
                    }}
                    className="border p-1 text-center"
                  />
                )}
                {items.city && (
                  <input
                    placeholder={items.city}
                    onChange={(e) => {
                      setCity(e.target.value);
                      setItemId(items.id);
                    }}
                    className="border p-1 text-center"
                  />
                )}
                {items.country && (
                  <input
                    placeholder={items.country}
                    onChange={(e) => {
                      setCountry(e.target.value);
                      setItemId(items.id);
                    }}
                    className="border p-1 text-center"
                  />
                )}
                {items.mobileNumber && (
                  <input
                    type="tel"
                    placeholder={items.mobileNumber}
                    maxLength={10}
                    onChange={(e) => {
                      setMobileNumber(e.target.value);
                      setItemId(items.id);
                    }}
                    className="border p-1 text-center"
                  />
                )}
                {items.pincode && (
                  <input
                    placeholder={items.pincode}
                    maxLength={6}
                    onChange={(e) => {
                      setPincode(e.target.value);
                      setItemId(items.id);
                      console.log(items.id);
                    }}
                    className="border p-1 text-center"
                  />
                )}
                {items.state && (
                  <input
                    placeholder={items.state}
                    onChange={(e) => {
                      setState(e.target.value);
                      setItemId(items.id);
                    }}
                    className="border p-1 text-center"
                  />
                )}
              </div>
              <button
                type="submit"
                className="p-1 text-white bg-black hover:bg-black/30 hover:text-slate-800 w-1/2 mt-5"
              >
                Save
              </button>
            </form>
          </div>
        </>
      ) : (
        <div className="w-full flex justify-center items-center animate-pulse font-bold text-3xl">
          Loading...
        </div>
      )}

      <div className="flex flex-col w-full items-center">
        <button
          onClick={EditHandler}
          className={
            edit
              ? "hidden"
              : "p-1 text-white bg-black hover:bg-black/30 hover:text-slate-800 w-1/2 mt-5"
          }
        >
          Edit
        </button>
        <button
          className="p-1 text-white bg-black hover:bg-black/30 hover:text-slate-800 m-5 w-1/2"
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

export default Information;
