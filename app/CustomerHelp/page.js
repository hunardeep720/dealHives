"use client";
import Space from "@/components/Space";
import React from "react";
import { useState } from "react";

function page() {
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");
  const SubmitHandler = (e) => {
    e.preventDefault();
    setMessage("Thank you for your feedback!");
    setFeedback("");
    setEmail("");
  };
  return (
    <div className="max-w-screen-2xl mx-auto p-5 mb-3">
      <Space className="fixed" />
      <div className="flex justify-center flex-col text-center items-center py-2 ">
        <p className="relative font-extrabold text-4xl mb-10">About Us</p>
        <div id="companyOverview">
          <p className="py-2 mb-5 mt-10 font-bold text-2xl">Company Overview</p>
          <p className="italic">
            XYZ is a leading online retail destination dedicated to providing
            customers with a seamless shopping experience across a wide range of
            products. Founded with a vision to revolutionize the way people
            shop, XYZ offers an extensive selection of high-quality products at
            competitive prices, backed by exceptional customer service and
            innovative technology.
          </p>
        </div>
        <div id="customerCommitment">
          <p className="relative py-2 mb-5 mt-10 font-bold text-2xl">
            Customer Commitment
          </p>
          <p>
            At XYZ, our customers are at the heart of everything we do. We are
            committed to providing an exceptional shopping experience that
            exceeds their expectations and earns their trust and loyalty. Our
            dedicated team of customer service representatives is available to
            assist customers with any inquiries, concerns, or feedback they may
            have, ensuring prompt and personalized assistance at every step of
            their shopping journey.
          </p>
        </div>
        <div id="serviceQualityAndValues">
          <p className="py-2 mb-5 mt-10 font-bold text-2xl">
            Service Quality And Values
          </p>
          <p>
            At XYZ, we are driven by a commitment to excellence and a passion
            for delivering superior quality products and services. We source our
            products from trusted suppliers and brands known for their
            craftsmanship, durability, and reliability, ensuring that our
            customers receive only the best.
          </p>
        </div>
        <div id="contactInformation">
          <p className="py-2 mb-5 mt-10 font-bold text-2xl">
            Contact Information
          </p>
          <section>
            Phone No: <p>(403) 389-8788</p>
          </section>
          <section>
            Email: <p>Sheraj.Thabal@edu.sait.ca</p>
          </section>
        </div>
        <div id="feedbackAndSuggestions">
          <p className="py-2 mb-5 mt-10 font-bold text-2xl">
            Feedback and Suggestions
          </p>
          <div>
            <form
              className="flex flex-col items-center"
              onSubmit={SubmitHandler}
            >
              <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder="Enter Email" className="border shadow-lg p-2 col-span-1 m-5 w-full text-center" required/>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Write Here"
                className="text-center border shadow-lg p-2 col-span-1 m-5 w-full"
                required
              />
              <p className="text-sm text-blue-400">{message}</p>
              <button className="p-1 text-black hover:bg-black/70 hover:text-white m-3">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
