"use client";
import Space from "@/components/Space";
import React, { useState, useEffect } from "react";
import EmailRegister from "@/components/EmailRegister";
import { GlobalStateContext } from "../GlobalStateVariable";
import { useContext } from "react";
import Address from "@/components/Address";
import { addUserInformation } from "@/service/postServices/page";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useRouter } from "next/navigation";

function page() {
  const [open, setOpen] = useContext(GlobalStateContext);
  const router = useRouter();
  const [loginName, setLoginName] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginLastName, setLoginLastName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginDone, setLoginDone] = useState(false);
  const [loginMobileNumber, setLoginMobileNumber] = useState("");
  const [loginAddress, setLoginAddress] = useState("");
  const [loginCity, setLoginCity] = useState("");
  const [loginState, setLoginState] = useState("");
  const [loginCountry, setLoginCountry] = useState("Canada");
  const [loginPinCode, setLoginPinCode] = useState("");
  const [complete, setComplete] = useState(false);

  async function registerUser() {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      ).then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        const data = {
          firstName: loginName,
          lastName: loginLastName,
          email: loginEmail,
          phone: loginMobileNumber,
          address: loginAddress,
          city: loginCity,
          state: loginState,
          country: loginCountry,
          pincode: loginPinCode,
        };
        addUserInformation(user.uid, data).then(() => {
          alert("User Registered");
          router.push("/");
        });
        // ...
      });
    } catch (error) {
      console.error("Error registering user:", error);
    }
  }

  useEffect(() => {
    if (complete) {
      registerUser();
    }
  }, [complete]);

  return (
    <div className="max-w-screen-2xl mx-auto p-4">
      <Space />
      <div
        className={
          open
            ? "z-[20] bg-transparent opacity-40 ease-in duration-500"
            : "ease-in duration-500 z-[10]"
        }
      >
        {loginDone ? (
          <Address
            setComplete={setComplete}
            setLoginCity={setLoginCity}
            setLoginMobileNumber={setLoginMobileNumber}
            setLoginAddress={setLoginAddress}
            setLoginState={setLoginState}
            setLoginCountry={setLoginCountry}
            setLoginPinCode={setLoginPinCode}
          />
        ) : (
          <EmailRegister
            setLoginDone={setLoginDone}
            setLoginName={setLoginName}
            setLoginEmail={setLoginEmail}
            setLoginLastName={setLoginLastName}
            setLoginPassword={setLoginPassword}
          />
        )}
      </div>
    </div>
  );
}

export default page;
