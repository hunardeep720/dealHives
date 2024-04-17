"use client";
import Link from "next/link";
import { useState } from "react";
import React from "react";

function footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const SubmitHandler = (e) => {
    e.preventDefault();
    setEmail("");
    setMessage("Thank you for subscribing!");
  };
  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 bg-slate-600 p-4">
        <div className="col-span-2 grid justify-center text-center">
          <p className="font-extrabold text-4xl py-3">XYZ</p>
          <p className="font-bold py-2 mb-2">Subscribe for more offers</p>
          <form onSubmit={SubmitHandler}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              className="border rounded-xl p-1 text-center" required
            />
            <p className="text-sm text-blue-400">{message}</p>
            <button
              type="submit"
              className="hover:bg-slate-300 font-bold p-1 rounded-xl w-1/2 my-2"
            >
              Submit
            </button>
          </form>
        </div>
        <div>
          <p className="py-3 font-bold text-2xl">About Us</p>
          <Link href="./CustomerHelp/#companyOverview">
            <p className="font-semibold hover:text-slate-300 py-3">Company Overview</p>
          </Link>
          <Link href="./CustomerHelp/#customerCommitment">
            <p className="font-semibold hover:text-slate-300 py-3">Customer Commitment</p>
          </Link>
          <Link href="./CustomerHelp/#serviceQualityAndValues">
            <p className="font-semibold hover:text-slate-300 py-3">Service Quality And Values</p>
          </Link>          
        </div>
        <div>
          <p className="py-3 font-bold text-2xl">Need Help</p>
          <Link href="./CustomerHelp/#contactInformation">
            <p className="font-semibold hover:text-slate-300 py-3">Contact Information</p></Link>
          <Link href="./CustomerHelp/#feedbackAndSuggestions">
            <p className="font-semibold hover:text-slate-300 py-3">Feedback and Suggestions</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default footer;
