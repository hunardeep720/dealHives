"use client";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useUserAuth } from "@/utils/auth-context";
import { addItem } from "@/service/store-service";
import React from "react";
import Link from "next/link";
import Address from "./Address";
function EmailRegister() {
  const { user } = useUserAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [prePassword, setPrePassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [eye, setEye] = useState(true);
  const [samePasswordError, setSamePasswordError] = useState("");
  const handleSubmit = async (id) => {
    const userInformation = { name: name, lastName: lastName };
    await addItem(id, userInformation);
  };
  const handleRegister = async (userEmail, userPassword) => {
    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("User registered successfully:");
        handleSubmit(userCredential.user.uid);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLogin(false);
      });
  };

  let changeFirstName = (e) => {
    setName(e.target.value);
  };
  let changeLastName = (e) => {
    setLastName(e.target.value);
  };
  let changeEmail = (e) => {
    setEmail(e.target.value);
  };
  let changePrePassword = (e) => {
    setPrePassword(e.target.value);
  };
  let changeRePassword = (e) => {
    setRePassword(e.target.value);
  };
  const SubmitHandler = (e) => {
    e.preventDefault();
    if (prePassword === rePassword) {
      const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (regex.test(prePassword)) {
        setPassword(prePassword);
        try {
          handleRegister(email, prePassword);
          console.log("User registered successfully:", user);
        } catch (error) {
          console.error("Error registering user:", error);
        }
        console.log(user);
        setSamePasswordError("");
        setPasswordError("");
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
      {user ? (
        <Address />
      ) : (
        <form onSubmit={SubmitHandler}>
          <div className="text-center flex flex-col justify-center items-center">
            <p className="my-2 font-extrabold text-3xl">Enter your Details</p>

            <div className="py-7 grid grid-cols-2 gap-8 w-5/6 items-center justify-center">
              <input
                type="text"
                value={name}
                onChange={changeFirstName}
                placeholder="First Name"
                className="border shadow-lg p-2"
                required
              />
              <input
                type="text"
                value={lastName}
                onChange={changeLastName}
                placeholder="Last Name"
                className="border shadow-lg p-2"
                required
              />
              <input
                type="email"
                value={email}
                onChange={changeEmail}
                placeholder="Enter Email"
                className="border shadow-lg p-2 col-span-2"
                required
              />
              <input
                type={eye ? "password" : "text"}
                value={prePassword}
                onChange={changePrePassword}
                minLength="8"
                placeholder="Enter password"
                className="border shadow-lg p-2 col-span-1"
                required
              />
              <span onClick={() => setEye(!eye)}>
                {eye ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
              <p
                className={
                  passwordError.length === 0
                    ? "hidden"
                    : "text-red-500 col-span-2"
                }
              >
                {passwordError}
              </p>
              <input
                type={eye ? "password" : "text"}
                value={rePassword}
                onChange={changeRePassword}
                minLength="8"
                placeholder="Re-enter password"
                className="border shadow-lg p-2 col-span-1"
                required
              />
              <span onClick={() => setEye(!eye)}>
                {eye ? <AiFillEyeInvisible /> : <AiFillEye />}
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
                className="p-1 col-span-2 font-semibold hover:text-slate-500"
              >
                Already have an account?
              </Link>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default EmailRegister;
