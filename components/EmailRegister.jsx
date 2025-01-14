"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from 'lucide-react';

function EmailRegister({ setLoginDone, setLoginData }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    lastName: "",
    password: "",
    rePassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const SubmitHandler = (e) => {
    e.preventDefault();
    if (formData.password === formData.rePassword) {
      const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (regex.test(formData.password)) {
        setPasswordError("");
        setLoginData((prev) => ({
          ...prev,
          name: formData.name,
          email: formData.email,
          lastName: formData.lastName,
          password: formData.password,
        }));
        setLoginDone(true);
      } else {
        setPasswordError(
          "Password must contain at least one uppercase, one lowercase, one number and one special character"
        );
      }
    } else {
      setPasswordError("Passwords do not match");
    }
  };

  return (
    <form onSubmit={SubmitHandler} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">First Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="rePassword">Re-enter Password</Label>
        <div className="relative">
          <Input
            id="rePassword"
            name="rePassword"
            type={showRePassword ? "text" : "password"}
            value={formData.rePassword}
            onChange={handleChange}
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={() => setShowRePassword(!showRePassword)}
          >
            {showRePassword ? <EyeOffIcon /> : <EyeIcon />}
          </Button>
        </div>
      </div>
      {passwordError && <p className="text-red-500">{passwordError}</p>}
      <div className="flex justify-between">
        <Button type="submit">Next</Button>
        <Button variant="outline" asChild>
          <Link href="./Account">Already have an account?</Link>
        </Button>
      </div>
    </form>
  );
}

export default EmailRegister;

