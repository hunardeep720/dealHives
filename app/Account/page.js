"use client";
import Space from "@/components/Space";
import React from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import { GlobalStateContext, UserGlobalContext } from "../GlobalStateVariable";
import { useContext, useState } from "react";
import { auth } from "@/utils/firebase";
import { useUserAuth } from "@/utils/auth-context";
import { signInWithEmailAndPassword } from "firebase/auth";
import Information from "@/components/Information";
function page() {
  const { user } = useUserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInclude, setIsInclude] = useState(false);
  const [notFound, setNotFound] = useState("");
  let ChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  let ChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const [open, setOpen] = useContext(GlobalStateContext);
  const checkUser = async () => {
    try {
      // Await the sign-in operation to get the result
      const result = await signInWithEmailAndPassword(auth, email, password);
      // If sign-in is successful, set the user data and update state
      setNotFound(""); // Clear any previous error message
      setIsInclude(true); // Set user found
      console.log("Success");
    } catch (error) {
      // If an error occurs during sign-in, log the error message
      console.error("Error signing in:", error.message);
      // Handle different error scenarios if needed
      if (
        error.code === "auth/invalid-email" ||
        error.code === "auth/user-not-found"
      ) {
        setNotFound("Invalid email or password"); // Set error message for invalid email or password
      } else {
        setNotFound("An error occurred. Please try again later."); // Generic error message
      }
      setIsInclude(false); // Set user not found
    }
  };
  const SubmitHandler = (e) => {
    e.preventDefault();
    checkUser();
    if (!notFound.length) {
      setIsInclude(true);
    }

    console.log(notFound);
    console.log(isInclude);
  };
  const [eye, setEye] = useState(true);
  return (
    <div className="bg-slate-50">
      <Space />
      {user ? (
        <Information />
      ) : (
        <div className="max-w-screen-2xl mx-auto w-auto p-4 flex justify-center items-center">
          <div
            className={
              open
                ? "z-[20] bg-transparent opacity-40 ease-in duration-500"
                : "ease-in duration-500"
            }
          >
            <div className="">
              <p className="text-3xl font-bold">Glad to See You Again!</p>
              <p className="my-5">
                Sign up to discover new arrivals, enjoy personalized offers, and
                make your shopping faster and easier. Join us today!
              </p>
              <form onSubmit={SubmitHandler} className="b">
                <p className="p-2 font-extrabold text-xl">Sign in</p>
                <div className="flex flex-col">
                  <input
                    type="email"
                    value={email}
                    onChange={ChangeEmail}
                    placeholder="Enter your Email"
                    required
                    className="border p-1 my-2 shadow-lg"
                  ></input>
                  <div className="grid grid-cols-4 gap-3 my-4">
                    <input
                      type={eye ? "password" : "text"}
                      value={password}
                      onChange={ChangePassword}
                      placeholder="Enter password"
                      className="border shadow-lg p-2 col-span-3"
                      required
                    />
                    <span
                      className="grid col-span-1 items-center"
                      onClick={() => setEye(!eye)}
                    >
                      {eye ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </span>
                    <p
                      className={
                        notFound.length === 0
                          ? "hidden"
                          : "text-red-500 col-span-4"
                      }
                    >
                      {notFound}
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="bg-black w-1/2 text-white p-1 mt-2 hover:bg-black/30 hover:text-slate-800"
                  >
                    Next
                  </button>
                </div>
              </form>
            </div>
            <div className="py-8">
              <p>Haven’t created an account yet?</p>
              <div className="flex gap-2">
                <p>Click here to</p>
              <Link href="./SignUp" className="font-bold hover:text-slate-500 text-blue-500">
                Sign up
              </Link></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default page;
