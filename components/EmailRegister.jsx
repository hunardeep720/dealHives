"use client";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useUserAuth } from "@/utils/auth-context";
import React from "react";
import Link from "next/link";
function EmailRegister({
  setLoginDone,
  setLoginName,
  setLoginEmail,
  setLoginLastName,
  setLoginPassword,
}) {
  const { user } = useUserAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [prePassword, setPrePassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [eye, setEye] = useState(true);
  const [reEnterPasswordEye, setReEnterPasswordEye] = useState(true);
  const [samePasswordError, setSamePasswordError] = useState("");

  const SubmitHandler = (e) => {
    e.preventDefault();
    if (prePassword === rePassword) {
      const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (regex.test(prePassword)) {
        setPassword(prePassword);
        try {
          setSamePasswordError("");
          setPasswordError("");
          setLoginName(name);
          setLoginEmail(email);
          setLoginLastName(lastName);
          setLoginPassword(prePassword);
          setLoginDone(true);
        } catch (error) {
          console.error("Error registering user:", error);
        }
      } else {
        setSamePasswordError("");
        setPasswordError(
          "Password must contain atleast one uppercase, one lowercase, one number and one special character"
        );
      }
    } else setPasswordError(""), setSamePasswordError("Passwords do not match");
  };
  useEffect(() => {
    setName("");
    setLastName("");
    setEmail("");
    setPrePassword("");
    setRePassword("");
  }, [user]);
  return (
    <div>
      <form onSubmit={(e) => SubmitHandler(e)} className="text-black">
        <div className="text-center flex flex-col justify-center items-center">
          <p className="my-2 font-extrabold text-3xl">Enter your Details</p>

          <div className="py-7 grid grid-cols-2 gap-8 w-5/6 items-center justify-center">
            <input
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              placeholder="First Name"
              className="border shadow-lg p-2"
              required
            />
            <input
              type="text"
              value={lastName}
              onChange={(e)=>setLastName(e.target.value)}
              placeholder="Last Name"
              className="border shadow-lg p-2"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Enter Email"
              className="border shadow-lg p-2 col-span-2"
              required
            />
            <input
              type={eye ? "password" : "text"}
              value={prePassword}
              onChange={(e)=>setPrePassword(e.target.value)}
              minLength="8"
              placeholder="Enter password"
              className="border shadow-lg p-2 col-span-1"
              required
            />
            <span onClick={() => setEye(!eye)}>
              {eye ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
            <input
              type={reEnterPasswordEye ? "password" : "text"}
              value={rePassword}
              onChange={(e)=>setRePassword(e.target.value)}
              minLength="8"
              placeholder="Re-enter password"
              className="border shadow-lg p-2 col-span-1"
              required
            />
            <span onClick={() => setReEnterPasswordEye(!reEnterPasswordEye)}>
              {reEnterPasswordEye ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
            <p
              className={
                samePasswordError.length === 0
                  ? "hidden"
                  : "text-red-500 col-span-2"
              }
            >
              {samePasswordError}
            </p>
            <p
              className={
                passwordError.length === 0
                  ? "hidden"
                  : "text-red-500 col-span-2"
              }
            >
              {passwordError}
            </p>
          </div>
          <div className="grid grid-cols-3 w-5/6 gap-8">
            <button
              type="submit"
              className="p-1 text-white bg-black  hover:bg-black/30 hover:text-slate-800"
            >
              Next
            </button>
            <Link
              href="./Account"
              className="p-1 text-white bg-black  hover:bg-black/30 hover:text-slate-800"
            >
              Already have an account?
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EmailRegister;
