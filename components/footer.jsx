"use client";
import Link from "next/link";
import { useState, useContext } from "react";
import React from "react";
import { GlobalStateContext } from "@/app/GlobalStateVariable";
function footer() {
  const [open, setOpen] = useContext(GlobalStateContext);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const SubmitHandler = (e) => {
    e.preventDefault();
    setEmail("");
    setMessage("Thank you for subscribing!");
  };
  return (
    <footer className=" w-full mx-auto bottom-0 mb-0">
      <div
        className={
          open
            ? "container grid grid-cols-2 sm:grid-cols-4 gap-6 bg-slate-200 px-4 z-[1] bg-transparent opacity-40 ease-in duration-500 max-w-screen-2xl mx-auto"
            : "container grid grid-cols-2 sm:grid-cols-4 gap-6 bg-slate-200 px-4 ease-in duration-500 max-w-screen-2xl mx-auto"
        }
      >
        <div className="col-span-2 grid pl-3">
          <p className="font-extrabold text-4xl py-3">XYZ</p>
          <p className="font-bold py-2 mb-2">Subscribe for more offers</p>
          <form onSubmit={SubmitHandler}>
            <div className="flex gap-5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                className="border rounded-xl p-1 text-center"
                required
              />
              <button
                type="submit"
                className="hover:bg-slate-300 font-bold p-1 rounded-xl w-1/2 my-2 max-w-[100px]"
              >
                Submit
              </button>
            </div>
            <p className="text-sm text-blue-400 mt-2">{message}</p>
          </form>
        </div>
        <div>
          <p className="py-3 font-bold text-2xl">About Us</p>
          <Link href="./CustomerHelp/#companyOverview">
            <p className="font-semibold hover:text-slate-300 py-3">
              Company Overview
            </p>
          </Link>
          <Link href="./CustomerHelp/#customerCommitment">
            <p className="font-semibold hover:text-slate-300 py-3">
              Customer Commitment
            </p>
          </Link>
          <Link href="./CustomerHelp/#serviceQualityAndValues">
            <p className="font-semibold hover:text-slate-300 py-3">
              Service Quality And Values
            </p>
          </Link>
        </div>
        <div>
          <p className="py-3 font-bold text-2xl">Need Help</p>
          <Link href="./CustomerHelp/#contactInformation">
            <p className="font-semibold hover:text-slate-300 py-3">
              Contact Information
            </p>
          </Link>
          <Link href="./CustomerHelp/#feedbackAndSuggestions">
            <p className="font-semibold hover:text-slate-300 py-3">
              Feedback and Suggestions
            </p>
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default footer;
