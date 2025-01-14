"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatPhoneNumber, formatPostalCode } from "./formated";

const canadianProvinces = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Nova Scotia",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Northwest Territories",
  "Nunavut",
  "Yukon",
];

function Address({ setComplete, setLoginData }) {
  const [formData, setFormData] = useState({
    mobile: "",
    street: "",
    unit: "",
    city: "",
    province: "",
    country: "Canada",
    pincode: "",
  });

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "mobile") {
      value = formatPhoneNumber(value);
    } else if (e.target.name === "pincode") {
      value = formatPostalCode(value);
    }
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleProvinceChange = (value) => {
    setFormData({ ...formData, province: value });
  };

  const SubmitHandler = (e) => {
    e.preventDefault();
    setLoginData((prev) => ({
      ...prev,
      mobileNumber: formData.mobile,
      address: `${formData.street} ${formData.unit}`,
      city: formData.city,
      state: formData.province,
      country: formData.country,
      pinCode: formData.pincode,
    }));
    setComplete(true);
  };

  return (
    <form onSubmit={SubmitHandler} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="mobile">Mobile Number</Label>
        <Input
          id="mobile"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          maxLength={14}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="street">Street Address</Label>
        <Input
          id="street"
          name="street"
          value={formData.street}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="unit">Unit Number</Label>
        <Input
          id="unit"
          name="unit"
          value={formData.unit}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="province">Province</Label>
          <Select
            name="province"
            value={formData.province}
            onValueChange={handleProvinceChange}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a province" />
            </SelectTrigger>
            <SelectContent>
              {canadianProvinces.map((province) => (
                <SelectItem key={province} value={province}>
                  {province}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            disabled
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pincode">Postal Code</Label>
          <Input
            id="pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            maxLength={7}
            required
          />
        </div>
      </div>
      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  );
}

export default Address;

