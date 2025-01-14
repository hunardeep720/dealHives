"use client";

import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { GlobalStateContext } from "../GlobalStateVariable";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { addUserInformation } from "@/service/postServices/page";
import EmailRegister from "@/components/EmailRegister";
import Address from "@/components/Address";
import { Card, CardContent } from "@/components/ui/card";
import { SuccessAnimation } from "@/components/SuccessAnimation";

export default function SignupPage() {
  const [open, setOpen] = useContext(GlobalStateContext);
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    name: "",
    email: "",
    lastName: "",
    password: "",
    mobileNumber: "",
    address: "",
    city: "",
    state: "",
    country: "Canada",
    pinCode: "",
  });
  const [loginDone, setLoginDone] = useState(false);
  const [complete, setComplete] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  async function registerUser() {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      );
      const user = userCredential.user;
      await addUserInformation(user.uid, loginData);
      setShowSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 3000);
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
    <div className="container mx-auto p-10">
      <Card className={open ? "opacity-40" : ""}>
        <CardContent className="p-8">
          <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>
          {loginDone ? (
            <Address setComplete={setComplete} setLoginData={setLoginData} />
          ) : (
            <EmailRegister
              setLoginDone={setLoginDone}
              setLoginData={setLoginData}
            />
          )}
        </CardContent>
      </Card>
      {showSuccess && <SuccessAnimation />}
    </div>
  );
}

