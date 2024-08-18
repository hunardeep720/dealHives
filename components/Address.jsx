"use client";
import { useState } from "react";
import React from "react";
import Link from "next/link";
import { formatPhoneNumber, formatPostalCode } from "./formated";

function Address({
  setComplete,
  setLoginCity,
  setLoginMobileNumber,
  setLoginAddress,
  setLoginState,
  setLoginCountry,
  setLoginPinCode,
}) {
  const [address, setAddress] = useState("");
  const [street, setStreet] = useState("");
  const [unit, setUnit] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("Canada");
  const [pincode, setPincode] = useState("");
  const [done, setDone] = useState(false);

  const SubmitHandler = (e) => {
    e.preventDefault();
    setLoginMobileNumber(mobile);
    setLoginAddress(`${street} ${unit}`);
    setLoginCity(city);
    setLoginState(state);
    setLoginCountry(country);
    setLoginPinCode(pincode);
    setComplete(true);
    setAddress("");
    setMobile("");
    setCity("");
    setState("");
    setCountry("Canada");
    setPincode("");
  };
  return (
    <div className="max-w-screen-2xl mx-auto grid justify-center item-center text-center items-center">
      <p className="mb-8 font-extrabold text-2xl">Delivery Address</p>
      <form
        onSubmit={(e) => SubmitHandler(e)}
        className="grid grid-cols-2 gap-6 mx-2"
      >
        <input
          type="tel"
          maxLength={14}
          value={mobile}
          onChange={(e) => setMobile(formatPhoneNumber(e.target.value))}
          placeholder="Mobile Number"
          className="border shadow-lg p-2 placeholder:font-bold"
          required
        />
        <input
          type="text"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          placeholder="Street Address"
          className="border shadow-lg p-2 placeholder:font-bold"
          required
        />
        <input
          type="text"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          placeholder="Unit Number"
          className="border shadow-lg p-2 placeholder:font-bold"
          required
        />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
          className="border shadow-lg p-2 placeholder:font-bold"
          required
        />
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="Province"
          className="border shadow-lg p-2 placeholder:font-bold"
          required
        />
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Country"
          className="border shadow-lg p-2 placeholder:font-bold"
          required
        />
        <input
          type="text"
          maxLength={7}
          value={pincode}
          onChange={(e) => setPincode(formatPostalCode(e.target.value))}
          placeholder="Pincode"
          className="border shadow-lg p-2 placeholder:font-bold"
          required
        />
        {done ? (
          <div className="col-span-2 grid-cols-2">
            <p className="col-span-1 text-blue-500 m-2">
              Address Added Successfully
            </p>

            <Link href="./">
              <button
                type="submit"
                className="col-span-1 p-1 w-full text-white bg-black  hover:bg-black/30 hover:text-slate-800"
              >
                Next
              </button>
            </Link>
          </div>
        ) : (
          <button
            type="submit"
            className="col-span-2 p-1 text-white bg-black  hover:bg-black/30 hover:text-slate-800"
          >
            Submit
          </button>
        )}
      </form>
    </div>
  );
}

export default Address;
