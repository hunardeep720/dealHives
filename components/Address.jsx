"use client";
import { useState } from "react";
import React from "react";
import { addAddress } from "@/service/store-service";
import { useUserAuth } from "@/utils/auth-context";
import Link from "next/link";

function Address() {
  const { user } = useUserAuth();
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("Canada");
  const [pincode, setPincode] = useState("");
  const [done, setDone] = useState(false);
  const ChangeAdress = (e) => {
    setAddress(e.target.value);
  };
  const ChangeMobile = (e) => {
    setMobile(e.target.value);
  };
  const ChangeCity = (e) => {
    setCity(e.target.value);
  };
  const ChangeState = (e) => {
    setState(e.target.value);
  };
  const ChangeCountry = (e) => {
    setCountry(e.target.value);
  };
  const ChangePincode = (e) => {
    setPincode(e.target.value);
  };
  const handleSubmit = async (id) => {
    const userInformation = {
      mobileNumber: mobile,
      address: address,
      city: city,
      state: state,
      country: country,
      pincode: pincode,
    };
    await addAddress(id, userInformation);
    setDone(true);
  };
  const SubmitHandler = (e) => {
    e.preventDefault();
    handleSubmit(user.uid);
    setAddress("");
    setMobile("");
    setCity("");
    setState("");
    setCountry("Canada");
    setPincode("");
  };
  return (
    <div className="max-w-screen-2xl mx-auto grid justify-center item-center text-center items-center h-96 my-44">
      <p className="mb-8 font-extrabold text-2xl">Delivery Address</p>
      <form onSubmit={SubmitHandler} className="grid grid-cols-2 gap-6 mx-2">
        <input
          type="tel"
          maxLength={10}
          value={mobile}
          onChange={ChangeMobile}
          placeholder="Mobile Number"
          className="border shadow-lg p-2 placeholder:font-bold"
          required
        />
        <input
          type="text"
          value={address}
          onChange={ChangeAdress}
          placeholder="Address"
          className="border shadow-lg p-2 placeholder:font-bold"
          required
        />
        <input
          type="text"
          value={city}
          onChange={ChangeCity}
          placeholder="City"
          className="border shadow-lg p-2 placeholder:font-bold"
          required
        />
        <input
          type="text"
          value={state}
          onChange={ChangeState}
          placeholder="State"
          className="border shadow-lg p-2 placeholder:font-bold"
          required
        />
        <input
          type="text"
          value={country}
          onChange={ChangeCountry}
          placeholder="Country"
          className="border shadow-lg p-2 placeholder:font-bold"
          required
        />
        <input
          type="text"
          maxLength={6}
          value={pincode}
          onChange={ChangePincode}
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
